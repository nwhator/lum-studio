"use client";
import React, { useState } from "react";
import { formatPrice, PAYMENT_INFO, PACKAGE_DATA, CLASSIC_FEATURES, WALKIN_FEATURES, type PackageType, type PricingOption } from "@/data/package-pricing";

// Copy to clipboard helper
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

interface BookingFormData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  
  // Shoot Details
  packageType: 'classic' | 'walkin' | '';
  shootCategory: string;
  numberOfLooks: number | '';
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
  
  // Payment Details
  payerAccountName: string;
  transactionId: string;
}

interface EnhancedBookingFormProps {
  preselectedPackage?: string;
  preselectedType?: 'classic' | 'walkin';
}

export default function EnhancedBookingForm({ 
  preselectedPackage, 
  preselectedType 
}: EnhancedBookingFormProps) {
  
  const [step, setStep] = useState<'booking' | 'checkout' | 'payment'>('booking');
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    packageType: preselectedType || '',
    shootCategory: preselectedPackage || '',
    numberOfLooks: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: '',
    payerAccountName: '',
    transactionId: ''
  });

  const [copiedField, setCopiedField] = useState<string>('');
  const [selectedPackageData, setSelectedPackageData] = useState<PackageType | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<PricingOption | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Update selected package when category changes
  React.useEffect(() => {
    if (formData.shootCategory) {
      const pkgData = PACKAGE_DATA.find(pkg => pkg.slug === formData.shootCategory);
      setSelectedPackageData(pkgData || null);
    }
  }, [formData.shootCategory]);

  // Update pricing when package type or looks change
  React.useEffect(() => {
    if (selectedPackageData && formData.packageType && formData.numberOfLooks) {
      const pricingArray = formData.packageType === 'classic' 
        ? selectedPackageData.classic 
        : selectedPackageData.walkin;
      
      const pricing = pricingArray.find(p => p.looks === formData.numberOfLooks);
      setSelectedPricing(pricing || null);
      setTotalPrice(pricing?.price || 0);
    }
  }, [selectedPackageData, formData.packageType, formData.numberOfLooks]);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateBookingForm = (): boolean => {
    return !!(
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.packageType &&
      formData.shootCategory &&
      formData.numberOfLooks &&
      formData.preferredDate &&
      formData.preferredTime
    );
  };

  const validatePaymentForm = (): boolean => {
    return !!formData.payerAccountName; // Transaction ID is optional
  };

  const proceedToCheckout = () => {
    if (validateBookingForm()) {
      setStep('checkout');
    } else {
      alert('Please fill in all required booking fields');
    }
  };

  const proceedToPayment = () => {
    setStep('payment');
  };

  const generateWhatsAppMessage = (): string => {
    const message = `
🎯 *NEW BOOKING REQUEST*
━━━━━━━━━━━━━━━━━━━━

📋 *PERSONAL INFORMATION*
• Name: ${formData.fullName}
• Email: ${formData.email}
• Phone: ${formData.phone}

📸 *SHOOT DETAILS*
• Package: ${formData.packageType === 'classic' ? 'Classic Package' : 'Walk-in Package'}
• Shoot Type: ${selectedPackageData?.name || formData.shootCategory}
• Number of Looks: ${formData.numberOfLooks}
• Date: ${new Date(formData.preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
• Time: ${formData.preferredTime}

💰 *PRICING*
• Total Amount: ${formatPrice(totalPrice)}
${selectedPricing ? `• Includes: ${selectedPricing.images.edited} edited + ${selectedPricing.images.unedited} unedited images` : ''}

💳 *PAYMENT CONFIRMATION*
• Account Name: ${formData.payerAccountName}
${formData.transactionId ? `• Transaction ID: ${formData.transactionId}` : '• Transaction ID: Not provided'}

${formData.additionalNotes ? `📝 *ADDITIONAL NOTES*\n${formData.additionalNotes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
✅ Please confirm this booking
    `.trim();

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = () => {
    if (!validatePaymentForm()) {
      alert('Please enter your account name (Transaction ID is optional)');
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappNumber = '2348065407503'; // Replace with actual WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappURL, '_blank');
  };

  // Get available looks based on selected package
  const getAvailableLooks = (): number[] => {
    if (!selectedPackageData || !formData.packageType) return [];
    
    const pricingArray = formData.packageType === 'classic' 
      ? selectedPackageData.classic 
      : selectedPackageData.walkin;
    
    return pricingArray
      .filter(p => p.type === 'look')
      .map(p => p.looks!)
      .filter(Boolean);
  };

  return (
    <div className="enhanced-booking-container">
      {/* Progress Indicator */}
      <div className="booking-progress">
        <div className={`progress-step ${step === 'booking' ? 'active' : (step === 'checkout' || step === 'payment') ? 'completed' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Booking Details</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step === 'checkout' ? 'active' : step === 'payment' ? 'completed' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Review & Checkout</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step === 'payment' ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Payment</div>
        </div>
      </div>

      {/* STEP 1: BOOKING FORM */}
      {step === 'booking' && (
        <div className="booking-form-section">
          <h2 className="section-title">Book Your Photo Shoot</h2>
          <p className="section-subtitle">Fill in your details to get started</p>

          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="form-section-title">Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>
            </div>

            {/* Shoot Details */}
            <div className="form-section">
              <h3 className="form-section-title">Shoot Details</h3>
              
              <div className="form-group">
                <label htmlFor="packageType">Package Type <span className="required">*</span></label>
                <select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Package Type</option>
                  <option value="classic">Classic Package</option>
                  <option value="walkin">Walk-in Package</option>
                </select>
                {formData.packageType && (
                  <div className="package-features">
                    <strong>{formData.packageType === 'classic' ? 'Classic' : 'Walk-in'} Features:</strong>
                    <ul>
                      {(formData.packageType === 'classic' ? CLASSIC_FEATURES : WALKIN_FEATURES).slice(0, 4).map((feature, idx) => (
                        <li key={idx}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="shootCategory">Shoot Category <span className="required">*</span></label>
                <select
                  id="shootCategory"
                  name="shootCategory"
                  value={formData.shootCategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Shoot Type</option>
                  {PACKAGE_DATA.map(pkg => (
                    <option key={pkg.id} value={pkg.slug}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>

              {formData.packageType && selectedPackageData && (
                <div className="form-group">
                  <label htmlFor="numberOfLooks">Number of Looks <span className="required">*</span></label>
                  <select
                    id="numberOfLooks"
                    name="numberOfLooks"
                    value={formData.numberOfLooks}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Number of Looks</option>
                    {getAvailableLooks().map(looks => {
                      const pricing = (formData.packageType === 'classic' 
                        ? selectedPackageData.classic 
                        : selectedPackageData.walkin
                      ).find(p => p.looks === looks);
                      
                      return (
                        <option key={looks} value={looks}>
                          {looks} Look{looks > 1 ? 's' : ''} - {formatPrice(pricing?.price || 0)} 
                          ({pricing?.images.edited} edited, {pricing?.images.unedited} unedited)
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Date <span className="required">*</span></label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredTime">Preferred Time <span className="required">*</span></label>
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any special requests or additional information..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-primary"
              onClick={proceedToCheckout}
              disabled={!validateBookingForm()}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CHECKOUT REVIEW */}
      {step === 'checkout' && (
        <div className="checkout-section">
          <h2 className="section-title">Review Your Booking</h2>
          <p className="section-subtitle">Please review your details before proceeding to payment</p>

          <div className="booking-summary">
            <div className="summary-card">
              <h3>Personal Information</h3>
              <div className="summary-item">
                <span className="label">Name:</span>
                <span className="value">{formData.fullName}</span>
              </div>
              <div className="summary-item">
                <span className="label">Email:</span>
                <span className="value">{formData.email}</span>
              </div>
              <div className="summary-item">
                <span className="label">Phone:</span>
                <span className="value">{formData.phone}</span>
              </div>
            </div>

            <div className="summary-card">
              <h3>Shoot Details</h3>
              <div className="summary-item">
                <span className="label">Package:</span>
                <span className="value">{formData.packageType === 'classic' ? 'Classic Package' : 'Walk-in Package'}</span>
              </div>
              <div className="summary-item">
                <span className="label">Shoot Type:</span>
                <span className="value">{selectedPackageData?.name}</span>
              </div>
              <div className="summary-item">
                <span className="label">Number of Looks:</span>
                <span className="value">{formData.numberOfLooks}</span>
              </div>
              <div className="summary-item">
                <span className="label">Date:</span>
                <span className="value">{new Date(formData.preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="summary-item">
                <span className="label">Time:</span>
                <span className="value">{formData.preferredTime}</span>
              </div>
              {formData.additionalNotes && (
                <div className="summary-item">
                  <span className="label">Notes:</span>
                  <span className="value">{formData.additionalNotes}</span>
                </div>
              )}
            </div>

            <div className="summary-card pricing-card">
              <h3>Pricing Breakdown</h3>
              {selectedPricing && (
                <>
                  <div className="summary-item">
                    <span className="label">Package Price:</span>
                    <span className="value">{formatPrice(selectedPricing.price)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Edited Images:</span>
                    <span className="value">{selectedPricing.images.edited}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Unedited Images:</span>
                    <span className="value">{selectedPricing.images.unedited}</span>
                  </div>
                  <div className="summary-item total">
                    <span className="label">Total Amount:</span>
                    <span className="value">{formatPrice(totalPrice)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setStep('booking')}
            >
              ← Edit Details
            </button>
            <button 
              type="button" 
              className="btn-primary"
              onClick={proceedToPayment}
            >
              Confirm & Proceed to Payment →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT */}
      {step === 'payment' && (
        <div className="payment-section">
          <h2 className="section-title">Payment Details</h2>
          <p className="section-subtitle">Complete your payment to confirm your booking</p>

          <div className="payment-grid">
            <div className="payment-info-card">
              <h3>Bank Transfer Details</h3>
              <p className="payment-note">Please transfer the total amount to the account below:</p>
              
              <div className="payment-details">
                <div className="payment-detail-item">
                  <label>Account Number</label>
                  <div className="copy-field">
                    <span className="account-number">{PAYMENT_INFO.accountNumber}</span>
                    <button 
                      type="button"
                      className="copy-btn"
                      onClick={() => handleCopy(PAYMENT_INFO.accountNumber, 'accountNumber')}
                    >
                      {copiedField === 'accountNumber' ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                </div>

                <div className="payment-detail-item">
                  <label>Bank Name</label>
                  <div className="value">{PAYMENT_INFO.bankName}</div>
                </div>

                <div className="payment-detail-item">
                  <label>Account Name</label>
                  <div className="value">{PAYMENT_INFO.accountName}</div>
                </div>

                <div className="payment-detail-item amount">
                  <label>Amount to Pay</label>
                  <div className="value">{formatPrice(totalPrice)}</div>
                </div>
              </div>

              <div className="payment-instructions">
                <h4>Instructions:</h4>
                <ol>
                  <li>Transfer {formatPrice(totalPrice)} to the account above</li>
                  <li>Fill in your account name below (required)</li>
                  <li>Add transaction ID if available (optional)</li>
                  <li>Click "Confirm Booking" to send details via WhatsApp</li>
                </ol>
              </div>
            </div>

            <div className="payment-confirmation-card">
              <h3>Payment Confirmation</h3>
              
              <div className="form-group">
                <label htmlFor="payerAccountName">
                  Your Account Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="payerAccountName"
                  name="payerAccountName"
                  value={formData.payerAccountName}
                  onChange={handleInputChange}
                  placeholder="Name on your bank account"
                  required
                />
                <small>Enter the name from which you made the transfer</small>
              </div>

              <div className="form-group">
                <label htmlFor="transactionId">
                  Transaction ID <span className="optional">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="e.g., TRX123456789"
                />
                <small>Transaction reference from your bank app</small>
              </div>

              <div className="confirmation-note">
                <p><strong>Note:</strong> After clicking "Confirm Booking", you'll be redirected to WhatsApp where we'll verify your payment and confirm your booking.</p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setStep('checkout')}
            >
              ← Back to Review
            </button>
            <button 
              type="button" 
              className="btn-whatsapp"
              onClick={sendToWhatsApp}
              disabled={!validatePaymentForm()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Confirm Booking via WhatsApp
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .enhanced-booking-container {
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .booking-progress {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
          position: relative;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f0f0f0;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: var(--tp-theme-1);
          color: white;
        }

        .progress-step.completed .step-number {
          background: #4CAF50;
          color: white;
        }

        .step-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
        }

        .progress-step.active .step-label {
          color: var(--tp-theme-1);
        }

        .progress-line {
          flex: 1;
          height: 2px;
          background: #e0e0e0;
          margin: 0 10px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .section-subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 40px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .form-section {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .form-section-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #1a1a1a;
          padding-bottom: 15px;
          border-bottom: 2px solid var(--tp-theme-1);
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
          font-size: 14px;
        }

        .required {
          color: #e74c3c;
        }

        .optional {
          color: #999;
          font-weight: 400;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 15px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--tp-theme-1);
          box-shadow: 0 0 0 3px rgba(var(--tp-theme-rgb), 0.1);
        }

        .form-group small {
          display: block;
          margin-top: 5px;
          color: #666;
          font-size: 13px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .package-features {
          margin-top: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 14px;
        }

        .package-features ul {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
        }

        .package-features li {
          padding: 5px 0;
          color: #333;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 40px;
        }

        .btn-primary,
        .btn-secondary,
        .btn-whatsapp {
          padding: 15px 30px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .btn-primary {
          background: var(--tp-theme-1);
          color: white;
          flex: 1;
        }

        .btn-primary:hover:not(:disabled) {
          background: #a0b030;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(var(--tp-theme-rgb), 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f0f0f0;
          color: #333;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        .btn-whatsapp {
          background: #25D366;
          color: white;
          flex: 1;
        }

        .btn-whatsapp:hover:not(:disabled) {
          background: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }

        .btn-whatsapp:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .booking-summary {
          display: grid;
          gap: 25px;
          margin-bottom: 40px;
        }

        .summary-card {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .summary-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1a1a1a;
          padding-bottom: 15px;
          border-bottom: 2px solid var(--tp-theme-1);
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item .label {
          font-weight: 600;
          color: #666;
        }

        .summary-item .value {
          color: #1a1a1a;
          text-align: right;
        }

        .summary-item.total {
          margin-top: 15px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
          font-size: 18px;
        }

        .summary-item.total .label,
        .summary-item.total .value {
          font-weight: 700;
          color: var(--tp-theme-1);
        }

        .pricing-card {
          border: 2px solid var(--tp-theme-1);
        }

        .payment-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }

        .payment-info-card,
        .payment-confirmation-card {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .payment-info-card h3,
        .payment-confirmation-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        .payment-note {
          color: #666;
          margin-bottom: 25px;
          font-size: 15px;
        }

        .payment-details {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
        }

        .payment-detail-item {
          margin-bottom: 20px;
        }

        .payment-detail-item:last-child {
          margin-bottom: 0;
        }

        .payment-detail-item label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #666;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .payment-detail-item .value {
          font-size: 18px;
          color: #1a1a1a;
          font-weight: 600;
        }

        .payment-detail-item.amount .value {
          font-size: 24px;
          color: var(--tp-theme-1);
          font-weight: 700;
        }

        .copy-field {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .account-number {
          font-size: 24px;
          font-weight: 700;
          color: var(--tp-theme-1);
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }

        .copy-btn {
          padding: 8px 16px;
          background: var(--tp-theme-1);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .copy-btn:hover {
          background: #a0b030;
        }

        .payment-instructions {
          background: #fff3cd;
          padding: 20px;
          border-radius: 6px;
          border-left: 4px solid #ffc107;
        }

        .payment-instructions h4 {
          margin-bottom: 15px;
          color: #856404;
        }

        .payment-instructions ol {
          margin: 0;
          padding-left: 20px;
          color: #856404;
        }

        .payment-instructions li {
          margin-bottom: 8px;
        }

        .confirmation-note {
          background: #e8f5e9;
          padding: 15px;
          border-radius: 6px;
          margin-top: 20px;
          border-left: 4px solid #4CAF50;
        }

        .confirmation-note p {
          margin: 0;
          color: #2e7d32;
          font-size: 14px;
        }

        @media (max-width: 991px) {
          .form-grid,
          .payment-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .booking-progress {
            flex-direction: column;
            gap: 20px;
          }

          .progress-line {
            width: 2px;
            height: 30px;
            margin: 0;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary,
          .btn-whatsapp {
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .enhanced-booking-container {
            padding: 0 15px;
            margin: 30px auto;
          }

          .section-title {
            font-size: 24px;
          }

          .form-section {
            padding: 20px;
          }

          .payment-info-card,
          .payment-confirmation-card {
            padding: 20px;
          }

          .account-number {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
