"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { PACKAGE_DATA, getPackageBySlug, CLASSIC_FEATURES, WALKIN_FEATURES, formatPrice } from "@/data/package-pricing";
import { useRouter, useSearchParams } from "next/navigation";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const packageTypes = [
  { name: "Classic Package", description: "Full session with extended time" },
  { name: "Walk-in Package", description: "Quick professional session" }
];

const shootCategories = [
  { 
    id: "wedding", 
    name: "Wedding", 
    description: "Capture your special day",
    classicPrice: "₦450,000",
    walkinPrice: "₦250,000",
    icon: "💒"
  },
  { 
    id: "baby-shoot", 
    name: "Baby Shoot", 
    description: "Precious moments with your little one",
    classicPrice: "₦80,000",
    walkinPrice: "₦45,000",
    icon: "👶"
  },
  { 
    id: "maternity", 
    name: "Maternity", 
    description: "Beautiful expecting mother moments",
    classicPrice: "₦100,000",
    walkinPrice: "₦60,000",
    icon: "🤰"
  },
  { 
    id: "family-portraits", 
    name: "Family Portraits", 
    description: "Timeless family memories",
    classicPrice: "₦120,000",
    walkinPrice: "₦70,000",
    icon: "👨‍👩‍👧‍👦"
  },
  { 
    id: "convocation", 
    name: "Convocation", 
    description: "Celebrate your achievement",
    classicPrice: "₦60,000",
    walkinPrice: "₦35,000",
    icon: "🎓"
  },
  { 
    id: "call-to-bar", 
    name: "Call to Bar", 
    description: "Professional milestone photography",
    classicPrice: "₦80,000",
    walkinPrice: "₦50,000",
    icon: "⚖️"
  },
  { 
    id: "general", 
    name: "General Photography", 
    description: "Events, portraits & more",
    classicPrice: "₦70,000",
    walkinPrice: "₦40,000",
    icon: "📸"
  }
];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // legacy display strings; keep for non-URL flow
  const [selectedPackageType, setSelectedPackageType] = useState<string>("");
  // new: URL-driven package flow
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>("");
  const [selectedKind, setSelectedKind] = useState<"classic" | "walkin" | "">("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Get package info from URL params (from package page)
  const urlPackage = searchParams?.get('package') || '';
  const urlCategory = searchParams?.get('category') || '';
  const urlPrice = searchParams?.get('price') || '';
  const urlType = searchParams?.get('type') || '';

  // Set initial category from URL if available
  useEffect(() => {
    if (urlCategory) {
      const category = shootCategories.find(cat => 
        cat.name.toLowerCase() === urlCategory.toLowerCase()
      );
      if (category) {
        setSelectedCategory(category.id);
      }
    }
    if (urlPackage) {
      setSelectedPackageSlug(urlPackage);
    }
    if (urlType === 'classic' || urlType === 'walkin') {
      setSelectedKind(urlType);
    }
  }, [urlCategory, urlPackage, urlType]);

  // Helpers for PACKAGE_DATA lookups when URL-driven flow is used
  const selectedPackageData = selectedPackageSlug ? getPackageBySlug(selectedPackageSlug) : undefined;
  const currentOptions = selectedPackageData && selectedKind ? (selectedKind === 'classic' ? selectedPackageData.classic : selectedPackageData.walkin) : [];
  const currentOption = currentOptions && currentOptions.length > 0 ? currentOptions[Math.min(selectedOptionIndex, currentOptions.length - 1)] : undefined;

  // Get current price based on selections
  const getCurrentPrice = () => {
    // Prefer URL/data-driven pricing from PACKAGE_DATA if available
    if (selectedPackageData && selectedKind && currentOption) {
      return formatPrice(currentOption.price);
    }
    if (urlPrice) return urlPrice;
    // Fallback to legacy category pricing
    if (selectedCategory && selectedPackageType) {
      const category = shootCategories.find(cat => cat.id === selectedCategory);
      if (category) {
        return selectedPackageType === "Classic Package" 
          ? category.classicPrice 
          : category.walkinPrice;
      }
    }
    return "";
  };

  // Get current category name
  const getCurrentCategoryName = () => {
    if (selectedPackageData) return selectedPackageData.name;
    if (urlCategory) return urlCategory;
    if (selectedCategory) {
      const category = shootCategories.find(cat => cat.id === selectedCategory);
      return category?.name || "";
    }
    return "";
  };

  // Get current package name
  const getCurrentPackageName = () => {
    if (selectedKind) return selectedKind === 'classic' ? 'Classic Package' : 'Walk-in Package';
    return urlPackage || selectedPackageType;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlots([]); // Reset time selection when date changes
  };

  const handleTimeSelect = (time: string) => {
    const currentIndex = timeSlots.indexOf(time);
    
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
    
    // Max 4 slots (2 hours)
    if (selectedTimeSlots.length >= 4) {
      alert('Maximum of 4 consecutive 30-minute slots (2 hours) can be selected');
      return;
    }
    
    // Get indices of selected slots
    const selectedIndices = selectedTimeSlots.map(t => timeSlots.indexOf(t)).sort((a, b) => a - b);
    const lastSelectedIndex = selectedIndices[selectedIndices.length - 1];
    
    // Must be consecutive - next slot after the last selected
    if (currentIndex === lastSelectedIndex + 1) {
      setSelectedTimeSlots([...selectedTimeSlots, time]);
    } else {
      alert('Please select consecutive time slots');
    }
  };

  const isTimeSlotDisabled = (time: string) => {
    const currentIndex = timeSlots.indexOf(time);
    
    // If no slots selected, all are enabled
    if (selectedTimeSlots.length === 0) {
      return false;
    }
    
    // If max slots reached, disable all unselected
    if (selectedTimeSlots.length >= 4 && !selectedTimeSlots.includes(time)) {
      return true;
    }
    
    // Get the last selected index
    const selectedIndices = selectedTimeSlots.map(t => timeSlots.indexOf(t)).sort((a, b) => a - b);
    const lastSelectedIndex = selectedIndices[selectedIndices.length - 1];
    
    // Only enable the next consecutive slot
    if (currentIndex === lastSelectedIndex + 1) {
      return false;
    }
    
    // Already selected slots are enabled (for deselection)
    if (selectedTimeSlots.includes(time)) {
      return false;
    }
    
    // All other slots are disabled
    return true;
  };

  const isTimeSlotSelected = (time: string) => {
    return selectedTimeSlots.includes(time);
  };

  const handlePackageTypeSelect = (pkgType: string) => {
    setSelectedPackageType(pkgType);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCategory) {
      alert('Please select a shoot category');
      return;
    }
    
    if (!selectedPackageType) {
      alert('Please select a package type');
      return;
    }
    
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    
    if (selectedTimeSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    
    // Create WhatsApp message
    const whatsappNumber = "2349022292514"; // LUM Studios WhatsApp
    
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const sortedTimeSlots = [...selectedTimeSlots].sort((a, b) => 
      timeSlots.indexOf(a) - timeSlots.indexOf(b)
    );
    
  const message = `
✨ *NEW BOOKING REQUEST* ✨

━━━━━━━━━━━━━━━━━━━━

📦 *PACKAGE DETAILS*
━━━━━━━━━━━━━━━━━━━━
• Category: ${getCurrentCategoryName()}
• Package: ${getCurrentPackageName()}${selectedPackageData ? ` (${selectedPackageData.name})` : ''}
${currentOption ? `• Option: ${currentOption.description}
• Images: ${currentOption.images.edited} edited${currentOption.images.unedited ? `, ${currentOption.images.unedited} unedited` : ''}` : ''}
${getCurrentPrice() ? `• Price: ${getCurrentPrice()}` : ''}


👤 *CUSTOMER INFORMATION*
━━━━━━━━━━━━━━━━━━━━
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}


📅 *SCHEDULE*
━━━━━━━━━━━━━━━━━━━━
• Date: ${formattedDate}
• Time: ${sortedTimeSlots.join(' → ')}
• Duration: ${selectedTimeSlots.length * 30} minutes


💬 *ADDITIONAL MESSAGE*
━━━━━━━━━━━━━━━━━━━━
${formData.message || 'No additional message'}


━━━━━━━━━━━━━━━━━━━━
📸 *Sent from LUM Studios Booking*
www.thelumstudios.com
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Optionally, redirect to confirmation page or show success message
    // router.push('/booking-confirmation');
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
                      <h1 className="booking-title">Book Your Session</h1>
                      <p className="booking-subtitle">
                        {urlPackage && urlCategory ? (
                          <>Selected: <strong>{urlPackage}</strong> - {urlCategory}</>
                        ) : (
                          'Choose your shoot category and complete the form below'
                        )}
                      </p>
                      {getCurrentPrice() && (
                        <div className="selected-price-display">
                          <span className="price-label">Price:</span>
                          <span className="price-value">{getCurrentPrice()}</span>
                        </div>
                      )}
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
                      
                      {/* Shoot Category Selection */}
                      {!urlCategory && (
                        <div className="booking-section">
                          <h2 className="section-title">
                            <span className="step-number">1</span>
                            Choose Shoot Category
                          </h2>
                          <div className="shoot-category-grid">
                            {shootCategories.map((category) => (
                              <div
                                key={category.id}
                                className={`shoot-category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                              >
                                <div className="category-icon">{category.icon}</div>
                                <h4>{category.name}</h4>
                                <p className="category-description">{category.description}</p>
                                <div className="category-pricing">
                                  <div className="price-item">
                                    <span className="price-type">Classic:</span>
                                    <span className="price-amount">{category.classicPrice}</span>
                                  </div>
                                  <div className="price-item">
                                    <span className="price-type">Walk-in:</span>
                                    <span className="price-amount">{category.walkinPrice}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Package Type Selection */}
                      <div className="booking-section">
                        <h2 className="section-title">
                          <span className="step-number">{urlCategory ? '1' : '2'}</span>
                          Select Package Type
                        </h2>
                        {selectedCategory && !urlCategory && (
                          <div className="current-price-info">
                            <p>
                              Selected Category: <strong>{shootCategories.find(c => c.id === selectedCategory)?.name}</strong>
                            </p>
                          </div>
                        )}
                        <div className="package-type-grid">
                          {packageTypes.map((pkg) => {
                            const currentCategory = shootCategories.find(c => c.id === selectedCategory);
                            const displayPrice = currentCategory 
                              ? (pkg.name === "Classic Package" ? currentCategory.classicPrice : currentCategory.walkinPrice)
                              : null;
                            
                            return (
                              <div
                                key={pkg.name}
                                className={`package-type-card ${selectedPackageType === pkg.name ? 'selected' : ''} ${!selectedCategory && !urlCategory ? 'disabled' : ''}`}
                                onClick={() => {
                                  if (selectedCategory || urlCategory) {
                                    handlePackageTypeSelect(pkg.name);
                                  }
                                }}
                              >
                                <h4>{pkg.name}</h4>
                                <p>{pkg.description}</p>
                                {displayPrice && (
                                  <div className="package-price-badge">
                                    <span className="price">{displayPrice}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Calendar Section */}
                      <div className="booking-section">
                        <h2 className="section-title">
                          <span className="step-number">{urlCategory ? '2' : '3'}</span>
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
                          <span className="step-number">{urlCategory ? '3' : '4'}</span>
                          Select Time Slots
                        </h2>
                        <p className="time-instruction">
                          Select up to 4 consecutive 30-minute slots (max 2 hours).
                          Selected: <strong>{selectedTimeSlots.length} slot(s)</strong> ({selectedTimeSlots.length * 30} minutes)
                        </p>
                        <div className="time-grid">
                          {timeSlots.map((time) => (
                            <div
                              key={time}
                              className={`time-slot ${isTimeSlotSelected(time) ? 'selected' : ''} ${isTimeSlotDisabled(time) ? 'disabled' : ''}`}
                              onClick={() => !isTimeSlotDisabled(time) && handleTimeSelect(time)}
                            >
                              {time}
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
                            <span className="label">Category:</span>
                            <span className="value">{getCurrentCategoryName() || "Not selected"}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Package:</span>
                            <span className="value">{getCurrentPackageName() || "Not selected"}</span>
                          </div>
                          {getCurrentPrice() && (
                            <div className="summary-item highlight">
                              <span className="label">Price:</span>
                              <span className="value price-highlight">{getCurrentPrice()}</span>
                            </div>
                          )}
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
                            <span className="label">Time Slots:</span>
                            <span className="value">
                              {selectedTimeSlots.length > 0 
                                ? `${selectedTimeSlots.length} slot(s) - ${selectedTimeSlots.length * 30} minutes` 
                                : "Not selected"}
                            </span>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="submit-btn"
                        >
                          📱 Confirm via WhatsApp
                        </button>
                        <p className="whatsapp-note">
                          You&apos;ll be redirected to WhatsApp to confirm your booking with our team
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

export default function BookingPage() {
  return (
    <Suspense fallback={
      <Wrapper>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
              <HeaderTransparent />
              <div className="booking-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading booking form...</p>
              </div>
            </main>
            <FooterTwo topCls="" />
          </div>
        </div>
      </Wrapper>
    }>
      <BookingContent />
    </Suspense>
  );
}
