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
    const messageParts = [
      `Booking request for ${date}`,
      requestedSlots.length ? `Time(s): ${requestedSlots.join(", ")}` : null,
      name ? `Name: ${name}` : null,
      phone ? `Phone: ${phone}` : null,
      pkg ? `Package: ${pkg}` : null,
    ].filter(Boolean);
    const waText = encodeURIComponent(messageParts.join("\n"));
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
      return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in booking POST handler:", error);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
