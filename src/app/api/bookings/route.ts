import { NextRequest, NextResponse } from "next/server";
import db from "@/db/database";

// Helper: check for time slot overlap
function hasConflict(existingTimeSlotsJson: string, requested: string[]) {
  try {
    const existing: string[] = JSON.parse(existingTimeSlotsJson || "[]");
    return existing.some((t) => requested.includes(t));
  } catch (e) {
    return false;
  }
}

// GET - return all bookings (include time_slots)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    if (date) {
      // Return booked slots for the requested date. Only consider paid bookings as blocking by default.
      const stmt = db.prepare("SELECT time_slots FROM bookings WHERE date = ? AND status = 'paid'");
      const rows = stmt.all(date) as Array<{ time_slots: string }>;
      const slotsSet = new Set<string>();
      for (const r of rows) {
        try {
          const arr: string[] = JSON.parse(r.time_slots || "[]");
          for (const s of arr) slotsSet.add(s);
        } catch (e) {
          // ignore malformed
        }
      }
      return NextResponse.json({ success: true, bookedSlots: Array.from(slotsSet) });
    }

    const stmt = db.prepare(
      "SELECT id, date, time_slots, package, name, email, phone, notes, payment_account_name, payment_bank_name, payment_transaction_id, status, created_at FROM bookings ORDER BY created_at DESC"
    );
    const bookings = stmt.all().map((b: any) => ({
      ...b,
      time_slots: JSON.parse(b.time_slots || "[]"),
    }));
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings (SQLite):", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST - two-step flow: initiate (finalize=false) returns WhatsApp link, finalize=true actually inserts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
  const { date, timeSlots, name, phone, package: pkg, finalize, email, notes, payment } = body;

    if (!date) {
      return NextResponse.json({ success: false, error: "Missing required field: date" }, { status: 400 });
    }

    const requestedSlots: string[] = Array.isArray(timeSlots)
      ? timeSlots.map(String)
      : typeof timeSlots === "string"
      ? timeSlots.split(",").map((s) => s.trim())
      : [];

    // Check conflicts for the date
  // When checking for conflicts, only treat 'paid' bookings as blocking. Pending bookings won't block slots.
  const existingStmt = db.prepare("SELECT id, time_slots FROM bookings WHERE date = ? AND status = 'paid'");
    const existing = existingStmt.all(date as string) as Array<{ id: number; time_slots: string }>;
    for (const row of existing) {
      if (hasConflict(row.time_slots, requestedSlots)) {
        return NextResponse.json({ success: false, error: "Some time slots are already booked" }, { status: 409 });
      }
    }

    // If not finalizing, return a WhatsApp link for the client to open. Do not insert.
    const waPhone = process.env.WA_PHONE ? String(process.env.WA_PHONE).replace(/^\+/, "") : "2348145538164";

    // Build a rich receipt-style WhatsApp message when packageInfo is provided
    const packageInfo = (body && (body.packageInfo || {})) as any;
    const paymentObj = (body && (body.payment || {})) as any;
    const sellerPayment = (body && (body.sellerPayment || {})) as any;

    const formatDate = (dStr: string) => {
      try {
        const d = new Date(dStr + "T00:00:00");
        return d.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (e) {
        return dStr;
      }
    };

    const computeEndTime = (start: string) => {
      // start expected like "05:00 PM"
      const m = start && start.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return "";
      let hh = parseInt(m[1], 10);
      const mm = parseInt(m[2], 10);
      const ap = m[3].toUpperCase();
      if (ap === "PM" && hh !== 12) hh += 12;
      if (ap === "AM" && hh === 12) hh = 0;
      const date = new Date();
      date.setHours(hh, mm, 0, 0);
      date.setHours(date.getHours() + 1);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const slotStart = requestedSlots && requestedSlots.length ? requestedSlots[0] : "";
    const slotEnd = slotStart ? computeEndTime(slotStart) : "";

    const pkgCategory = packageInfo?.category || pkg || "";
    const pkgLabel = packageInfo?.packageLabel || "";
    const pkgOption = packageInfo?.option || (packageInfo?.looks ? `${packageInfo.looks} Looks` : "");
    const imagesEdited = packageInfo?.imagesEdited ?? "";
    const imagesUnedited = packageInfo?.imagesUnedited ?? 0;
    const priceFormatted = packageInfo?.priceFormatted || "";

    const lines = [] as string[];
    lines.push("✨ NEW BOOKING REQUEST ✨");
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push("");
    lines.push("📦 PACKAGE DETAILS");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(`• Category: ${pkgCategory}`);
    lines.push(`• Package: ${pkgLabel}`);
    if (pkgOption) lines.push(`• Option: ${pkgOption}`);
    lines.push(`• Images: ${imagesEdited} edited${imagesUnedited ? `, ${imagesUnedited} unedited` : ""}`);
    if (priceFormatted) lines.push(`• Price: ${priceFormatted}`);
    lines.push("");
    lines.push("👤 CUSTOMER INFORMATION");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(`• Name: ${name || ""}`);
    if (email) lines.push(`• Email: ${email}`);
    lines.push(`• Phone: ${phone || ""}`);
    lines.push("");
    lines.push("📅 SCHEDULE");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(`• Date: ${formatDate(date)}`);
    if (slotStart) lines.push(`• Time: ${slotStart}${slotEnd ? ` - ${slotEnd}` : ""}`);
    lines.push(`• Duration: ${requestedSlots && requestedSlots.length ? `${requestedSlots.length} hour(s)` : "1 hour (1 slot)"}`);
    lines.push("");
    lines.push("💳 PAYMENT CONFIRMATION");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(`• Transfer From: ${paymentObj?.accountName || "Not provided"}`);
    lines.push(`• Customer Bank: ${paymentObj?.bankName || "Not provided"}`);
    lines.push(`• Transaction ID: ${paymentObj?.transactionId || "Not provided"}`);
    if (priceFormatted) lines.push(`• Amount: ${priceFormatted}`);
    if (sellerPayment?.accountNumber) lines.push(`• Bank Account: ${sellerPayment.accountNumber} (${sellerPayment.bankName || ""})`);
    lines.push("");
    lines.push("📝 ADDITIONAL NOTES");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(notes || "No additional message");
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push("✉ Sent from LUM Studios");
    lines.push("www.thelumstudios.com");

    const waText = encodeURIComponent(lines.join("\n"));
    const waLink = `https://wa.me/${waPhone}?text=${waText}`;

    if (!finalize) {
      return NextResponse.json({ success: true, waLink });
    }

    // Finalize: insert booking (re-check conflicts to avoid race)
    const existing2 = existingStmt.all(date as string) as Array<{ id: number; time_slots: string }>;
    for (const row of existing2) {
      if (hasConflict(row.time_slots, requestedSlots)) {
        return NextResponse.json({ success: false, error: "Some time slots are already booked" }, { status: 409 });
      }
    }

    // Respect optional `paid` flag. If true, mark as 'paid', otherwise mark as 'pending'.
    // Respect optional `paid` flag. If true, mark as 'paid', otherwise mark as 'pending'.
    const paidFlag = !!body.paid;
    const statusToUse = paidFlag ? "paid" : "pending";
    // Support payment details inside `payment` object or top-level fields for backward compatibility
    const paymentAccountName = (payment && payment.accountName) || body.payment_account_name || null;
    const paymentBankName = (payment && payment.bankName) || body.payment_bank_name || null;
    const paymentTransactionId = (payment && payment.transactionId) || body.payment_transaction_id || null;

    const insert = db.prepare(
      "INSERT INTO bookings (date, time_slots, package, name, email, phone, notes, payment_account_name, payment_bank_name, payment_transaction_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    try {
      const info = insert.run(
        date,
        JSON.stringify(requestedSlots),
        pkg || null,
        name || null,
        email || null,
        phone || null,
        notes || null,
        paymentAccountName,
        paymentBankName,
        paymentTransactionId,
        statusToUse
      );

      const bookingRow: any = db
        .prepare(
          "SELECT id, date, time_slots, package, name, email, phone, notes, payment_account_name, payment_bank_name, payment_transaction_id, status, created_at FROM bookings WHERE id = ?"
        )
        .get(info.lastInsertRowid);

      if (!bookingRow) {
        return NextResponse.json({ success: false, error: "Booking not found after insert" }, { status: 500 });
      }

      try {
        bookingRow.time_slots = JSON.parse(bookingRow.time_slots || "[]");
      } catch (e) {
        bookingRow.time_slots = [];
      }

      return NextResponse.json({ success: true, booking: bookingRow }, { status: 201 });
    } catch (e: any) {
      console.error("Error inserting booking:", e);
      const msg = e && e.message ? String(e.message) : "Failed to create booking";
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in booking POST handler:", error);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
