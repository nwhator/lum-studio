# Quick Start: Implementing the Booking System

## Step 1: Update WhatsApp Number

Edit `src/components/booking/enhanced-booking-form.tsx` around line 655:

```typescript
const whatsappNumber = 'YOUR_NUMBER_HERE'; // Replace with your actual number
// Example: '2348065407503'
```

## Step 2: Add to Booking Page

Replace or update `src/app/booking/page.tsx`:

```tsx
import EnhancedBookingForm from "@/components/booking/enhanced-booking-form";
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";

export default function BookingPage() {
  return (
    <Wrapper>
      <HeaderOne />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="booking-page-main">
            <div className="container">
              <EnhancedBookingForm />
            </div>
          </main>
          
          <FooterTwo />
        </div>
      </div>
    </Wrapper>
  );
}
```

## Step 3: Link from Package Pages

Add booking buttons to your package pages:

```tsx
import Link from "next/link";

// In your package page component:
<Link 
  href="/booking?package=maternity-shoot&type=classic"
  className="btn-book-now"
>
  Book Now
</Link>
```

## Step 4: Test the Flow

1. Go to `/booking`
2. Fill in all required fields
3. Select package type and looks
4. Review in checkout
5. Enter payment details
6. Confirm via WhatsApp

## That's it! 🎉

The system is fully functional and ready to accept bookings.

---

## Optional: Add Pricing Tables to Package Pages

Create a pricing table component to show on individual service pages:

```tsx
// src/components/packages/pricing-table.tsx
import { PACKAGE_DATA, formatPrice, CLASSIC_FEATURES, WALKIN_FEATURES } from "@/data/package-pricing";

export function PricingTable({ packageSlug }: { packageSlug: string }) {
  const pkg = PACKAGE_DATA.find(p => p.slug === packageSlug);
  
  if (!pkg) return null;
  
  return (
    <div className="pricing-section">
      <h2>Pricing & Packages</h2>
      
      {/* Classic Package */}
      <div className="package-pricing">
        <h3>Classic Package</h3>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Price</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {pkg.classic.map((option, idx) => (
              <tr key={idx}>
                <td>{option.description}</td>
                <td>{formatPrice(option.price)}</td>
                <td>{option.images.edited} edited, {option.images.unedited} unedited</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="features">
          <h4>Includes:</h4>
          <ul>
            {CLASSIC_FEATURES.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Walk-in Package */}
      <div className="package-pricing">
        <h3>Walk-in Package</h3>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Price</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {pkg.walkin.map((option, idx) => (
              <tr key={idx}>
                <td>{option.description}</td>
                <td>{formatPrice(option.price)}</td>
                <td>{option.images.edited} edited, {option.images.unedited} unedited</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="features">
          <h4>Includes:</h4>
          <ul>
            {WALKIN_FEATURES.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

Then use it in your service pages:

```tsx
import { PricingTable } from "@/components/packages/pricing-table";

// In your service page:
<PricingTable packageSlug="maternity-shoot" />
```

Done! 🚀
