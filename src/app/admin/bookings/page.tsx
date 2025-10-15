"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchBookings();
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
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
                    <div className="admin-header text-center position-relative">
                      <button 
                        onClick={handleLogout}
                        className="logout-btn position-absolute"
                        style={{ top: '0', right: '0' }}
                      >
                        Logout
                      </button>
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

      <style jsx>{`
        .logout-btn {
          background: linear-gradient(135deg, #ff4757, #ff6348);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 71, 87, 0.4);
        }

        .admin-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1a1a1a;
        }

        .admin-subtitle {
          font-size: 18px;
          color: #666;
        }

        .admin-filters {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 20px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .filter-btn:hover {
          border-color: #ff6348;
          color: #ff6348;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #ff4757, #ff6348);
          border-color: #ff4757;
          color: white;
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .booking-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .booking-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .booking-info h3 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #1a1a1a;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.confirmed {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.cancelled {
          background: #f8d7da;
          color: #721c24;
        }

        .status-badge.completed {
          background: #d1ecf1;
          color: #0c5460;
        }

        .booking-date {
          font-size: 16px;
          font-weight: 600;
          color: #666;
        }

        .booking-details {
          margin-bottom: 20px;
        }

        .detail-row {
          padding: 8px 0;
          font-size: 15px;
          color: #333;
        }

        .detail-row strong {
          color: #1a1a1a;
          margin-right: 8px;
        }

        .detail-row a {
          color: #ff6348;
          text-decoration: none;
        }

        .detail-row a:hover {
          text-decoration: underline;
        }

        .booking-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.complete {
          background: #28a745;
          color: white;
        }

        .action-btn.complete:hover {
          background: #218838;
          transform: translateY(-2px);
        }

        .action-btn.cancel {
          background: #dc3545;
          color: white;
        }

        .action-btn.cancel:hover {
          background: #c82333;
          transform: translateY(-2px);
        }

        .action-btn.confirm {
          background: #007bff;
          color: white;
        }

        .action-btn.confirm:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .admin-title {
            font-size: 32px;
          }

          .booking-header {
            flex-direction: column;
            gap: 12px;
          }

          .logout-btn {
            position: static !important;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </Wrapper>
  );
}
