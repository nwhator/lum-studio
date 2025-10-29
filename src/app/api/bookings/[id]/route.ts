import { NextRequest, NextResponse } from "next/server";
import db from "@/db/database";

// DELETE - remove a booking by id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (!id || Number.isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }

    const stmt = db.prepare("DELETE FROM bookings WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes === 0) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking (SQLite):", error);
    return NextResponse.json({ success: false, error: "Failed to delete booking" }, { status: 500 });
  }
}
