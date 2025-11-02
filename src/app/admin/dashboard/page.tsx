"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Wrapper from "@/layouts/wrapper";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_confirmed: boolean;
  notes?: string;
  package_info?: any;
  created_at: string;
  updated_at?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
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
      const url = filter === 'all' ? '/api/bookings/list' : `/api/bookings/list?status=${filter}`;
      const response = await fetch(url);
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

  // Refetch when filter changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [filter, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch('/api/bookings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, status }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Booking status updated successfully');
        fetchBookings();
      } else {
        alert('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  const togglePaymentConfirmation = async (bookingId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/bookings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, payment_confirmed: !currentStatus }),
      });

      const data = await response.json();
      
      if (data.success) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Wrapper>
      <div className="admin-dashboard-container">
        <div className="dashboard-header">
          <div className="container">
            <div className="header-content">
              <div className="header-left">
                <h1>📊 Admin Dashboard</h1>
                <p>Manage bookings and appointments</p>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="container">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <div className="stat-value">{bookings.length}</div>
                  <div className="stat-label">Total Bookings</div>
                </div>
              </div>
              <div className="stat-card pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <div className="stat-value">{bookings.filter(b => b.status === 'pending').length}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>
              <div className="stat-card confirmed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-value">{bookings.filter(b => b.status === 'confirmed').length}</div>
                  <div className="stat-label">Confirmed</div>
                </div>
              </div>
              <div className="stat-card cancelled">
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <div className="stat-value">{bookings.filter(b => b.status === 'cancelled').length}</div>
                  <div className="stat-label">Cancelled</div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="filter-section">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
                onClick={() => setFilter('cancelled')}
              >
                Cancelled
              </button>
            </div>

            {/* Bookings Table */}
            <div className="bookings-table-container">
              {loading ? (
                <div className="loading-state">Loading bookings...</div>
              ) : filteredBookings.length === 0 ? (
                <div className="empty-state">No bookings found</div>
              ) : (
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div className="customer-cell">
                            <div className="customer-name">{booking.name}</div>
                            <div className="customer-contact">
                              <a href={`mailto:${booking.email}`}>{booking.email}</a>
                              <br />
                              <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                            </div>
                          </div>
                        </td>
                        <td>{booking.service}</td>
                        <td>
                          <div className="date-cell">
                            <div className="date-value">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="time-value">{booking.time}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`payment-toggle ${booking.payment_confirmed ? 'confirmed' : ''}`}
                            onClick={() => togglePaymentConfirmation(booking.id, booking.payment_confirmed)}
                          >
                            {booking.payment_confirmed ? '✓ Paid' : '○ Unpaid'}
                          </button>
                        </td>
                        <td>
                          <div className="actions-cell">
                            {booking.status === 'pending' && (
                              <button
                                className="action-btn confirm"
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                className="action-btn cancel"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              >
                                Cancel
                              </button>
                            )}
                            {booking.status === 'cancelled' && (
                              <button
                                className="action-btn restore"
                                onClick={() => updateBookingStatus(booking.id, 'pending')}
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .admin-dashboard-container {
            min-height: 100vh;
            background: #f5f5f5;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .dashboard-header {
            background: white;
            border-bottom: 1px solid #e0e0e0;
            padding: 24px 0;
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .header-left h1 {
            font-size: 32px;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0 0 4px 0;
          }

          .header-left p {
            font-size: 16px;
            color: #666;
            margin: 0;
          }

          .logout-btn {
            background: #ff4757;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .logout-btn:hover {
            background: #ff3838;
            transform: translateY(-2px);
          }

          .dashboard-body {
            padding: 32px 0;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
          }

          .stat-card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border-left: 4px solid #667eea;
          }

          .stat-card.pending {
            border-left-color: #ffa502;
          }

          .stat-card.confirmed {
            border-left-color: #2ed573;
          }

          .stat-card.cancelled {
            border-left-color: #ff4757;
          }

          .stat-icon {
            font-size: 40px;
          }

          .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #1a1a1a;
          }

          .stat-label {
            font-size: 14px;
            color: #666;
            margin-top: 4px;
          }

          .filter-section {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            flex-wrap: wrap;
          }

          .filter-btn {
            padding: 10px 20px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .filter-btn:hover {
            border-color: #667eea;
            color: #667eea;
          }

          .filter-btn.active {
            background: #667eea;
            border-color: #667eea;
            color: white;
          }

          .bookings-table-container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          .loading-state,
          .empty-state {
            padding: 60px 20px;
            text-align: center;
            color: #666;
            font-size: 16px;
          }

          .bookings-table {
            width: 100%;
            border-collapse: collapse;
          }

          .bookings-table thead {
            background: #f8f9fa;
          }

          .bookings-table th {
            padding: 16px;
            text-align: left;
            font-weight: 600;
            color: #333;
            border-bottom: 2px solid #e0e0e0;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .bookings-table td {
            padding: 16px;
            border-bottom: 1px solid #f0f0f0;
          }

          .bookings-table tbody tr:hover {
            background: #f8f9fa;
          }

          .customer-cell {
            min-width: 200px;
          }

          .customer-name {
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 4px;
          }

          .customer-contact {
            font-size: 13px;
            color: #666;
          }

          .customer-contact a {
            color: #667eea;
            text-decoration: none;
          }

          .customer-contact a:hover {
            text-decoration: underline;
          }

          .date-cell {
            min-width: 120px;
          }

          .date-value {
            font-weight: 600;
            color: #1a1a1a;
          }

          .time-value {
            font-size: 13px;
            color: #666;
            margin-top: 2px;
          }

          .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .status-badge.pending {
            background: #fff3cd;
            color: #856404;
          }

          .status-badge.confirmed {
            background: #d4edda;
            color: #155724;
          }

          .status-badge.cancelled {
            background: #f8d7da;
            color: #721c24;
          }

          .payment-toggle {
            padding: 6px 12px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .payment-toggle.confirmed {
            background: #2ed573;
            border-color: #2ed573;
            color: white;
          }

          .payment-toggle:hover {
            transform: scale(1.05);
          }

          .actions-cell {
            display: flex;
            gap: 8px;
          }

          .action-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .action-btn.confirm {
            background: #2ed573;
            color: white;
          }

          .action-btn.confirm:hover {
            background: #26de81;
          }

          .action-btn.cancel {
            background: #ff4757;
            color: white;
          }

          .action-btn.cancel:hover {
            background: #ff3838;
          }

          .action-btn.restore {
            background: #667eea;
            color: white;
          }

          .action-btn.restore:hover {
            background: #5568d3;
          }

          @media (max-width: 768px) {
            .header-content {
              flex-direction: column;
              gap: 16px;
              text-align: center;
            }

            .stats-grid {
              grid-template-columns: 1fr;
            }

            .bookings-table-container {
              overflow-x: auto;
            }

            .bookings-table {
              min-width: 900px;
            }
          }
        `}</style>
      </div>
    </Wrapper>
  );
}
