// src/components/booking/enhanced-booking-form.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  formatPrice,
  PAYMENT_INFO,
} from "@/data/package-pricing";
import { type Package, EVENT_TYPES } from "@/data/event-pricing";
import { EventTypeSelector } from "./EventTypeSelector";

// Helper to copy to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

interface BookingFormData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  // Event Details
  eventDate: string;
  eventLocation: string;
  eventName: string;
  additionalNotes: string;
  // Pricing Details
  packageId: string; // wedding package id
  selectedAddOnIds: string[];
  manualPrice?: number;
  // Payment Details
  payerAccountName: string;
  transactionId: string;
}

interface EnhancedBookingFormProps {
  initialEventType?: string;
  onSwitchToStudio?: () => void;
}

export default function EnhancedBookingForm({
  initialEventType = "",
  onSwitchToStudio,
}: EnhancedBookingFormProps) {
  const [step, setStep] = useState<"eventType" | "booking" | "checkout" | "payment">("eventType");
  const [selectedEvent, setSelectedEvent] = useState<string>(initialEventType);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    eventLocation: "",
    eventName: "",
    additionalNotes: "",
    packageId: "",
    selectedAddOnIds: [],
    payerAccountName: "",
    transactionId: "",
  });

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [copiedField, setCopiedField] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // If initialEventType changes from outside, update selectedEvent
  useEffect(() => {
    if (initialEventType) {
      setSelectedEvent(initialEventType);
    }
  }, [initialEventType]);

  // When event type changes, reset pricing-specific fields
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      packageId: "",
      selectedAddOnIds: [],
      manualPrice: undefined,
    }));
    setSelectedPackage(null);
    setTotalPrice(0);
    setDeposit(0);

    // Auto-select first package for wedding
    if (selectedEvent === "wedding") {
      const pkg = EVENT_TYPES.find((e) => e.id === "wedding")?.packages?.[0];
      if (pkg) {
        setSelectedPackage(pkg);
        setFormData((prev) => ({ ...prev, packageId: pkg.id }));
        setTotalPrice(pkg.price);
        setDeposit(Math.round(pkg.price * 0.7));
      }
    }
  }, [selectedEvent]);

  // Re-calculate total when package or add-ons change
  useEffect(() => {
    if (selectedEvent === "wedding" && selectedPackage) {
      const addOnTotal = formData.selectedAddOnIds.reduce((sum, id) => {
        const addOn = selectedPackage.addOns?.find((a) => a.id === id);
        return sum + (addOn?.price ?? 0);
      }, 0);
      const newTotal = selectedPackage.price + addOnTotal;
      setTotalPrice(newTotal);
      setDeposit(Math.round(newTotal * 0.7));
    }
  }, [formData.selectedAddOnIds, selectedPackage, selectedEvent]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAddOn = (addOnId: string) => {
    setFormData((prev) => {
      const ids = prev.selectedAddOnIds.includes(addOnId)
        ? prev.selectedAddOnIds.filter((i) => i !== addOnId)
        : [...prev.selectedAddOnIds, addOnId];
      return { ...prev, selectedAddOnIds: ids };
    });
  };

  const selectWeddingPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setFormData((prev) => ({
      ...prev,
      packageId: pkg.id,
      selectedAddOnIds: [], // reset addons when package changes
    }));
  };

  const validateEventSelection = () => selectedEvent !== "";

  const validateBookingForm = () => {
    const base =
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.eventDate.trim() !== "" &&
      formData.eventLocation.trim() !== "" &&
      formData.eventName.trim() !== "";
    if (selectedEvent === "wedding") {
      return base && formData.packageId.trim() !== "";
    }
    return base;
  };

  const proceedToCheckout = () => {
    if (validateBookingForm()) {
      setStep("checkout");
      window.scrollTo({ top: 200, behavior: "smooth" });
    } else {
      alert("Please fill in all required fields (marked with *)");
    }
  };

  const proceedToPayment = () => {
    setStep("payment");
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // WhatsApp message generation – includes calculated totals
  const generateWhatsAppMessage = (): string => {
    const event = EVENT_TYPES.find((e) => e.id === selectedEvent);
    const packageName = selectedPackage?.name;
    const addOnNames = selectedPackage?.addOns
      ?.filter((a) => formData.selectedAddOnIds.includes(a.id))
      .map((a) => a.name)
      .join(", ");

    const dateFormatted = formData.eventDate
      ? new Date(formData.eventDate).toLocaleDateString("en-NG", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Not specified";

    const msg = [
      `🎯 *NEW EVENT BOOKING REQUEST*`,
      `━━━━━━━━━━━━━━━━━━`,
      ``,
      `📋 *EVENT INFORMATION*`,
      `• Type: ${event?.name || selectedEvent}`,
      `• Event / Client: ${formData.eventName}`,
      `• Date: ${dateFormatted}`,
      `• Location / Venue: ${formData.eventLocation}`,
      ``,
      `👤 *CONTACT DETAILS*`,
      `• Name: ${formData.fullName}`,
      `• Email: ${formData.email}`,
      `• Phone: ${formData.phone}`,
      ``,
      selectedEvent === "wedding" && selectedPackage
        ? `💼 *PACKAGE & PRICING*\n• Package: ${packageName}\n${
            addOnNames ? `• Add-ons: ${addOnNames}\n` : ""
          }• Total Price: ${formatPrice(totalPrice)}\n• 70% Deposit Due: ${formatPrice(deposit)}`
        : `💼 *PRICING*\n• Custom Quote requested`,
      ``,
      `💳 *PAYMENT CONFIRMATION*`,
      `• Payer Account: ${formData.payerAccountName}`,
      `• Transaction ID: ${formData.transactionId || "Pending"}`.trim(),
      formData.additionalNotes ? `\n📝 *SPECIAL NOTES*\n${formData.additionalNotes}` : "",
      ``,
      `━━━━━━━━━━━━━━━━━━`,
      `✅ Sent via Lum Studios Event Booking`,
    ]
      .filter(Boolean)
      .join("\n");

    return encodeURIComponent(msg);
  };

  const sendToWhatsApp = async () => {
    if (!formData.payerAccountName.trim()) {
      alert("Please enter your account name for payment verification");
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage("Processing your booking...");

    const message = generateWhatsAppMessage();
    const whatsappNumber = process.env.NEXT_PUBLIC_WA_PHONE || "2348145538164";
    const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    try {
      // Attempt backend record save
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          package: `event-${selectedEvent}`,
          date: formData.eventDate,
          timeSlots: ["Full Day Event"],
          notes: `Event: ${formData.eventName} | Location: ${formData.eventLocation} | Notes: ${formData.additionalNotes || ""}`,
          packageInfo: {
            category: `Event: ${EVENT_TYPES.find((e) => e.id === selectedEvent)?.name}`,
            packageName: selectedPackage?.name || "Custom Event Quote",
            price: totalPrice,
            deposit,
          },
          payment: {
            accountName: formData.payerAccountName,
            bankName: formData.transactionId || "Direct Transfer",
          },
          finalize: true,
          paid: true,
        }),
      }).catch(() => null); // Non-blocking
    } catch {
      // Continue to WhatsApp
    }

    setIsSubmitting(false);
    setFeedbackMessage("✅ Booking details recorded! Redirecting to WhatsApp...");

    // Launch WhatsApp
    window.open(waUrl, "_blank");
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2500);
    }
  };

  // Step order helper for progress indicator
  const STEP_ORDER = { eventType: 1, booking: 2, checkout: 3, payment: 4 } as const;
  const getStepClass = (stepName: keyof typeof STEP_ORDER) => {
    if (step === stepName) return "active";
    if (STEP_ORDER[step] > STEP_ORDER[stepName]) return "completed";
    return "";
  };

  const currentEventConfig = EVENT_TYPES.find((e) => e.id === selectedEvent);

  return (
    <div className="enhanced-booking-container">
      {/* Progress Bar */}
      <div className="booking-progress-wrapper">
        <div className="booking-progress">
          <div
            className={`progress-step ${getStepClass("eventType")}`}
            onClick={() => setStep("eventType")}
            style={{ cursor: "pointer" }}
          >
            <div className="step-circle">1</div>
            <span className="step-label">Event Type</span>
          </div>
          <div className={`progress-line ${STEP_ORDER[step] > 1 ? "active" : ""}`} />
          <div
            className={`progress-step ${getStepClass("booking")}`}
            onClick={() => validateEventSelection() && setStep("booking")}
            style={{ cursor: validateEventSelection() ? "pointer" : "default" }}
          >
            <div className="step-circle">2</div>
            <span className="step-label">Details &amp; Package</span>
          </div>
          <div className={`progress-line ${STEP_ORDER[step] > 2 ? "active" : ""}`} />
          <div
            className={`progress-step ${getStepClass("checkout")}`}
            onClick={() => validateBookingForm() && setStep("checkout")}
            style={{ cursor: validateBookingForm() ? "pointer" : "default" }}
          >
            <div className="step-circle">3</div>
            <span className="step-label">Review Quote</span>
          </div>
          <div className={`progress-line ${STEP_ORDER[step] > 3 ? "active" : ""}`} />
          <div className={`progress-step ${getStepClass("payment")}`}>
            <div className="step-circle">4</div>
            <span className="step-label">Payment</span>
          </div>
        </div>
      </div>

      <div className="booking-form-card">
        {/* STEP 1 – Event Type */}
        {step === "eventType" && (
          <div className="event-type-step-content">
            <EventTypeSelector
              selectedEventType={selectedEvent}
              onSelect={(id) => {
                setSelectedEvent(id);
              }}
            />

            <div className="step-actions mt-40">
              {onSwitchToStudio && (
                <button
                  type="button"
                  className="btn-outline-custom"
                  onClick={onSwitchToStudio}
                >
                  ← Switch to Studio Shoots
                </button>
              )}
              <button
                type="button"
                className="btn-primary-custom ml-auto"
                disabled={!validateEventSelection()}
                onClick={() => {
                  if (validateEventSelection()) {
                    setStep("booking");
                    window.scrollTo({ top: 200, behavior: "smooth" });
                  }
                }}
              >
                Continue to Details →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 – Booking Details & Wedding Packages */}
        {step === "booking" && (
          <div className="event-details-step-content">
            <div className="d-flex justify-content-between align-items-center mb-30 flex-wrap gap-2">
              <div>
                <h2 className="step-heading">
                  {currentEventConfig?.name || "Event"} Booking Details
                </h2>
                <p className="step-subheading">
                  Fill in your event specifications and client details
                </p>
              </div>
              <span className="selected-event-pill">
                Event: <strong>{currentEventConfig?.name}</strong>
              </span>
            </div>

            {/* Wedding Packages Selector */}
            {selectedEvent === "wedding" && currentEventConfig?.packages && (
              <div className="wedding-packages-wrapper mb-40">
                <h3 className="section-sub-title">1. Select Wedding Package *</h3>
                <div className="wedding-packages-grid">
                  {currentEventConfig.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        className={`wedding-pkg-card ${isSelected ? "selected" : ""}`}
                        onClick={() => selectWeddingPackage(pkg)}
                      >
                        {isSelected && <span className="selected-badge">✓ Selected</span>}
                        <div className="pkg-header">
                          <h4>{pkg.name}</h4>
                          <div className="pkg-price">{formatPrice(pkg.price)}</div>
                        </div>
                        <ul className="pkg-features-list">
                          {pkg.features.map((feat, i) => (
                            <li key={i}>
                              <span className="check-icon">✓</span> {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Wedding Add-ons */}
                {selectedPackage?.addOns && selectedPackage.addOns.length > 0 && (
                  <div className="wedding-addons-box mt-30">
                    <h4 className="addons-title">
                      ✨ Optional Wedding Add-ons
                    </h4>
                    <p className="addons-subtitle">
                      Elevate your wedding coverage with premium extras
                    </p>
                    <div className="addons-grid">
                      {selectedPackage.addOns.map((addOn) => {
                        const isChecked = formData.selectedAddOnIds.includes(addOn.id);
                        return (
                          <label
                            key={addOn.id}
                            className={`addon-chip ${isChecked ? "checked" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddOn(addOn.id)}
                            />
                            <div className="addon-info">
                              <span className="addon-name">{addOn.name}</span>
                              <span className="addon-price">+{formatPrice(addOn.price)}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Non-wedding Notice */}
            {selectedEvent !== "wedding" && (
              <div className="custom-quote-notice mb-40">
                <div className="notice-icon">💬</div>
                <div>
                  <h4>Customized Event Quote</h4>
                  <p>
                    Pricing for <strong>{currentEventConfig?.name}</strong> is tailored to your venue, duration, coverage requirements, and guest count. Fill in your details below and our team will prepare a prompt quote!
                  </p>
                </div>
              </div>
            )}

            {/* Contact & Event Details Form Grid */}
            <h3 className="section-sub-title">
              {selectedEvent === "wedding" ? "2. Client & Venue Information" : "1. Event & Contact Information"}
            </h3>

            <div className="form-two-column-grid">
              {/* Personal Information */}
              <div className="form-col">
                <div className="form-group mb-20">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="e.g. Adebayo Ogunlesi"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-20">
                  <label className="form-label">Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. client@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-20">
                  <label className="form-label">Phone / WhatsApp Number <span className="req">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="e.g. +234 801 234 5678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Event Information */}
              <div className="form-col">
                <div className="form-group mb-20">
                  <label className="form-label">Event / Couple / Host Name <span className="req">*</span></label>
                  <input
                    type="text"
                    name="eventName"
                    className="form-input"
                    placeholder="e.g. Chioma &amp; Tunde's Wedding"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-20">
                  <label className="form-label">Event Date <span className="req">*</span></label>
                  <input
                    type="date"
                    name="eventDate"
                    className="form-input"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="form-group mb-20">
                  <label className="form-label">Event Location &amp; Venue <span className="req">*</span></label>
                  <input
                    type="text"
                    name="eventLocation"
                    className="form-input"
                    placeholder="e.g. The Monarch Event Centre, Lekki, Lagos"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-30">
              <label className="form-label">Additional Requests or Details</label>
              <textarea
                name="additionalNotes"
                className="form-textarea"
                rows={3}
                placeholder="Share any special timing, expectations, or specific coverage instructions..."
                value={formData.additionalNotes}
                onChange={handleInputChange}
              />
            </div>

            {/* Live Pricing Bar for Weddings */}
            {selectedEvent === "wedding" && selectedPackage && (
              <div className="live-pricing-bar mb-30">
                <div className="price-item">
                  <span className="p-label">Package:</span>
                  <span className="p-val">{selectedPackage.name} ({formatPrice(selectedPackage.price)})</span>
                </div>
                {formData.selectedAddOnIds.length > 0 && (
                  <div className="price-item">
                    <span className="p-label">Add-ons ({formData.selectedAddOnIds.length}):</span>
                    <span className="p-val">
                      +{formatPrice(
                        formData.selectedAddOnIds.reduce((sum, id) => {
                          const a = selectedPackage.addOns?.find((x) => x.id === id);
                          return sum + (a?.price || 0);
                        }, 0)
                      )}
                    </span>
                  </div>
                )}
                <div className="price-item total-item">
                  <span className="p-label">Total:</span>
                  <span className="p-val total-highlight">{formatPrice(totalPrice)}</span>
                </div>
                <div className="price-item deposit-item">
                  <span className="p-label">70% Deposit:</span>
                  <span className="p-val deposit-highlight">{formatPrice(deposit)}</span>
                </div>
              </div>
            )}

            <div className="step-actions">
              <button
                type="button"
                className="btn-outline-custom"
                onClick={() => {
                  setStep("eventType");
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                ← Back to Event Type
              </button>
              <button
                type="button"
                className="btn-primary-custom ml-auto"
                disabled={!validateBookingForm()}
                onClick={proceedToCheckout}
              >
                Proceed to Review &amp; Quote →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Review / Quote Summary */}
        {step === "checkout" && (
          <div className="checkout-step-content">
            <h2 className="step-heading">Review Your Booking Summary</h2>
            <p className="step-subheading">
              Please confirm your details before proceeding to payment
            </p>

            <div className="summary-grid mb-30">
              <div className="summary-card">
                <h4 className="summary-card-title">👤 Client Contact</h4>
                <div className="summary-row">
                  <span className="s-label">Name:</span>
                  <span className="s-val">{formData.fullName}</span>
                </div>
                <div className="summary-row">
                  <span className="s-label">Email:</span>
                  <span className="s-val">{formData.email}</span>
                </div>
                <div className="summary-row">
                  <span className="s-label">Phone:</span>
                  <span className="s-val">{formData.phone}</span>
                </div>
              </div>

              <div className="summary-card">
                <h4 className="summary-card-title">📍 Event Details</h4>
                <div className="summary-row">
                  <span className="s-label">Event Type:</span>
                  <span className="s-val">{currentEventConfig?.name}</span>
                </div>
                <div className="summary-row">
                  <span className="s-label">Event Name:</span>
                  <span className="s-val">{formData.eventName}</span>
                </div>
                <div className="summary-row">
                  <span className="s-label">Date:</span>
                  <span className="s-val">
                    {formData.eventDate
                      ? new Date(formData.eventDate).toLocaleDateString("en-NG", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="s-label">Location:</span>
                  <span className="s-val">{formData.eventLocation}</span>
                </div>
                {formData.additionalNotes && (
                  <div className="summary-row">
                    <span className="s-label">Notes:</span>
                    <span className="s-val notes-val">{formData.additionalNotes}</span>
                  </div>
                )}
              </div>

              {selectedEvent === "wedding" && selectedPackage ? (
                <div className="summary-card full-width-card">
                  <h4 className="summary-card-title">💍 Wedding Package &amp; Deposit</h4>
                  <div className="summary-row">
                    <span className="s-label">Selected Package:</span>
                    <span className="s-val font-weight-bold">{selectedPackage.name}</span>
                  </div>
                  {formData.selectedAddOnIds.length > 0 && (
                    <div className="summary-row">
                      <span className="s-label">Selected Add-ons:</span>
                      <span className="s-val">
                        {selectedPackage.addOns
                          ?.filter((a) => formData.selectedAddOnIds.includes(a.id))
                          .map((a) => `${a.name} (+${formatPrice(a.price)})`)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  <div className="summary-divider" />
                  <div className="summary-row highlight-row">
                    <span className="s-label">Total Booking Amount:</span>
                    <span className="s-val total-text">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="summary-row deposit-row">
                    <span className="s-label">
                      <strong>70% Required Deposit:</strong>
                      <small className="d-block text-muted">Balance due prior to photo/album delivery</small>
                    </span>
                    <span className="s-val deposit-text">{formatPrice(deposit)}</span>
                  </div>
                </div>
              ) : (
                <div className="summary-card full-width-card quote-card">
                  <h4 className="summary-card-title">💼 Custom Event Pricing</h4>
                  <p>
                    Your quote request for <strong>{currentEventConfig?.name}</strong> will be reviewed and finalized directly on WhatsApp with our production lead.
                  </p>
                </div>
              )}
            </div>

            <div className="step-actions">
              <button
                type="button"
                className="btn-outline-custom"
                onClick={() => {
                  setStep("booking");
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                ← Edit Details
              </button>
              <button
                type="button"
                className="btn-primary-custom ml-auto"
                onClick={proceedToPayment}
              >
                Proceed to Payment &amp; Confirmation →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 – Payment & WhatsApp Confirmation */}
        {step === "payment" && (
          <div className="payment-step-content">
            <h2 className="step-heading">Complete Your Booking</h2>
            <p className="step-subheading">
              Make a direct transfer to Lum Studios Moniepoint account to lock your event date
            </p>

            <div className="payment-layout-grid mb-30">
              {/* Moniepoint Account Card */}
              <div className="bank-account-card">
                <div className="bank-header">
                  <span className="bank-pill">Official Bank Account</span>
                  <span className="bank-badge">Moniepoint</span>
                </div>

                <div className="account-row mb-15">
                  <span className="acc-label">Account Number:</span>
                  <div className="acc-copy-box">
                    <span className="acc-number">{PAYMENT_INFO.accountNumber}</span>
                    <button
                      type="button"
                      className={`copy-btn ${copiedField === "accountNumber" ? "copied" : ""}`}
                      onClick={() => handleCopy(PAYMENT_INFO.accountNumber, "accountNumber")}
                    >
                      {copiedField === "accountNumber" ? "✓ Copied" : "📋 Copy"}
                    </button>
                  </div>
                </div>

                <div className="account-row mb-10">
                  <span className="acc-label">Account Name:</span>
                  <span className="acc-val">{PAYMENT_INFO.accountName}</span>
                </div>

                <div className="account-row mb-20">
                  <span className="acc-label">Bank:</span>
                  <span className="acc-val">{PAYMENT_INFO.bankName}</span>
                </div>

                {selectedEvent === "wedding" && deposit > 0 && (
                  <div className="deposit-box">
                    <span className="deposit-label">70% Deposit Due to Confirm:</span>
                    <span className="deposit-val">{formatPrice(deposit)}</span>
                    <small>(Full package: {formatPrice(totalPrice)})</small>
                  </div>
                )}

                <div className="payment-instruction-list">
                  <h5>Steps:</h5>
                  <ol>
                    <li>Transfer {selectedEvent === "wedding" ? formatPrice(deposit) : "deposit/quote"} to the account above</li>
                    <li>Enter the Sender / Payer Account Name below</li>
                    <li>Click &quot;Confirm Booking via WhatsApp&quot; to finalize date lock</li>
                  </ol>
                </div>
              </div>

              {/* Confirmation Form */}
              <div className="confirmation-card">
                <h4 className="card-title">Payment Confirmation Details</h4>
                <div className="form-group mb-20">
                  <label className="form-label">
                    Sender Account Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="payerAccountName"
                    className="form-input"
                    placeholder="Name on the bank account you transferred from"
                    value={formData.payerAccountName}
                    onChange={handleInputChange}
                    required
                  />
                  <small className="input-hint">
                    Used by our accounting desk to match and confirm your receipt
                  </small>
                </div>

                <div className="form-group mb-20">
                  <label className="form-label">
                    Transaction Reference / Session ID <span className="optional-tag">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    className="form-input"
                    placeholder="e.g. REF-123456789"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="instant-notice">
                  <span className="lock-icon">🔒</span>
                  <p>
                    Your date is prioritized once this message is sent on WhatsApp. Our studio management will immediately acknowledge receipt and issue your event contract.
                  </p>
                </div>

                {feedbackMessage && (
                  <div className="feedback-alert mb-15">
                    {feedbackMessage}
                  </div>
                )}

                <button
                  type="button"
                  className="btn-whatsapp-full"
                  disabled={!formData.payerAccountName.trim() || isSubmitting}
                  onClick={sendToWhatsApp}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginRight: "10px" }}>
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      fill="currentColor"
                    />
                  </svg>
                  {isSubmitting ? "Connecting to WhatsApp..." : "Confirm Booking via WhatsApp"}
                </button>
              </div>
            </div>

            <div className="step-actions">
              <button
                type="button"
                className="btn-outline-custom"
                onClick={() => {
                  setStep("checkout");
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                ← Back to Review
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .enhanced-booking-container {
          width: 100%;
        }
        .booking-progress-wrapper {
          margin-bottom: 40px;
        }
        .booking-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 680px;
          margin: 0 auto;
        }
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 2;
        }
        .step-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e9ecef;
          color: #777;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        .progress-step.active .step-circle {
          background: #B7C435;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(183, 196, 53, 0.4);
        }
        .progress-step.completed .step-circle {
          background: #28a745;
          color: #ffffff;
        }
        .step-label {
          font-size: 13px;
          font-weight: 600;
          color: #888;
          transition: color 0.3s ease;
        }
        .progress-step.active .step-label {
          color: #1a1a1a;
          font-weight: 700;
        }
        .progress-line {
          flex: 1;
          height: 3px;
          background: #e9ecef;
          margin: 0 8px;
          margin-bottom: 25px;
          transition: background 0.3s ease;
        }
        .progress-line.active {
          background: #B7C435;
        }
        .booking-form-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 45px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid #f0f0f0;
        }
        .step-heading {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .step-subheading {
          font-size: 15px;
          color: #666;
          margin-bottom: 25px;
        }
        .selected-event-pill {
          background: #fbfdf3;
          border: 1px solid #B7C435;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          color: #4a5404;
        }
        .section-sub-title {
          font-size: 19px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 18px;
          padding-bottom: 8px;
          border-bottom: 2px solid #f2f2f2;
        }
        .wedding-packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .wedding-pkg-card {
          position: relative;
          background: #fafbfc;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .wedding-pkg-card:hover {
          border-color: #B7C435;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
        }
        .wedding-pkg-card.selected {
          background: #ffffff;
          border-color: #B7C435;
          box-shadow: 0 6px 25px rgba(183, 196, 53, 0.18);
        }
        .selected-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #B7C435;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 12px;
        }
        .pkg-header h4 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .pkg-price {
          font-size: 22px;
          font-weight: 800;
          color: #B7C435;
          margin-bottom: 15px;
        }
        .pkg-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 13px;
          color: #444;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .check-icon {
          color: #B7C435;
          font-weight: bold;
          margin-right: 4px;
        }
        .wedding-addons-box {
          background: #fbfdf3;
          border: 1px solid rgba(183, 196, 53, 0.4);
          border-radius: 12px;
          padding: 22px;
        }
        .addons-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .addons-subtitle {
          font-size: 13px;
          color: #666;
          margin-bottom: 15px;
        }
        .addons-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .addon-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #ddd;
          padding: 10px 16px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .addon-chip.checked {
          border-color: #B7C435;
          background: #f1f7d6;
        }
        .addon-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .addon-price {
          font-size: 12px;
          font-weight: 700;
          color: #6d7807;
        }
        .custom-quote-notice {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: #f8f9fa;
          border-left: 4px solid #B7C435;
          padding: 20px;
          border-radius: 8px;
        }
        .notice-icon {
          font-size: 28px;
        }
        .custom-quote-notice h4 {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .custom-quote-notice p {
          font-size: 14px;
          color: #555;
          margin: 0;
          line-height: 1.5;
        }
        .form-two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        .req {
          color: #e74c3c;
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          color: #222;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #B7C435;
          box-shadow: 0 0 0 3px rgba(183, 196, 53, 0.15);
        }
        .live-pricing-bar {
          background: #1a1a1a;
          color: #ffffff;
          padding: 18px 24px;
          border-radius: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: center;
        }
        .price-item {
          display: flex;
          gap: 6px;
          font-size: 14px;
        }
        .p-label {
          color: #aaa;
        }
        .p-val {
          font-weight: 600;
        }
        .total-item {
          margin-left: auto;
        }
        .total-highlight {
          color: #ffffff;
          font-weight: 800;
        }
        .deposit-highlight {
          color: #B7C435;
          font-weight: 800;
          font-size: 16px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .summary-card {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 10px;
          padding: 22px;
        }
        .full-width-card {
          grid-column: 1 / -1;
        }
        .summary-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 14px;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .s-label {
          color: #666;
        }
        .s-val {
          color: #111;
          font-weight: 600;
          text-align: right;
        }
        .summary-divider {
          height: 1px;
          background: #ddd;
          margin: 12px 0;
        }
        .highlight-row {
          font-size: 15px;
        }
        .total-text {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .deposit-row {
          background: #fbfdf3;
          border: 1px solid #B7C435;
          padding: 12px;
          border-radius: 8px;
          align-items: center;
        }
        .deposit-text {
          font-size: 20px;
          font-weight: 800;
          color: #6d7807;
        }
        .payment-layout-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 30px;
        }
        .bank-account-card {
          background: #1a1a1a;
          color: #ffffff;
          border-radius: 12px;
          padding: 28px;
        }
        .bank-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .bank-pill {
          font-size: 12px;
          color: #aaa;
          text-transform: uppercase;
        }
        .bank-badge {
          background: #B7C435;
          color: #000;
          font-weight: 700;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .acc-label {
          font-size: 13px;
          color: #999;
          display: block;
          margin-bottom: 4px;
        }
        .acc-copy-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .acc-number {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #B7C435;
          font-family: monospace;
        }
        .copy-btn {
          background: #333;
          border: none;
          color: #fff;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .copy-btn.copied {
          background: #28a745;
        }
        .acc-val {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }
        .deposit-box {
          background: rgba(183, 196, 53, 0.15);
          border: 1px dashed #B7C435;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .deposit-label {
          font-size: 12px;
          color: #ddd;
        }
        .deposit-val {
          font-size: 22px;
          font-weight: 800;
          color: #B7C435;
        }
        .payment-instruction-list h5 {
          font-size: 14px;
          color: #ccc;
          margin-bottom: 8px;
        }
        .payment-instruction-list ol {
          padding-left: 18px;
          font-size: 12px;
          color: #aaa;
          line-height: 1.6;
        }
        .confirmation-card {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 28px;
        }
        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 18px;
        }
        .input-hint {
          display: block;
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .optional-tag {
          font-size: 12px;
          color: #888;
          font-weight: normal;
        }
        .instant-notice {
          display: flex;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 12px;
          color: #666;
          line-height: 1.45;
        }
        .btn-whatsapp-full {
          width: 100%;
          background: #25D366;
          color: #ffffff;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }
        .btn-whatsapp-full:hover:not(:disabled) {
          background: #1ebc59;
          transform: translateY(-2px);
        }
        .btn-whatsapp-full:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .step-actions {
          display: flex;
          align-items: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .btn-primary-custom {
          background: #B7C435;
          color: #ffffff;
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(183, 196, 53, 0.3);
        }
        .btn-primary-custom:hover:not(:disabled) {
          background: #a3af2d;
          transform: translateY(-2px);
        }
        .btn-primary-custom:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-outline-custom {
          background: transparent;
          border: 1.5px solid #ccc;
          color: #555;
          padding: 12px 26px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-outline-custom:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
        }
        .feedback-alert {
          background: #fbfdf3;
          border: 1px solid #B7C435;
          color: #4a5404;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }
        @media (max-width: 991px) {
          .form-two-column-grid,
          .summary-grid,
          .payment-layout-grid {
            grid-template-columns: 1fr;
          }
          .booking-form-card {
            padding: 25px 20px;
          }
          .live-pricing-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .total-item {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}

