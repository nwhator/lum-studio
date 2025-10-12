"use client";
import React, { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const packageTypes = [
  "Wedding Photography",
  "Baby Shoot",
  "Maternity Photography",
  "Family Portraits",
  "Convocation",
  "Call to Bar",
  "General Photography"
];

// Mock booked slots - This will be replaced with real data from Calendly/backend
// Format: { date: "YYYY-MM-DD", times: ["09:00 AM", "09:30 AM"] }
const mockBookedSlots: { [key: string]: string[] } = {
  // Example: Some slots are already booked for demonstration
  // In production, this will come from your Calendly API or backend
  // Uncomment below to test booked slots functionality:
  // "2025-10-15": ["10:00 AM", "10:30 AM", "02:00 PM"],
  // "2025-10-20": ["09:00 AM", "09:30 AM", "01:00 PM", "01:30 PM"],
};

// Helper function to get booked slots for a specific date
const getBookedSlotsForDate = (date: Date | null): string[] => {
  if (!date) return [];
  const dateKey = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // TODO: Replace with actual Calendly API call when integrated
  // Example Calendly integration:
  // const response = await fetch(`/api/calendly/booked-slots?date=${dateKey}`);
  // const data = await response.json();
  // return data.bookedSlots || [];
  
  return mockBookedSlots[dateKey] || [];
};

export default function BookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlots([]); // Reset time selection when date changes
    setBookedSlots(getBookedSlotsForDate(date)); // Load booked slots for this date
  };

  const handleTimeSelect = (time: string) => {
    const currentIndex = timeSlots.indexOf(time);
    const selectedIndices = selectedTimeSlots.map(t => timeSlots.indexOf(t)).sort((a, b) => a - b);
    
    // If already selected, remove it and all slots after it
    if (selectedTimeSlots.includes(time)) {
      const timeIndex = selectedTimeSlots.indexOf(time);
      setSelectedTimeSlots(selectedTimeSlots.slice(0, timeIndex));
      return;
    }
    
    // If no slots selected, start new selection
    if (selectedTimeSlots.length === 0) {
      setSelectedTimeSlots([time]);
      return;
    }
    
    // Check if new selection is consecutive and within 2-hour limit (4 slots)
    const lastIndex = selectedIndices[selectedIndices.length - 1];
    const firstIndex = selectedIndices[0];
    
    // Must be consecutive (next slot) or previous slot
    if (currentIndex === lastIndex + 1 && selectedTimeSlots.length < 4) {
      setSelectedTimeSlots([...selectedTimeSlots, time]);
    } else if (currentIndex === firstIndex - 1 && selectedTimeSlots.length < 4) {
      setSelectedTimeSlots([time, ...selectedTimeSlots]);
    } else {
      // Start new selection
      setSelectedTimeSlots([time]);
    }
  };

  const isTimeSlotSelected = (time: string) => {
    return selectedTimeSlots.includes(time);
  };

  const isTimeSlotBooked = (time: string) => {
    return bookedSlots.includes(time);
  };

  const isTimeSlotDisabled = (time: string) => {
    // Can't select already booked slots
    if (isTimeSlotBooked(time)) return true;
    
    if (selectedTimeSlots.length === 0) return false;
    if (selectedTimeSlots.length >= 4) return !selectedTimeSlots.includes(time);
    
    const currentIndex = timeSlots.indexOf(time);
    const selectedIndices = selectedTimeSlots.map(t => timeSlots.indexOf(t)).sort((a, b) => a - b);
    const firstIndex = selectedIndices[0];
    const lastIndex = selectedIndices[selectedIndices.length - 1];
    
    // Can select if it's consecutive (before first or after last)
    return currentIndex !== firstIndex - 1 && currentIndex !== lastIndex + 1 && !selectedTimeSlots.includes(time);
  };

  const handlePackageSelect = (pkg: string) => {
    setSelectedPackage(pkg);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      alert('Please select a package to continue');
      return;
    }
    
    // Map package names to their URLs
    const packageUrlMap: { [key: string]: string } = {
      "Wedding Photography": "/packages/wedding",
      "Baby Shoot": "/packages/baby-shoot",
      "Maternity Photography": "/packages/maternity",
      "Family Portraits": "/packages/family-portraits",
      "Convocation": "/packages/convocation",
      "Call to Bar": "/packages/call-to-bar",
      "General Photography": "/packages/general"
    };
    
    const packageUrl = packageUrlMap[selectedPackage];
    
    if (packageUrl) {
      // Store booking info in sessionStorage to persist across pages
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        date: selectedDate,
        timeSlots: selectedTimeSlots.sort((a, b) => 
          timeSlots.indexOf(a) - timeSlots.indexOf(b)
        ),
        package: selectedPackage,
        ...formData
      }));
      
      // Redirect to package details page
      router.push(packageUrl);
    } else {
      alert('Package page not found. Please try again.');
    }
  };

  // Generate calendar days
  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }
    
    return days;
  };

  const calendarDays = generateCalendar();
  const today = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <Wrapper>
      <HeaderTransparent />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Hero Section */}
            <div className="booking-hero-area pt-190 pb-60">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8">
                    <div className="booking-hero-content text-center">
                      <h1 className="booking-title">Choose Your Package</h1>
                      <p className="booking-subtitle">Select a photography package to view details, pricing, and book your session</p>
                      <Link href="/gallery" className="view-packages-link">
                        📸 View Our Gallery
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Section */}
            <div className="booking-area pb-120">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <form onSubmit={handleSubmit} className="booking-form">
                      
                      {/* Package Selection */}
                      <div className="booking-section">
                        <h2 className="section-title">
                          <span className="step-number">1</span>
                          Select Package Type
                        </h2>
                        <div className="package-grid">
                          {packageTypes.map((pkg) => (
                            <div
                              key={pkg}
                              className={`package-card ${selectedPackage === pkg ? 'selected' : ''}`}
                              onClick={() => handlePackageSelect(pkg)}
                            >
                              <div className="package-icon">📸</div>
                              <h4>{pkg}</h4>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calendar Section */}
                      <div className="booking-section">
                        <h2 className="section-title">
                          <span className="step-number">2</span>
                          Choose Your Date
                        </h2>
                        <div className="calendar-wrapper">
                          <div className="calendar-header">
                            <h3>{monthNames[today.getMonth()]} {today.getFullYear()}</h3>
                          </div>
                          <div className="calendar-grid">
                            <div className="calendar-day-name">Sun</div>
                            <div className="calendar-day-name">Mon</div>
                            <div className="calendar-day-name">Tue</div>
                            <div className="calendar-day-name">Wed</div>
                            <div className="calendar-day-name">Thu</div>
                            <div className="calendar-day-name">Fri</div>
                            <div className="calendar-day-name">Sat</div>
                            
                            {calendarDays.map((day, index) => {
                              if (!day) {
                                return <div key={`empty-${index}`} className="calendar-day empty"></div>;
                              }
                              
                              const isPast = day < today && day.toDateString() !== today.toDateString();
                              const isSelected = selectedDate?.toDateString() === day.toDateString();
                              const isToday = day.toDateString() === today.toDateString();
                              
                              return (
                                <div
                                  key={index}
                                  className={`calendar-day ${isPast ? 'past' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                                  onClick={() => !isPast && handleDateSelect(day)}
                                >
                                  {day.getDate()}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div className="booking-section">
                        <h2 className="section-title">
                          <span className="step-number">3</span>
                          Select Time Slots (30 min intervals, up to 2 hours)
                        </h2>
                        <p className="time-instruction">
                          Click to select your start time, then select consecutive slots up to 2 hours maximum.
                          Selected duration: <strong>{selectedTimeSlots.length * 30} minutes</strong>
                          {bookedSlots.length > 0 && (
                            <span className="booked-info"> • 🔴 Red slots are already booked</span>
                          )}
                        </p>
                        <div className="time-grid">
                          {timeSlots.map((time) => (
                            <div
                              key={time}
                              className={`time-slot ${isTimeSlotSelected(time) ? 'selected' : ''} ${isTimeSlotBooked(time) ? 'booked' : ''} ${isTimeSlotDisabled(time) && !isTimeSlotBooked(time) ? 'disabled' : ''}`}
                              onClick={() => !isTimeSlotDisabled(time) && handleTimeSelect(time)}
                              title={isTimeSlotBooked(time) ? 'This time slot is already booked' : ''}
                            >
                              {time}
                              {isTimeSlotBooked(time) && <span className="booked-badge">Booked</span>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="booking-section">
                        <h2 className="section-title">
                          <span className="step-number">4</span>
                          Your Information
                        </h2>
                        <div className="contact-info-grid">
                          <div className="form-group">
                            <label>Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+234 XXX XXX XXXX"
                              required
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Additional Notes (Optional)</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Any special requests or details about your session..."
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Summary & Submit */}
                      <div className="booking-summary">
                        <h3>Booking Summary</h3>
                        <div className="summary-details">
                          <div className="summary-item">
                            <span className="label">Package:</span>
                            <span className="value">{selectedPackage || "Not selected"}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Date:</span>
                            <span className="value">
                              {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              }) : "Not selected"}
                            </span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Time:</span>
                            <span className="value">
                              {selectedTimeSlots.length > 0 
                                ? `${selectedTimeSlots[0]} - ${selectedTimeSlots[selectedTimeSlots.length - 1]} (${selectedTimeSlots.length * 30} mins)` 
                                : "Not selected"}
                            </span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Duration:</span>
                            <span className="value">
                              {selectedTimeSlots.length > 0 
                                ? `${selectedTimeSlots.length * 30} minutes (${selectedTimeSlots.length} slots)` 
                                : "Not selected"}
                            </span>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="submit-btn"
                          disabled={!selectedPackage}
                        >
                          View Package Details
                        </button>
                        <p className="calendly-note">
                          📅 Select a package to view details and pricing
                        </p>
                      </div>
                    </form>
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
