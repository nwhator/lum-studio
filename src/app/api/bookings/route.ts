import { NextRequest, NextResponse } from "next/server";
import { getBookingsCollection, createIndexes } from "@/lib/mongodb";
import {
  sendBookingConfirmation,
  sendAdminNotification,
} from "@/utils/email";

let indexesCreated = false;
async function ensureIndexes() {
  if (!indexesCreated) {
    await createIndexes();
    indexesCreated = true;
  }
}

export async function GET(request: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database disabled" }, { status: 503 });
  }
  try {
    await ensureIndexes();

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const collection = await getBookingsCollection();

    if (date) {
      const bookings = (await collection
        .find({ date, status: "confirmed" })
        .toArray()) as import("@/lib/mongodb").BookingDocument[];

      const bookedSlots = bookings
        .flatMap((booking) => booking.timeSlots)
        .filter((slot, index, self) => self.indexOf(slot) === index);
      return NextResponse.json({
        success: true,
        bookedSlots,
      });
    }

    const bookings = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Database disabled" }, { status: 503 });
  }
  try {
    await ensureIndexes();

    const body = await request.json();
    const { date, timeSlots, package: packageType, name, email, phone, message } = body;

    if (!date || !timeSlots || !packageType || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const collection = await getBookingsCollection();

    const conflictingBooking = await collection.findOne({
      date,
      status: "confirmed",
      timeSlots: { $in: timeSlots },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: "Some time slots are already booked" },
        { status: 409 }
      );
    }

    const newBooking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date,
      timeSlots,
      package: packageType,
      name,
      email,
      phone,
      message: message || "",
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await collection.insertOne(newBooking);

    try {
      await sendBookingConfirmation({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(", "),
        location: "Location will be confirmed",
        phone,
        specialRequests: message,
      });

      await sendAdminNotification({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(", "),
        location: "Location will be confirmed",
        phone,
        specialRequests: message,
      });

      console.log("✅ Email notifications sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
    }

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
