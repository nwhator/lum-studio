// src/components/booking/enhanced-booking-form.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  formatPrice,
  PAYMENT_INFO,
  CLASSIC_FEATURES,
  WALKIN_FEATURES,
  type PackageType,
  type PricingOption,
} from "@/data/package-pricing";
import { EVENT_TYPES } from "@/data/event-pricing";
import { EventTypeSelector } from "./EventTypeSelector";

// Helper to copy to clipboard – unchanged
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
  // Pricing Details (filled later)
  packageId: string; // wedding package id
  selectedAddOnIds: string[];
  manualPrice?: number; // for manual‑priced events
  // Payment Details
  payerAccountName: string;
  transactionId: string;
}

interface EnhancedBookingFormProps {
  preselectedPackage?: string;
  preselectedType?: "classic" | "walkin";
}

export default function EnhancedBookingForm({}: EnhancedBookingFormProps) {
  const [step, setStep] = useState<"eventType" | "booking" | "checkout" | "payment">(
    "eventType"
  );
  const [selectedEvent, setSelectedEvent] = useState<string>(""); // id from EVENT_TYPES
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

  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [copiedField, setCopiedField] = useState<string>("");

  // When event type changes, reset pricing‑specific fields
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
  }, [selectedEvent]);

  // Load package data for wedding events
  useEffect(() => {
    if (selectedEvent === "wedding") {
      // default to first package if none selected yet
      const pkg = EVENT_TYPES.find((e) => e.id === "wedding")?.packages?.[0];
      if (pkg) {
        setSelectedPackage(pkg as any);
        setFormData((prev) => ({ ...prev, packageId: pkg.id }));
        setTotalPrice(pkg.price);
        setDeposit(Math.round(pkg.price * 0.7));
      }
    }
  }, [selectedEvent]);

  // Re‑calculate total when package or add‑ons change
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

  const validateEventSelection = () => selectedEvent !== "";

  const validateBookingForm = () => {
    const base =
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.eventDate &&
      formData.eventLocation &&
      formData.eventName;
    if (selectedEvent === "wedding") {
      return base && formData.packageId;
    }
    // manual pricing events – price can be left empty (quote later)
    return base;
  };

  const proceedToCheckout = () => {
    if (validateBookingForm()) setStep("checkout");
    else alert("Please fill in all required fields");
  };

  const proceedToPayment = () => setStep("payment");

  // WhatsApp message generation – includes calculated totals
  const generateWhatsAppMessage = (): string => {
    const event = EVENT_TYPES.find((e) => e.id === selectedEvent);
    const packageName = EVENT_TYPES.find((e) => e.id === selectedEvent)
      ?.packages?.find((p) => p.id === formData.packageId)?.name;
    const addOnNames = selectedPackage?.addOns
      ?.filter((a) => formData.selectedAddOnIds.includes(a.id))
      .map((a) => a.name)
      .join(", ");
    const msg = `\r\n🎯 *NEW BOOKING REQUEST*\r\n━━━━━━━━━━━━━━━━━━\r\n\r\n📋 *EVENT INFORMATION*\r\n• Type: ${event?.name}\r\n• Name: ${formData.eventName}\r\n• Date: ${new Date(formData.eventDate).toLocaleDateString('en-NG')}\r\n• Location: ${formData.eventLocation}\r\n\r\n💼 *PACKAGE*\r\n• ${packageName ?? "Custom Quote"}\r\n${addOnNames ? `• Add‑ons: ${addOnNames}` : ""}\r\n\r\n💰 *PRICING*\r\n• Total: ${formatPrice(totalPrice)}\r\n• Deposit (70%): ${formatPrice(deposit)}\r\n\r\n💳 *PAYMENT*\r\n• Account Name: ${formData.payerAccountName}\r\n• Transaction ID: ${formData.transactionId || "N/A"}\r\n\r\n📝 *NOTES*\r\n${formData.additionalNotes || "None"}\r\n━━━━━━━━━━━━━━━━━━\r\n✅ Please confirm this booking`;
    return encodeURIComponent(msg);
  };

  const sendToWhatsApp = () => {
    if (!formData.payerAccountName) {
      alert("Please enter your account name (Transaction ID optional)");
      return;
    }
    const message = generateWhatsAppMessage();
    const whatsappNumber = "2348065407503";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    }
  };

  return (
    <div className="enhanced-booking-container">
      {/* Progress Indicator */}
      <div className="booking-progress">
        <div className={`progress-step ${step === "eventType" ? "active" : step !== "eventType" && step !== "booking" ? "completed" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-label">Event Type</div>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === "booking" ? "active" : step === "checkout" || step === "payment" ? "completed" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-label">Details</div>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === "checkout" ? "active" : step === "payment" ? "completed" : ""}`}>
          <div className="step-number">3</div>
          <div className="step-label">Review &amp; Checkout</div>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === "payment" ? "active" : ""}`}>
          <div className="step-number">4</div>
          <div className="step-label">Payment</div>
        </div>
      </div>

      {/* STEP 1 – Event Type */}
      {step === "eventType" && (
        <div className="event-type-step">
          <EventTypeSelector selectedEventType={selectedEvent} onSelect={setSelectedEvent} />
          <div className="form-actions">
            <button className="btn-primary" onClick={() => validateEventSelection() && setStep("booking")}>Continue</button>
          </div>
        </div>
      )}

      {/* STEP 2 – Booking Details */}
      {step === "booking" && (
        <div className="booking-form-section">
          <h2 className="section-title">Book Your Event</h2>
          <p className="section-subtitle">Fill in your details to get started</p>
          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="form-section-title">Personal Information</h3>
              <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>

            {/* Event Details */}
            <div className="form-section">
              <h3 className="form-section-title">Event Details</h3>
              <div className="form-group">
                <label htmlFor="eventName">Event / Client Name <span className="required">*</span></label>
                <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date <span className="required">*</span></label>
                <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="eventLocation">Location <span className="required">*</span></label>
                <input type="text" id="eventLocation" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes</label>
                <textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} rows={4} />
              </div>
            </div>
          </div>

          {/* Package / Add‑on selection for weddings */}
          {selectedEvent === "wedding" && (
            <div className="wedding-options">
              <h3 className="form-section-title">Select Package</h3>
              <select
                name="packageId"
                value={formData.packageId}
                onChange={(e) => {
                  const pkg = EVENT_TYPES.find((e) => e.id === "wedding")?.packages?.find((p) => p.id === e.target.value);
                  setSelectedPackage(pkg as any);
                  setFormData((prev) => ({ ...prev, packageId: e.target.value }));
                }}
                required
              >
                <option value="">Select Package</option>
                {EVENT_TYPES.find((e) => e.id === "wedding")?.packages?.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} – {formatPrice(pkg.price)}
                  </option>
                ))}
              </select>

              {/* Add‑ons */}
              {selectedPackage?.addOns && (
                <div className="add-on-section">
                  <h4>Add‑ons (optional)</h4>
                  {selectedPackage.addOns.map((addOn) => (
                    <label key={addOn.id} style={{ display: "block", marginBottom: "0.5rem" }}>
                      <input
                        type="checkbox"
                        checked={formData.selectedAddOnIds.includes(addOn.id)}
                        onChange={() => toggleAddOn(addOn.id)}
                      />{' '}
                      {addOn.name} – {formatPrice(addOn.price)}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Manual price input for non‑wedding events */}
          {selectedEvent && selectedEvent !== "wedding" && (
            <div className="manual-price-section">
              <h3 className="form-section-title">Pricing (to be quoted)</h3>
              <p>The price for this event will be provided by Lum Studios after review.</p>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setStep("eventType")}>Back</button>
            <button type="button" className="btn-primary" onClick={proceedToCheckout} disabled={!validateBookingForm()}>Proceed to Checkout →</button>
          </div>
        </div>
      )}

      {/* STEP 3 – Checkout / Summary */}
      {step === "checkout" && (
        <div className="checkout-section">
          <h2 className="section-title">Review Your Booking</h2>
          <div className="booking-summary">
            <div className="summary-card">
              <h3>Personal Information</h3>
              <div className="summary-item"><span className="label">Name:</span> <span className="value">{formData.fullName}</span></div>
              <div className="summary-item"><span className="label">Email:</span> <span className="value">{formData.email}</span></div>
              <div className="summary-item"><span className="label">Phone:</span> <span className="value">{formData.phone}</span></div>
            </div>
            <div className="summary-card">
              <h3>Event Details</h3>
              <div className="summary-item"><span className="label">Type:</span> <span className="value">{EVENT_TYPES.find((e) => e.id === selectedEvent)?.name}</span></div>
              <div className="summary-item"><span className="label">Name:</span> <span className="value">{formData.eventName}</span></div>
              <div className="summary-item"><span className="label">Date:</span> <span className="value">{new Date(formData.eventDate).toLocaleDateString('en-NG')}</span></div>
              <div className="summary-item"><span className="label">Location:</span> <span className="value">{formData.eventLocation}</span></div>
              {formData.additionalNotes && (
                <div className="summary-item"><span className="label">Notes:</span> <span className="value">{formData.additionalNotes}</span></div>
              )}
            </div>
            {selectedEvent === "wedding" && selectedPackage && (
              <div className="summary-card">
                <h3>Package &amp; Add‑ons</h3>
                <div className="summary-item"><span className="label">Package:</span> <span className="value">{selectedPackage.name}</span></div>
                {formData.selectedAddOnIds.length > 0 && (
                  <div className="summary-item"><span className="label">Add‑ons:</span> <span className="value">{selectedPackage.addOns?.filter((a) => formData.selectedAddOnIds.includes(a.id)).map((a) => a.name).join(", ")}</span></div>
                )}
                <div className="summary-item total"><span className="label">Total:</span> <span className="value">{formatPrice(totalPrice)}</span></div>
                <div className="summary-item"><span className="label">Deposit (70%):</span> <span className="value">{formatPrice(deposit)}</span></div>
              </div>
            )}
            {selectedEvent !== "wedding" && (
              <div className="summary-card">
                <h3>Pricing</h3>
                <div className="summary-item"><span className="label">Quote:</span> <span className="value">Custom – to be confirmed</span></div>
              </div>
            )}
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setStep("booking")}>
              ← Edit Details
            </button>
            <button type="button" className="btn-primary" onClick={proceedToPayment}>
              Confirm &amp; Proceed to Payment →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 – Payment */}
      {step === "payment" && (
        <div className="payment-section">
          <h2 className="section-title">Payment Details</h2>
          <div className="payment-grid">
            <div className="payment-info-card">
              <h3>Bank Transfer Details</h3>
              <p className="payment-note">Please transfer the amount below to the account.</p>
              <div className="payment-details">
                <div className="payment-detail-item">
                  <label>Account Number</label>
                  <div className="copy-field">
                    <span className="account-number">{PAYMENT_INFO.accountNumber}</span>
                    <button type="button" className="copy-btn" onClick={() => handleCopy(PAYMENT_INFO.accountNumber, "accountNumber")}>
                      {copiedField === "accountNumber" ? "✓ Copied!" : "📋 Copy"}
                    </button>
                  </div>
                </div>
                <div className="payment-detail-item"><label>Bank Name</label> <div className="value">{PAYMENT_INFO.bankName}</div></div>
                <div className="payment-detail-item"><label>Account Name</label> <div className="value">{PAYMENT_INFO.accountName}</div></div>
                <div className="payment-detail-item amount"><label>Amount to Pay</label> <div className="value">{formatPrice(totalPrice)}</div></div>
              </div>
              <div className="payment-instructions">
                <h4>Instructions:</h4>
                <ol>
                  <li>Transfer {formatPrice(totalPrice)} to the account above</li>
                  <li>Enter your account name below (required)</li>
                  <li>Add transaction ID if available (optional)</li>
                  <li>Click “Confirm Booking” to send details via WhatsApp</li>
                </ol>
              </div>
            </div>
            <div className="payment-confirmation-card">
              <h3>Payment Confirmation</h3>
              <div className="form-group">
                <label htmlFor="payerAccountName">Your Account Name <span className="required">*</span></label>
                <input type="text" id="payerAccountName" name="payerAccountName" value={formData.payerAccountName} onChange={handleInputChange} required />
                <small>Enter the name from which you made the transfer</small>
              </div>
              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID <span className="optional">(Optional)</span></label>
                <input type="text" id="transactionId" name="transactionId" value={formData.transactionId} onChange={handleInputChange} />
              </div>
              <div className="confirmation-note"><p><strong>Note:</strong> After clicking “Confirm Booking”, you’ll be redirected to WhatsApp where we’ll verify your payment and confirm your booking.</p></div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setStep("checkout")}>← Back to Review</button>
            <button type="button" className="btn-whatsapp" onClick={sendToWhatsApp} disabled={!formData.payerAccountName}>Confirm Booking via WhatsApp</button>
          </div>
        </div>
      )}

      {/* Styles (kept from original component) */}
      <style jsx>{`
        .enhanced-booking-container { max-width: 1200px; margin: 60px auto; padding: 0 20px; }
        .booking-progress { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; position: relative; }
        .progress-step { display: flex; flex-direction: column; align-items: center; gap: 10px; z-index: 2; }
        .step-number { width: 50px; height: 50px; border-radius: 50%; background: #f0f0f0; color: #666; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; transition: all 0.3s ease; }
        .progress-step.active .step-number { background: var(--tp-theme-1); color: white; }
        .progress-step.completed .step-number { background: #4CAF50; color: white; }
        .step-label { font-size: 14px; font-weight: 600; color: #666; }
        .progress-step.active .step-label { color: var(--tp-theme-1); }
        .progress-line { flex: 1; height: 2px; background: #e0e0e0; margin: 0 10px; }
        .section-title { font-size: 32px; font-weight: 700; margin-bottom: 10px; color: #1a1a1a; }
        .section-subtitle { font-size: 16px; color: #666; margin-bottom: 40px; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 40px; margin-bottom: 40px; }
        .form-section { background: #fff; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0; }
        .form-section-title { font-size: 20px; font-weight: 700; margin-bottom: 25px; color: #1a1a1a; padding-bottom: 15px; border-bottom: 2px solid var(--tp-theme-1); }
        .form-group { margin-bottom: 25px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #333; font-size: 14px; }
        .required { color: #e74c3c; }
        .optional { color: #999; font-weight: 400; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 15px; border: 1px solid #ddd; border-radius: 6px; font-size: 15px; transition: all 0.3s ease; font-family: inherit; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--tp-theme-1); box-shadow: 0 0 0 3px rgba(var(--tp-theme-rgb), 0.1); }
        .form-actions { display: flex; justify-content: space-between; gap: 20px; margin-top: 40px; }
        .btn-primary, .btn-secondary, .btn-whatsapp { padding: 15px 30px; border-radius: 6px; font-weight: 600; font-size: 16px; }
        .add-on-section label { cursor: pointer; }
        .summary-card { background: #fff; padding: 20px; margin-bottom: 20px; border-radius: 6px; border: 1px solid #e0e0e0; }
        .summary-item { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .summary-item.total { font-weight: 700; }
        .payment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .payment-detail-item { margin-bottom: 12px; }
        .payment-detail-item label { font-weight: 600; }
        .payment-detail-item .value { font-weight: 500; }
        .copy-btn { margin-left: 8px; }
      `}</style>
    </div>
  );
}
