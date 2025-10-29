"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";
import { PACKAGE_DATA, formatPrice, getPackageBySlug } from "@/data/package-pricing";
import "./booking.scss";

// Payment information
const PAYMENT_INFO = {
  accountNumber: "5646143460",
  bankName: "Moniepoint",
  accountName: "LUM Studios"
};

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [selectedPackageSlug, setSelectedPackageSlug] = useState("");
  const [selectedPackageType, setSelectedPackageType] = useState<"classic" | "walkin" | "">("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [numEditedPictures, setNumEditedPictures] = useState(1); // For "per picture" pricing
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]); // Multiple time slots
  const [bookedSlots, setBookedSlots] = useState<string[]>([]); // Booked time slots for selected date
  const [loadingSlots, setLoadingSlots] = useState(false); // Loading state for fetching booked slots
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  
  // Payment data
  const [paymentData, setPaymentData] = useState({
    accountName: "",
    bankName: "",
    transactionId: ""
  });
  
  const [copySuccess, setCopySuccess] = useState(false);
  const [waInitiated, setWaInitiated] = useState(false);
  const [waLink, setWaLink] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Initialize from URL params
  useEffect(() => {
    const packageParam = searchParams?.get('package');
    const typeParam = searchParams?.get('type');
    const looksParam = searchParams?.get('looks');
    
    if (packageParam) {
      setSelectedPackageSlug(packageParam);
    }
    if (typeParam === 'classic' || typeParam === 'walkin') {
      setSelectedPackageType(typeParam);
    }
    if (looksParam) {
      const looksNum = parseInt(looksParam, 10);
      if (!Number.isNaN(looksNum)) {
        // We'll set selectedOptionIndex after we know options (in another effect)
        // Temporarily store in state via URLSearchParams by keeping it here; selection happens below
      }
    }
  }, [searchParams]);

  // Get current package data
  const currentPackage = selectedPackageSlug ? getPackageBySlug(selectedPackageSlug) : null;
  const currentOptions = currentPackage && selectedPackageType 
    ? (selectedPackageType === 'classic' ? currentPackage.classic : currentPackage.walkin)
    : [];
  const currentOption = currentOptions[selectedOptionIndex];
  // When package/type changes, preselect option by URL looks or sensible default
  useEffect(() => {
    if (!currentOptions || currentOptions.length === 0) return;
    const looksParam = searchParams?.get('looks');
    if (looksParam) {
      const looksNum = parseInt(looksParam, 10);
      if (!Number.isNaN(looksNum)) {
        const foundIdx = currentOptions.findIndex(o => o.type === 'look' && (o as any).looks === looksNum);
        if (foundIdx !== -1) {
          setSelectedOptionIndex(foundIdx);
          return;
        }
      }
    }
    // Default: prefer looks == 2, else first 'look', else 0
    const idx2 = currentOptions.findIndex(o => o.type === 'look' && (o as any).looks === 2);
    if (idx2 !== -1) { setSelectedOptionIndex(idx2); return; }
    const idxLook = currentOptions.findIndex(o => o.type === 'look');
    if (idxLook !== -1) { setSelectedOptionIndex(idxLook); return; }
    setSelectedOptionIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackageSlug, selectedPackageType, currentOptions?.length]);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const fetchBookedSlots = async () => {
      setLoadingSlots(true);
      try {
        const response = await fetch(`/api/bookings?date=${selectedDate}`);
        const data = await response.json();
        
        if (data.success) {
          setBookedSlots(data.bookedSlots || []);
        } else {
          console.error('Failed to fetch booked slots:', data.error);
          setBookedSlots([]);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
        setBookedSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  // Calculate total price
  const totalPrice = currentOption 
    ? (currentOption.type === 'single' ? currentOption.price * numEditedPictures : currentOption.price)
    : 0;

  // Time slots (1-hour intervals from 9:00 AM to 5:00 PM)
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  // Get end time for a slot (1 hour later)
  const getEndTime = (startTime: string): string => {
    const index = timeSlots.indexOf(startTime);
    if (index === -1 || index === timeSlots.length - 1) {
      // If last slot, add 1 hour manually
      const hour = parseInt(startTime.split(':')[0]);
      const period = startTime.includes('PM') ? 'PM' : 'AM';
      let nextHour = hour + 1;
      let nextPeriod = period;
      
      if (nextHour === 12 && period === 'AM') {
        nextPeriod = 'PM';
      } else if (nextHour === 13) {
        nextHour = 1;
        nextPeriod = 'PM';
      } else if (nextHour > 12) {
        nextHour = nextHour - 12
      }
      
      return `${String(nextHour).padStart(2, '0')}:00 ${nextPeriod}`;
    }
    return timeSlots[index + 1];
  };

  // Check if a time slot can be selected (is it valid/clickable?)
  const isSlotSelectable = (slot: string): boolean => {
    // If slot is already booked, it cannot be selected
    if (bookedSlots.includes(slot)) {
      return false;
    }
    
    // If no slots selected, all non-booked slots are available
    if (selectedTimeSlots.length === 0) {
      return true;
    }
    
    // If slot is already selected, it can be clicked to deselect
    if (selectedTimeSlots.includes(slot)) {
      return true;
    }
    
    // If already at max 1 slot, can't add more
    if (selectedTimeSlots.length >= 1) {
      return false;
    }
    
    // Check if slot is adjacent to current selection
    const slotIndex = timeSlots.indexOf(slot);
    const currentIndices = selectedTimeSlots.map(s => timeSlots.indexOf(s)).sort((a, b) => a - b);
    const minIndex = Math.min(...currentIndices);
    const maxIndex = Math.max(...currentIndices);
    
    // Slot must be directly before first slot or directly after last slot
    return slotIndex === minIndex - 1 || slotIndex === maxIndex + 1;
  };

  // Handle time slot selection (max 1 slot = 1 hour)
  const toggleTimeSlot = (slot: string) => {
    // Check if slot is already booked
    if (bookedSlots.includes(slot)) {
      alert('This time slot is already booked. Please select another time.');
      return;
    }
    
    const slotIndex = timeSlots.indexOf(slot);
    
    if (selectedTimeSlots.includes(slot)) {
      // Remove slot
      setSelectedTimeSlots(selectedTimeSlots.filter(s => s !== slot));
    } else {
      // Check if we can add this slot
      if (selectedTimeSlots.length === 0) {
        // First slot - can always add
        setSelectedTimeSlots([slot]);
      } else if (selectedTimeSlots.length >= 1) {
        // Already at max (1 slot only)
        alert('1 Time Slot Allowed');
      } else {
        // This code won't be reached since max is 1, but keeping for safety
        setSelectedTimeSlots([slot]);
      }
    }
  };

  // Handle copy to clipboard
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(PAYMENT_INFO.accountNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  // Validation
  const validateStep1 = () => {
    if (!selectedPackageSlug) {
      alert('Please select a shoot category');
      return false;
    }
    if (!selectedPackageType) {
      alert('Please select a package type (Classic or Walk-in)');
      return false;
    }
    if (currentOption?.type === 'single' && numEditedPictures < 1) {
      alert('Please enter at least 1 edited picture');
      return false;
    }
    if (!selectedDate) {
      alert('Please select a date');
      return false;
    }
    if (selectedTimeSlots.length === 0) {
      alert('Please select at least one time slot');
      return false;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!paymentData.accountName.trim()) {
      alert('Please enter the account name used for payment');
      return false;
    }
    if (!paymentData.bankName.trim()) {
      alert('Please enter your bank name');
      return false;
    }
    return true;
  };

  // Step navigation
  const goToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep3 = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToStep2 = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp submission
  const sendToWhatsApp = () => {
    // Use server to initiate booking (finalize=false). The server will check for slot conflicts
    // and return a wa.me link. Only after the user sends the WhatsApp message and confirms
    // will we call finalize to write to the DB.
    if (!validateStep3()) return;

    const payload = {
      date: selectedDate,
      timeSlots: selectedTimeSlots,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      package: currentPackage?.slug || selectedPackageSlug || null,
      // include package and seller payment info so server can format WhatsApp receipt
      packageInfo: {
        category: currentPackage?.name || selectedPackageSlug || null,
        packageLabel: selectedPackageType === 'classic' ? 'Classic Package' : selectedPackageType === 'walkin' ? 'Walk-in Package' : '',
        option: currentOption?.description || '',
        looks: (currentOption as any)?.looks || null,
        imagesEdited: currentOption?.images?.edited || (currentOption?.type === 'single' ? numEditedPictures : 0),
        imagesUnedited: currentOption?.images?.unedited || 0,
        price: totalPrice,
        priceFormatted: formatPrice(totalPrice),
      },
      sellerPayment: {
        accountNumber: PAYMENT_INFO.accountNumber,
        bankName: PAYMENT_INFO.bankName,
        accountName: PAYMENT_INFO.accountName,
      },
      finalize: false,
      // include payment info so the server can include it in the wa message (not stored yet)
      payment: paymentData,
      notes: formData.notes,
    } as any;

    setLoadingSlots(true);
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
        .then((json) => {
          if (json?.success && json.waLink) {
            // open WhatsApp and allow user to send message
            window.open(json.waLink, '_blank');
            setWaLink(json.waLink);
            setWaInitiated(true);
            setCopySuccess(false);
            setMessage('WhatsApp message opened. After sending the message, click "Confirm payment & finalize booking".');
          } else {
            setMessage(json?.error || 'Failed to initiate booking');
          }
        })
      .catch((err) => {
        console.error('Failed to initiate booking', err);
        setMessage('Failed to initiate booking');
      })
      .finally(() => setLoadingSlots(false));
  };

  // Finalize booking after user confirms they sent WhatsApp / paid
  const confirmAndFinalize = async () => {
    if (!selectedDate || selectedTimeSlots.length === 0) {
      alert('Missing date or time slot');
      return;
    }
    setLoadingSlots(true);
    setMessage(null);
    try {
      const basePayload = {
        date: selectedDate,
        timeSlots: selectedTimeSlots,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        package: currentPackage?.slug || selectedPackageSlug || null,
  notes: formData.notes,
        packageInfo: {
          category: currentPackage?.name || selectedPackageSlug || null,
          packageLabel: selectedPackageType === 'classic' ? 'Classic Package' : selectedPackageType === 'walkin' ? 'Walk-in Package' : '',
          option: currentOption?.description || '',
          looks: (currentOption as any)?.looks || null,
          imagesEdited: currentOption?.images?.edited || (currentOption?.type === 'single' ? numEditedPictures : 0),
          imagesUnedited: currentOption?.images?.unedited || 0,
          price: totalPrice,
          priceFormatted: formatPrice(totalPrice),
        },
        sellerPayment: {
          accountNumber: PAYMENT_INFO.accountNumber,
          bankName: PAYMENT_INFO.bankName,
          accountName: PAYMENT_INFO.accountName,
        },
        payment: paymentData,
      } as any;

      // Ensure WhatsApp link is opened on click. If we already have waLink (from earlier initiate), open it.
      // Otherwise request an initiation from the server to get a waLink, open it, then continue to finalize.
      try {
        if (waLink) {
          // Open existing waLink in a new tab (user click -> allowed)
          window.open(waLink, '_blank');
        } else {
          const initRes = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...basePayload, finalize: false }),
          });
          const initJson = await initRes.json();
          if (initJson?.success && initJson.waLink) {
            setWaLink(initJson.waLink);
            setWaInitiated(true);
            window.open(initJson.waLink, '_blank');
          }
        }
      } catch (openErr) {
        // Opening WhatsApp failed - continue to finalize anyway and show a message
        console.warn('Failed to open WhatsApp link before finalize:', openErr);
      }

      // Now finalize (write to DB). Mark paid=true since user confirmed payment.
      const finalizePayload = { ...basePayload, finalize: true, paid: true } as any;
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalizePayload),
      });
      const json = await res.json();
      if (res.status === 201 && json.success) {
        setMessage('Booking finalized successfully. We will contact you on WhatsApp to confirm.');
        // update UI bookedSlots to block the selected slot immediately
        setBookedSlots((prev) => [...prev, ...selectedTimeSlots]);
        // reset to initial state or show a success screen
        setSelectedTimeSlots([]);
        setCurrentStep(1);
        setFormData({ name: '', email: '', phone: '', notes: '' });
        setPaymentData({ accountName: '', bankName: '', transactionId: '' });
      } else {
        setMessage(json?.error || 'Failed to finalize booking');
      }
    } catch (e) {
      console.error(e);
      setMessage('Failed to finalize booking');
    } finally {
      setLoadingSlots(false);
    }
  };

  return (
    <Wrapper>
      <HeaderOne />
      
      <div className="booking-page">
        {/* Hero Section */}
        <section className="booking-hero pt-180 pb-60">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div className="booking-hero-content text-center">
                  <h1 className="booking-title">Book Your Photography Session</h1>
                  <p className="booking-subtitle">
                    Complete your booking in 3 simple steps
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="booking-progress">
                    <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                      <div className="step-circle">1</div>
                      <span className="step-label">Details</span>
                    </div>
                    <div className={`progress-line ${currentStep > 1 ? 'active' : ''}`}></div>
                    <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                      <div className="step-circle">2</div>
                      <span className="step-label">Review</span>
                    </div>
                    <div className={`progress-line ${currentStep > 2 ? 'active' : ''}`}></div>
                    <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                      <div className="step-circle">3</div>
                      <span className="step-label">Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Booking Details */}
        {currentStep === 1 && (
          <section className="booking-step pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <div className="booking-form-card">
                    <h2 className="step-title">Booking Details</h2>
                    
                    {/* Shoot Category */}
                    <div className="form-group">
                      <label className="form-label">Shoot Category *</label>
                      <select
                        className="form-control"
                        value={selectedPackageSlug}
                        onChange={(e) => {
                          setSelectedPackageSlug(e.target.value);
                          setSelectedOptionIndex(0);
                        }}
                      >
                        <option value="">Select a category...</option>
                        {PACKAGE_DATA.map((pkg) => (
                          <option key={pkg.id} value={pkg.slug}>
                            {pkg.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Package Type */}
                    {selectedPackageSlug && (
                      <div className="form-group">
                        <label className="form-label">Package Type *</label>
                        <div className="package-type-grid">
                          <div
                            className={`package-type-option ${selectedPackageType === 'classic' ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedPackageType('classic');
                              setSelectedOptionIndex(0);
                            }}
                          >
                            <h4>Classic Package</h4>
                            <p>Premium photography experience</p>
                            <ul className="package-features-mini">
                              <li>Lead photographer</li>
                              <li>Premium props</li>
                              <li>Priority delivery (3 days)</li>
                            </ul>
                          </div>
                          <div
                            className={`package-type-option ${selectedPackageType === 'walkin' ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedPackageType('walkin');
                              setSelectedOptionIndex(0);
                            }}
                          >
                            <h4>Walk-in Package</h4>
                            <p>Quick & affordable sessions</p>
                            <ul className="package-features-mini">
                              <li>Associate photographer</li>
                              <li>Pose assistance</li>
                              <li>Delivery within 3 days</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pricing Options */}
                    {selectedPackageType && currentOptions.length > 0 && (
                      <div className="form-group">
                        <label className="form-label">Select Option *</label>
                        <div className="pricing-options-grid">
                          {currentOptions.map((option, idx) => (
                            <div
                              key={idx}
                              className={`pricing-option ${selectedOptionIndex === idx ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedOptionIndex(idx);
                                if (option.type === 'single') {
                                  setNumEditedPictures(1);
                                }
                              }}
                            >
                              <div className="option-header">
                                <h5>{option.description}</h5>
                                <span className="option-price">
                                  {formatPrice(option.price)}
                                  {option.type === 'single' && ' each'}
                                </span>
                              </div>
                              <div className="option-details">
                                <span>{option.images.edited} edited</span>
                                {option.images.unedited > 0 && (
                                  <span>, {option.images.unedited} unedited</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Number of Pictures Input (for "per picture" pricing) */}
                    {currentOption?.type === 'single' && (
                      <div className="form-group">
                        <label className="form-label">Number of Edited Pictures *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={numEditedPictures}
                          onChange={(e) => setNumEditedPictures(Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                          placeholder="Enter number of pictures"
                        />
                        <small className="form-text">Price per picture: {formatPrice(currentOption.price)} × {numEditedPictures} = {formatPrice(totalPrice)}</small>
                      </div>
                    )}

                    {/* Personal Information */}
                    <div className="form-section-title">Personal Information</div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>

                    {/* Schedule */}
                    <div className="form-section-title">Schedule Your Session</div>
                    
                    <div className="form-group">
                      <label className="form-label">Preferred Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Select Time Slots * 
                        <span className="time-slot-info">
                          (Select 1-hour slot)
                        </span>
                      </label>
                      {loadingSlots && (
                        <div className="loading-slots-message">
                          <span>Loading available time slots...</span>
                        </div>
                      )}
                      <div className="time-slots-grid">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlots.includes(slot);
                          const isBooked = bookedSlots.includes(slot);
                          const isSelectable = isSlotSelectable(slot);
                          
                          return (
                            <button
                              key={slot}
                              type="button"
                              className={`time-slot-btn ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${!isSelectable && !isBooked ? 'disabled' : ''}`}
                              onClick={() => toggleTimeSlot(slot)}
                              disabled={!isSelectable}
                              title={isBooked ? 'This time slot is already booked' : isSelected ? 'Click to deselect' : 'Click to select'}
                            >
                              {slot}
                              {isBooked && <span className="booked-indicator">⊗</span>}
                            </button>
                          );
                        })}
                      </div>
                      {selectedTimeSlots.length > 0 && (
                        <div className="selected-time-summary">
                          {(() => {
                            const parse12Hour = (time12: string): Date => {
                              // Expect formats like "09:00 AM" or "12:30 PM"
                              const match = time12.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
                              if (!match) return new Date(NaN);
                              let [_, hhStr, mmStr, ap] = match;
                              let hh = parseInt(hhStr, 10) % 12;
                              if (ap.toUpperCase() === 'PM') hh += 12;
                              const mm = parseInt(mmStr, 10);
                              const d = new Date();
                              d.setHours(hh, mm, 0, 0);
                              return d;
                            };

                            const start = parse12Hour(selectedTimeSlots[0]);
                            if (isNaN(start.getTime())) return null;
                            const end = new Date(start.getTime() + 60 * 60 * 1000); // add 1 hour
                            const fmt = (date: Date) => date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

                            return (
                              <strong>
                                Selected: {fmt(start)} - {fmt(end)} (60 minutes)
                              </strong>
                            );
                          })()}
                        </div>
                      )}

                    {selectedTimeSlots.length === 0 && (
                      <small className="form-text">
                        💡 Tip: Click a starting time. Only adjacent slots will remain available to extend your session.
                      </small>
                    )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Additional Notes (Optional)</label>
                      <textarea
                        name="notes"
                        className="form-control"
                        rows={4}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requests or requirements..."
                      ></textarea>
                    </div>

                    {/* Price Display */}
                    {totalPrice > 0 && (
                      <div className="price-summary">
                        <span>Total Amount:</span>
                        <span className="price-amount">{formatPrice(totalPrice)}</span>
                      </div>
                    )}

                    <button type="button" className="btn-continue" onClick={goToStep2}>
                      Continue to Review →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 2: Review & Confirm */}
        {currentStep === 2 && (
          <section className="booking-step pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <div className="booking-form-card">
                    <h2 className="step-title">Review Your Booking</h2>
                    
                    <div className="review-section">
                      <h3 className="review-section-title">Package Details</h3>
                      <div className="review-grid">
                        <div className="review-item">
                          <span className="review-label">Shoot Category:</span>
                          <span className="review-value">{currentPackage?.name}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Package Type:</span>
                          <span className="review-value">
                            {selectedPackageType === 'classic' ? 'Classic Package' : 'Walk-in Package'}
                          </span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Selected Option:</span>
                          <span className="review-value">
                            {currentOption?.description}
                            {currentOption?.type === 'single' && ` × ${numEditedPictures}`}
                          </span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Image Delivery:</span>
                          <span className="review-value">
                            {currentOption?.type === 'single' 
                              ? `${numEditedPictures} edited` 
                              : `${currentOption?.images.edited} edited${currentOption && currentOption.images.unedited > 0 ? `, ${currentOption.images.unedited} unedited` : ''}`
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3 className="review-section-title">Personal Information</h3>
                      <div className="review-grid">
                        <div className="review-item">
                          <span className="review-label">Name:</span>
                          <span className="review-value">{formData.name}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Email:</span>
                          <span className="review-value">{formData.email}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Phone:</span>
                          <span className="review-value">{formData.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3 className="review-section-title">Schedule</h3>
                      <div className="review-grid">
                        <div className="review-item">
                          <span className="review-label">Date:</span>
                          <span className="review-value">
                            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : ''}
                          </span>
                        </div>
        <div className="review-item">
                          <span className="review-label">Time:</span>
                          <span className="review-value">
                            {selectedTimeSlots.length > 0 
                              ? `${selectedTimeSlots[0]} - ${getEndTime(selectedTimeSlots[0])}`
                              : 'N/A'
                            }
                          </span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Duration:</span>
                          <span className="review-value">
                            {selectedTimeSlots.length > 0 
                              ? `1 hour (1 slot)`
                              : 'N/A'
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {formData.notes && (
                      <div className="review-section">
                        <h3 className="review-section-title">Additional Notes</h3>
                        <p className="review-notes">{formData.notes}</p>
                      </div>
                    )}

                    <div className="price-summary-large">
                      <span>Total Amount to Pay:</span>
                      <span className="price-amount">{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="button-group"> 
                      <button type="button" className="btn-secondary" onClick={goBackToStep1}>
                        ← Edit Booking
                      </button>
                      <button type="button" className="btn-continue" onClick={goToStep3}>
                        Proceed to Payment →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Payment Details */}
        {currentStep === 3 && (
          <section className="booking-step pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <div className="booking-form-card">
                    <h2 className="step-title">Payment Details</h2>
                    
                    {/* Payment Instructions */}
                    <div className="payment-info-card">
                      <div className="payment-info-header">
                        <h3>Transfer {formatPrice(totalPrice)} to:</h3>
                      </div>
                      
                      <div className="payment-details">
                        <div className="payment-detail-item">
                          <span className="detail-label">Account Number:</span>
                          <div className="detail-value-with-copy">
                            <span className="account-number">{PAYMENT_INFO.accountNumber}</span>
                            <button 
                              type="button"
                              className={`btn-copy ${copySuccess ? 'copied' : ''}`}
                              onClick={copyAccountNumber}
                            >
                              {copySuccess ? '✓ Copied!' : '📋 Copy'}
                            </button>
                          </div>
                        </div>
                        
                        <div className="payment-detail-item">
                          <span className="detail-label">Bank Name:</span>
                          <span className="detail-value">{PAYMENT_INFO.bankName}</span>
                        </div>
                        
                        <div className="payment-detail-item">
                          <span className="detail-label">Account Name:</span>
                          <span className="detail-value">{PAYMENT_INFO.accountName}</span>
                        </div>
                      </div>

                      <div className="payment-instructions">
                        <h4>💳 Payment Instructions:</h4>
                        <ol>
                          <li>Transfer <strong>{formatPrice(totalPrice)}</strong> to the account above</li>
                          <li>Fill in your payment confirmation details below</li>
                          <li>Click &ldquo;Send to WhatsApp&rdquo; to complete your booking</li>
                        </ol>
                      </div>
                    </div>

                    {/* Payment Confirmation Form */}
                    <div className="payment-confirmation-form">
                      <h3 className="form-section-title">Payment Confirmation</h3>
                      
                      <div className="form-group">
                        <label className="form-label">Account Name (From which you transferred) *</label>
                        <input
                          type="text"
                          name="accountName"
                          className="form-control"
                          value={paymentData.accountName}
                          onChange={handlePaymentInputChange}
                          placeholder="Enter the name on your bank account"
                        />
                        <small className="form-hint">This helps us verify your payment</small>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Bank Name (From which you transferred) *</label>
                        <input
                          type="text"
                          name="bankName"
                          className="form-control"
                          value={paymentData.bankName}
                          onChange={handlePaymentInputChange}
                          placeholder="e.g., First Bank, GTBank, Access Bank"
                        />
                        <small className="form-hint">Your bank name helps us track the payment</small>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Transaction ID / Reference (Optional)</label>
                        <input
                          type="text"
                          name="transactionId"
                          className="form-control"
                          value={paymentData.transactionId}
                          onChange={handlePaymentInputChange}
                          placeholder="e.g., TRX123456789"
                        />
                        <small className="form-hint">If available from your bank receipt</small>
                      </div>
                    </div>

                    <div className="price-summary-large">
                      <span>Amount to Pay:</span>
                      <span className="price-amount">{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="button-group">
                      <button type="button" className="btn-secondary" onClick={goBackToStep2}>
                        ← Back to Review
                      </button>
                      {!waInitiated ? (
                        <button
                          type="button"
                          className="btn-whatsapp"
                          onClick={sendToWhatsApp}
                          disabled={!paymentData.accountName.trim() || loadingSlots}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                          </svg>
                          Send Booking to WhatsApp
                        </button>
                      ) : (
                        <div>
                          <a className="btn btn-success me-2" href={waLink || '#'} target="_blank" rel="noopener noreferrer">
                            Open WhatsApp
                          </a>
                          <button type="button" className="btn-continue" onClick={confirmAndFinalize} disabled={loadingSlots}>
                            {loadingSlots ? 'Finalizing...' : 'I have sent the message — Confirm payment & finalize'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Visible message area for errors/success from server */}
                    {message && (
                      <div className={`booking-message ${message.toLowerCase().includes('fail') || message.toLowerCase().includes('error') ? 'error' : 'success'}`} style={{ marginTop: 16 }}>
                        {message}
                      </div>
                    )}

                    <div className="security-note">
                      <span className="security-icon">🔒</span>
                      <p>Your information is secure. We&apos;ll confirm your booking via WhatsApp.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <FooterTwo />
    </Wrapper>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
