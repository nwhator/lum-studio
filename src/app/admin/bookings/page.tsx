"use client";
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import HeaderTransparent from '@/layouts/headers/header-transparent';
import FooterTwo from '@/layouts/footers/footer-two';

interface Booking {
  id: string;
  date: string;
  timeSlots: string[];
  package: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled' | 'completed'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });

      const data = await response.json();
      if (data.success) {
        alert('Booking cancelled successfully');
        fetchBookings(); // Refresh the list
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking');
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      if (data.success) {
        alert('Booking status updated successfully');
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  return (
    <Wrapper>
      <HeaderTransparent />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className="admin-bookings-area pt-190 pb-120">
              <div className="container">
                <div className="row justify-content-center mb-60">
                  <div className="col-xl-10">
                    <div className="admin-header text-center">
                      <h1 className="admin-title">Bookings Management</h1>
                      <p className="admin-subtitle">Manage all photography session bookings</p>
                    </div>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="row justify-content-center mb-40">
                  <div className="col-xl-10">
                    <div className="admin-filters text-center">
                      <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                      >
                        All ({bookings.length})
                      </button>
                      <button 
                        className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                        onClick={() => setFilter('confirmed')}
                      >
                        Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
                      </button>
                      <button 
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                      >
                        Completed ({bookings.filter(b => b.status === 'completed').length})
                      </button>
                      <button 
                        className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
                        onClick={() => setFilter('cancelled')}
                      >
                        Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bookings List */}
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    {loading ? (
                      <div className="text-center">
                        <p>Loading bookings...</p>
                      </div>
                    ) : filteredBookings.length === 0 ? (
                      <div className="text-center">
                        <p>No bookings found</p>
                      </div>
                    ) : (
                      <div className="bookings-list">
                        {filteredBookings.map(booking => (
                          <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                              <div className="booking-info">
                                <h3>{booking.name}</h3>
                                <span className={`status-badge ${booking.status}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="booking-date">
                                {new Date(booking.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                            
                            <div className="booking-details">
                              <div className="detail-row">
                                <strong>Package:</strong> {booking.package}
                              </div>
                              <div className="detail-row">
                                <strong>Time Slots:</strong> {booking.timeSlots.join(', ')}
                              </div>
                              <div className="detail-row">
                                <strong>Duration:</strong> {booking.timeSlots.length * 30} minutes
                              </div>
                              <div className="detail-row">
                                <strong>Email:</strong> <a href={`mailto:${booking.email}`}>{booking.email}</a>
                              </div>
                              <div className="detail-row">
                                <strong>Phone:</strong> <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                              </div>
                              {booking.message && (
                                <div className="detail-row">
                                  <strong>Message:</strong> {booking.message}
                                </div>
                              )}
                              <div className="detail-row">
                                <strong>Booked:</strong> {new Date(booking.createdAt).toLocaleString()}
                              </div>
                            </div>

                            <div className="booking-actions">
                              {booking.status === 'confirmed' && (
                                <>
                                  <button 
                                    className="action-btn complete"
                                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                                  >
                                    Mark Complete
                                  </button>
                                  <button 
                                    className="action-btn cancel"
                                    onClick={() => cancelBooking(booking.id)}
                                  >
                                    Cancel Booking
                                  </button>
                                </>
                              )}
                              {booking.status === 'cancelled' && (
                                <button 
                                  className="action-btn confirm"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                >
                                  Restore Booking
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <FooterTwo topCls="" />
        </div>
      </div>
    </Wrapper>
  );
}
