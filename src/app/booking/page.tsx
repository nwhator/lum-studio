"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  
  // Payment data
  const [paymentData, setPaymentData] = useState({
    accountName: "",
    transactionId: ""
  });
  
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const packageParam = searchParams?.get('package');
    const typeParam = searchParams?.get('type');
    
    if (packageParam) {
      setSelectedPackageSlug(packageParam);
    }
    if (typeParam === 'classic' || typeParam === 'walkin') {
      setSelectedPackageType(typeParam);
    }
  }, [searchParams]);

  // Get current package data
  const currentPackage = selectedPackageSlug ? getPackageBySlug(selectedPackageSlug) : null;
  const currentOptions = currentPackage && selectedPackageType 
    ? (selectedPackageType === 'classic' ? currentPackage.classic : currentPackage.walkin)
    : [];
  const currentOption = currentOptions[selectedOptionIndex];

  // Calculate total price
  const totalPrice = currentOption ? currentOption.price : 0;

  // Time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

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
    if (!selectedDate) {
      alert('Please select a date');
      return false;
    }
    if (!selectedTime) {
      alert('Please select a time');
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
    if (!validateStep3()) return;

    const whatsappNumber = "2349022292514";
    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    const message = `
✨ *NEW BOOKING REQUEST* ✨

━━━━━━━━━━━━━━━━━━━━

��� *PACKAGE DETAILS*
━━━━━━━━━━━━━━━━━━━━
• Category: ${currentPackage?.name || 'N/A'}
• Package: ${selectedPackageType === 'classic' ? 'Classic Package' : 'Walk-in Package'}
• Option: ${currentOption?.description || 'N/A'}
• Images: ${currentOption ? `${currentOption.images.edited} edited${currentOption.images.unedited > 0 ? `, ${currentOption.images.unedited} unedited` : ''}` : 'N/A'}
• Price: ${formatPrice(totalPrice)}

��� *CUSTOMER INFORMATION*
━━━━━━━━━━━━━━━━━━━━
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

��� *SCHEDULE*
━━━━━━━━━━━━━━━━━━━━
• Date: ${formattedDate}
• Time: ${selectedTime}

��� *PAYMENT CONFIRMATION*
━━━━━━━━━━━━━━━━━━━━
• Transfer From: ${paymentData.accountName}
• Transaction ID: ${paymentData.transactionId || 'Not provided'}
• Amount: ${formatPrice(totalPrice)}
• Bank Account: ${PAYMENT_INFO.accountNumber} (${PAYMENT_INFO.bankName})

��� *ADDITIONAL NOTES*
━━━━━━━━━━━━━━━━━━━━
${formData.notes || 'No additional message'}

━━━━━━━━━━━━━━━━━━━━
��� *Sent from LUM Studios Booking*
www.thelumstudios.com
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Wrapper>
      <HeaderTransparent />
      
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
                              onClick={() => setSelectedOptionIndex(idx)}
                            >
                              <div className="option-header">
                                <h5>{option.description}</h5>
                                <span className="option-price">{formatPrice(option.price)}</span>
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
                    
                    <div className="row">
                      <div className="col-md-6">
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Preferred Time *</label>
                          <select
                            className="form-control"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          >
                            <option value="">Select time...</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Additional Notes</label>
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
                          <span className="review-value">{currentOption?.description}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Image Delivery:</span>
                          <span className="review-value">
                            {currentOption?.images.edited} edited
                            {currentOption && currentOption.images.unedited > 0 && 
                              `, ${currentOption.images.unedited} unedited`
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
                          <span className="review-value">{selectedTime}</span>
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
                              {copySuccess ? '✓ Copied!' : '��� Copy'}
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
                        <h4>��� Payment Instructions:</h4>
                        <ol>
                          <li>Transfer <strong>{formatPrice(totalPrice)}</strong> to the account above</li>
                          <li>Fill in your payment confirmation details below</li>
                          <li>Click "Send to WhatsApp" to complete your booking</li>
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
                      <button 
                        type="button"
                        className="btn-whatsapp" 
                        onClick={sendToWhatsApp}
                        disabled={!paymentData.accountName.trim()}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                        </svg>
                        Send Booking to WhatsApp
                      </button>
                    </div>

                    <div className="security-note">
                      <span className="security-icon">���</span>
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
