# Booking Form Improvements

## Overview

Enhanced the booking form with better UX for picture quantity selection and time slot booking.

## Changes Made

### 1. **Per Picture Quantity Input**

- Added ability to enter number of edited pictures for "Per picture" pricing options
- Automatic price calculation: Base price × quantity
- Minimum 1 picture validation
- Real-time price display shows calculation
- Only appears when "Per picture" option is selected

**Example:**

- Select "Individual & Portrait Shoots"
- Choose "Per picture" option (₦7,500 each for Classic)
- Enter quantity: 5 pictures
- Total automatically calculates: ₦7,500 × 5 = ₦37,500

### 2. **Enhanced Time Slot Selection**

- **New Format**: Multiple 30-minute time slot selection
- **Time Range**: 9:00 AM to 5:30 PM
- **Max Duration**: 4 slots (2 hours maximum)
- **UI Improvement**: Visual grid of clickable time slot buttons instead of dropdown

**Features:**

- Click to select/deselect time slots
- Selected slots highlighted in brand color
- Shows time range summary (e.g., "09:00 AM - 11:00 AM")
- Shows total duration (e.g., "120 minutes (4 slots)")
- Prevents selection beyond 4 slots with alert
- Automatically sorts selected slots chronologically

**Available Time Slots:**

```md
09:00 AM | 09:30 AM | 10:00 AM | 10:30 AM | 11:00 AM | 11:30 AM
12:00 PM | 12:30 PM | 01:00 PM | 01:30 PM | 02:00 PM | 02:30 PM
03:00 PM | 03:30 PM | 04:00 PM | 04:30 PM | 05:00 PM | 05:30 PM
```

### 3. **Updated Review Section**

- Shows picture quantity for per-picture bookings
- Displays time range instead of single time
- Shows session duration in minutes and slot count
- Updated pricing display to reflect quantity

### 4. **WhatsApp Message Updates**

- Includes picture quantity for per-picture orders
- Shows time range (start - end)
- Shows session duration
- Better formatted booking details

## Technical Implementation

### State Management

```typescript
const [numEditedPictures, setNumEditedPictures] = useState(1);
const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
```

### Price Calculation

```typescript
const totalPrice = currentOption 
  ? (currentOption.type === 'single' 
      ? currentOption.price * numEditedPictures 
      : currentOption.price)
  : 0;
```

### Time Slot Toggle Logic

- Add slot if not selected and under 4 slots
- Remove slot if already selected
- Auto-sort selected slots by time order
- Show alert if trying to exceed 4 slots

### Validation Updates

- Validates minimum 1 picture for per-picture pricing
- Validates at least 1 time slot selected (previously required only 1 time)
- All other validations preserved

## UI/UX Improvements

### Time Slot Grid

- **Desktop**: 6-column responsive grid
- **Mobile**: Smaller buttons, tighter spacing
- **Hover Effect**: Border color change and slight lift
- **Selected State**: Brand color background with shadow
- **Summary Box**: Shows selected range and duration

### Picture Quantity Input

- Number input with increment/decrement controls
- Shows real-time calculation below input
- Only visible for "per picture" options
- Minimum value enforced at 1

## Styling Added (booking.scss)

```scss
// Time Slots Grid (60+ lines)
.time-slots-grid - Responsive grid layout
.time-slot-btn - Individual slot button styling
.selected-time-summary - Shows selection summary
.time-slot-info - Helper text styling
.form-text - Small helper text below inputs

// Responsive adjustments
@media (max-width: 576px) - Mobile-optimized time slots
```

## Files Modified

1. **src/app/booking/page.tsx** (752 lines)
   - Added `numEditedPictures` and `selectedTimeSlots` state
   - Updated price calculation logic
   - Added `toggleTimeSlot` function
   - Updated validation for new fields
   - Enhanced WhatsApp message formatting
   - Updated JSX for time slots UI
   - Updated review section display

2. **src/app/booking/booking.scss** (670+ lines)
   - Added 60+ lines of time slot styling
   - Added responsive styles for mobile
   - Added helper text styling

## User Flow

### For Per-Picture Bookings

1. Select shoot category
2. Choose package type (Classic/Walk-in)
3. Select "Per picture" option
4. **NEW**: Enter number of pictures (default: 1)
5. See real-time price calculation
6. Continue with form

### For Time Slot Selection

1. Select preferred date from calendar
2. **NEW**: Click time slots in grid (up to 4)
3. See selected range and duration
4. System shows "09:00 AM - 11:00 AM (120 minutes)"
5. Continue to review

### Review Page Updates

- Shows: "Per picture × 5" for quantity orders
- Shows: "09:00 AM - 10:30 AM" time range
- Shows: "90 minutes (3 slots)" duration

## Benefits

✅ **Better Price Transparency**: Real-time calculation for bulk orders
✅ **Flexible Time Booking**: Select exact duration needed (30min increments)
✅ **Improved UX**: Visual time slot selection vs dropdown
✅ **Clear Duration**: Always know how long the session will be
✅ **Mobile Friendly**: Responsive grid adapts to screen size
✅ **Prevents Overbooking**: Max 4 slots (2 hours) enforced
✅ **Better Data**: WhatsApp message includes all details

## Testing Checklist

- [ ] Test picture quantity input (1-10+ pictures)
- [ ] Test price calculation updates correctly
- [ ] Test time slot selection (single slot)
- [ ] Test time slot selection (multiple consecutive slots)
- [ ] Test time slot selection (max 4 slots)
- [ ] Test deselection of time slots
- [ ] Test alert when trying to exceed 4 slots
- [ ] Test on mobile (responsive grid)
- [ ] Test review page shows correct details
- [ ] Test WhatsApp message includes all info
- [ ] Test validation errors trigger correctly

## Future Enhancements (Optional)

- [ ] Add time slot availability checking (backend integration)
- [ ] Show popular/recommended time slots
- [ ] Add calendar view for time slots
- [ ] Allow saving favorite configurations
- [ ] Add discount for bulk picture orders
- [ ] Show estimated delivery date based on slot selection
