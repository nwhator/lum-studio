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
  package_type?: string;
  num_looks?: number;
  images_edited?: number;
  images_unedited?: number;
  total_cost?: number;
  created_at: string;
  updated_at?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showManualBooking, setShowManualBooking] = useState(false);
  const [manualBookingData, setManualBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    payment_confirmed: false
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchBookings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleManualBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!manualBookingData.name || !manualBookingData.phone || !manualBookingData.service || 
        !manualBookingData.date || !manualBookingData.time) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: manualBookingData.name,
          email: manualBookingData.email || 'walk-in@lumstudios.com',
          phone: manualBookingData.phone,
          package: manualBookingData.service,
          date: manualBookingData.date,
          timeSlots: [manualBookingData.time],
          notes: manualBookingData.notes || 'Manual booking by admin',
          finalize: true,
          paid: manualBookingData.payment_confirmed,
          packageInfo: {
            category: manualBookingData.service,
            packageLabel: 'Manual Booking',
            option: 'Admin Created',
          }
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Booking created successfully!');
        setShowManualBooking(false);
        setManualBookingData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          notes: '',
          payment_confirmed: false
        });
        fetchBookings();
      } else {
        alert(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating manual booking:', error);
      alert('Failed to create booking');
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
              <div className="header-right">
                <button onClick={() => setShowManualBooking(true)} className="create-booking-btn">
                  + Create Booking
                </button>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
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
                      <th>Package Details</th>
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
                          <div className="package-cell">
                            {booking.package_type && <div className="package-type">{booking.package_type}</div>}
                            {booking.num_looks && <div className="package-detail">👗 {booking.num_looks} looks</div>}
                            {booking.images_edited !== undefined && booking.images_edited > 0 && (
                              <div className="package-detail">✨ {booking.images_edited} edited</div>
                            )}
                            {booking.images_unedited !== undefined && booking.images_unedited > 0 && (
                              <div className="package-detail">📷 {booking.images_unedited} unedited</div>
                            )}
                            {booking.total_cost && (
                              <div className="package-cost">₦{booking.total_cost.toLocaleString()}</div>
                            )}
                            {!booking.package_type && !booking.total_cost && (
                              <span className="text-muted">-</span>
                            )}
                          </div>
                        </td>
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

        {/* Manual Booking Modal */}
        {showManualBooking && (
          <div className="modal-overlay" onClick={() => setShowManualBooking(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create Manual Booking</h2>
                <button className="modal-close" onClick={() => setShowManualBooking(false)}>×</button>
              </div>
              
              <form onSubmit={handleManualBookingSubmit} className="manual-booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name *</label>
                    <input
                      type="text"
                      value={manualBookingData.name}
                      onChange={(e) => setManualBookingData({...manualBookingData, name: e.target.value})}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={manualBookingData.phone}
                      onChange={(e) => setManualBookingData({...manualBookingData, phone: e.target.value})}
                      placeholder="+234 XXX XXX XXXX"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email (Optional)</label>
                  <input
                    type="email"
                    value={manualBookingData.email}
                    onChange={(e) => setManualBookingData({...manualBookingData, email: e.target.value})}
                    placeholder="customer@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Service Type *</label>
                  <select
                    value={manualBookingData.service}
                    onChange={(e) => setManualBookingData({...manualBookingData, service: e.target.value})}
                    required
                  >
                    <option value="">Select a service...</option>
                    <option value="Portraits">Portraits</option>
                    <option value="Headshots">Headshots</option>
                    <option value="Events">Events</option>
                    <option value="Products">Products</option>
                    <option value="Weddings">Weddings</option>
                    <option value="Studio">Studio Session</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={manualBookingData.date}
                      onChange={(e) => setManualBookingData({...manualBookingData, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Time Slot *</label>
                    <select
                      value={manualBookingData.time}
                      onChange={(e) => setManualBookingData({...manualBookingData, time: e.target.value})}
                      required
                    >
                      <option value="">Select time...</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={manualBookingData.notes}
                    onChange={(e) => setManualBookingData({...manualBookingData, notes: e.target.value})}
                    placeholder="Walk-in customer, phone booking, etc..."
                    rows={3}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={manualBookingData.payment_confirmed}
                      onChange={(e) => setManualBookingData({...manualBookingData, payment_confirmed: e.target.checked})}
                    />
                    <span>Payment Confirmed</span>
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowManualBooking(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Create Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

          .header-right {
            display: flex;
            gap: 12px;
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

          .create-booking-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .create-booking-btn:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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

          .package-cell {
            min-width: 180px;
            font-size: 13px;
          }

          .package-type {
            font-weight: 600;
            color: #667eea;
            margin-bottom: 4px;
          }

          .package-detail {
            color: #666;
            margin: 2px 0;
            font-size: 12px;
          }

          .package-cost {
            font-weight: 700;
            color: #2ed573;
            margin-top: 4px;
            font-size: 14px;
          }

          .text-muted {
            color: #999;
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

          /* Manual Booking Modal */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
          }

          .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 28px;
            border-bottom: 2px solid #f0f0f0;
          }

          .modal-header h2 {
            font-size: 24px;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0;
          }

          .modal-close {
            background: none;
            border: none;
            font-size: 32px;
            color: #999;
            cursor: pointer;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
          }

          .modal-close:hover {
            background: #f5f5f5;
            color: #333;
          }

          .manual-booking-form {
            padding: 28px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            font-size: 14px;
          }

          .form-group input,
          .form-group select,
          .form-group textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 15px;
            font-family: inherit;
            transition: all 0.3s ease;
          }

          .form-group input:focus,
          .form-group select:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .form-group textarea {
            resize: vertical;
            min-height: 80px;
          }

          .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
          }

          .checkbox-group input[type="checkbox"] {
            width: auto;
            cursor: pointer;
          }

          .checkbox-group span {
            font-weight: 500;
            color: #333;
          }

          .modal-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 28px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
          }

          .btn-cancel {
            padding: 12px 24px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-cancel:hover {
            background: #5a6268;
          }

          .btn-submit {
            padding: 12px 32px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-submit:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          }

          @media (max-width: 768px) {
            .header-content {
              flex-direction: column;
              gap: 16px;
              text-align: center;
            }

            .header-right {
              width: 100%;
              justify-content: center;
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

            .form-row {
              grid-template-columns: 1fr;
            }

            .modal-content {
              margin: 20px;
            }
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
