"use client";

import React, { useEffect, useState } from "react";

type Booking = {
  id: number;
  date: string;
  time_slots?: string[];
  name?: string;
  phone?: string;
  created_at?: string;
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      if (json?.success) setBookings(json.bookings || []);
      else setError(json?.error || "Failed to load bookings");
    } catch (e) {
      console.error(e);
      setError("Failed to load bookings");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this booking?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json?.success) {
        setBookings((b) => b.filter((x) => x.id !== id));
      } else {
        alert(json?.error || "Failed to delete");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <h2>Admin — Bookings</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time(s)</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.date}</td>
              <td>{Array.isArray(b.time_slots) ? b.time_slots.join(", ") : ""}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.created_at}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b.id)} disabled={loading}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
