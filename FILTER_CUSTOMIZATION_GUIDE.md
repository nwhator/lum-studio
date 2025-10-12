# 🎨 Gallery Filter - Quick Customization Guide

## 🔧 Common Customizations

### 1. Change Button Colors

**File:** `src/app/globals.scss`

```scss
.filter-btn {
  background: white;              // ← Change this
  border: 2px solid #e8e8e8;     // ← Change this
  color: #444;                    // ← Change this
  
  &.active {
    background: var(--tp-theme-1); // ← Active color
    border-color: var(--tp-theme-1);
    color: white;
  }
}
```

### 2. Change Category Icons

**File:** `src/components/portfolio/portfolio-grid-col-3-area.tsx`

**Line 214-264** (approximately):

```tsx
// All Categories
<span className="filter-icon">✨</span> // Change to any emoji

// Baby Shoot
<span className="filter-icon">👶</span> // Change to 🍼 or 👼

// Wedding
<span className="filter-icon">💍</span> // Change to 💒 or 💐

// Call to Bar
<span className="filter-icon">⚖️</span> // Change to 📜 or 🎓

// Convocation
<span className="filter-icon">🎓</span> // Change to 🎉 or 📚

// Family
<span className="filter-icon">👨‍👩‍👧‍👦</span> // Change to 👪 or ❤️

// Maternity
<span className="filter-icon">🤰</span> // Change to 👶 or 💝
```

### 3. Adjust Button Spacing

**File:** `src/app/globals.scss`

```scss
.portfolio-filter.masonary-menu {
  gap: 12px; // Desktop - change to 8px, 16px, 20px, etc.
}

@media (max-width: 768px) {
  .portfolio-filter.masonary-menu {
    gap: 10px; // Tablet - change as needed
  }
}

@media (max-width: 576px) {
  .portfolio-filter.masonary-menu {
    gap: 8px; // Mobile - change as needed
  }
}
```

### 4. Change Button Size

**File:** `src/app/globals.scss`

```scss
.filter-btn {
  padding: 12px 20px;  // Desktop - increase/decrease
  font-size: 14px;     // Text size
  min-height: 44px;    // Touch target (don't go below 40px!)
}

@media (max-width: 768px) {
  .filter-btn {
    padding: 10px 16px; // Tablet
    font-size: 13px;
    min-height: 42px;
  }
}

@media (max-width: 576px) {
  .filter-btn {
    padding: 9px 14px;  // Mobile
    font-size: 12px;
    min-height: 40px;   // Minimum recommended
  }
}
```

### 5. Disable Horizontal Scroll (Desktop Only)

**File:** `src/app/globals.scss`

```scss
.portfolio-filter.masonary-menu {
  flex-wrap: wrap; // Change from 'nowrap' to 'wrap'
}

// Keep horizontal scroll on mobile
@media (max-width: 768px) {
  .portfolio-filter.masonary-menu {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}
```

### 6. Hide Count Badges

**File:** `src/app/globals.scss`

```scss
.filter-count {
  display: none; // Hide count badges
}
```

**Or remove from component:**

```tsx
// Delete these lines in portfolio-grid-col-3-area.tsx
<span className="filter-count">{portfolio_data.length}</span>
<span className="filter-count">{portfolio_data.filter(item => item.show === 'cat1').length}</span>
// etc...
```

### 7. Change Hover Animation Speed

**File:** `src/app/globals.scss`

```scss
.filter-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  //              ↑ Change this (0.1s = fast, 0.5s = slow)
  
  .filter-icon {
    transition: transform 0.3s ease;
    //                    ↑ Change this
  }
  
  &::before {
    transition: width 0.4s ease, height 0.4s ease;
    //                ↑ Change ripple speed
  }
}
```

### 8. Remove Ripple Effect

**File:** `src/app/globals.scss`

```scss
.filter-btn {
  &::before {
    display: none; // Remove ripple completely
  }
}
```

### 9. Change Active Button Shadow

**File:** `src/app/globals.scss`

```scss
.filter-btn.active {
  box-shadow: 0 6px 20px rgba(var(--tp-theme-rgb), 0.3);
  //          ↑      ↑               ↑                ↑
  //       offset  blur         theme color       opacity
  
  // Examples:
  // Subtle: 0 2px 8px rgba(var(--tp-theme-rgb), 0.2);
  // Strong: 0 8px 30px rgba(var(--tp-theme-rgb), 0.5);
  // None: box-shadow: none;
}
```

### 10. Customize Subtitle Text

**File:** `src/components/portfolio/portfolio-grid-col-3-area.tsx`

**Line 210** (approximately):

```tsx
<p className="filter-subtitle">Choose a category to explore</p>
//                              ↑ Change this text
```

**Examples:**

- "Select a category below"
- "Browse by type"
- "Filter your results"
- "" (empty to hide)

**Hide completely:**

```scss
// In globals.scss
.filter-subtitle {
  display: none;
}
```

### 11. Change Border Radius (Roundness)

**File:** `src/app/globals.scss`

```scss
.filter-btn {
  border-radius: 50px; // Very round (pill shape)
  // border-radius: 25px; // Medium round
  // border-radius: 10px; // Slightly round
  // border-radius: 4px;  // Square with rounded corners
  // border-radius: 0;    // Perfect square
}
```

### 12. Adjust Scrollbar Style

**File:** `src/app/globals.scss`

```scss
.portfolio-filter-scroll-container {
  &::-webkit-scrollbar {
    height: 6px; // Change scrollbar height (4px, 8px, 10px)
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2); // Change color
    border-radius: 10px;             // Change roundness
  }
}
```

**Hide scrollbar:**

```scss
.portfolio-filter-scroll-container {
  scrollbar-width: none; // Firefox
  
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari
  }
}
```

### 13. Add Box Shadow to Wrapper

**File:** `src/app/globals.scss`

```scss
.portfolio-filter-wrapper {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  //          ↑ vertical offset
  //             ↑ blur
  //                ↑ color
  
  // Examples:
  // Subtle: 0 2px 8px rgba(0, 0, 0, 0.05);
  // Strong: 0 12px 32px rgba(0, 0, 0, 0.1);
  // None: box-shadow: none;
}
```

### 14. Change Background Gradient

**File:** `src/app/globals.scss`

```scss
.portfolio-filter-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  //                          ↑ angle  ↑ start    ↑ end
  
  // Examples:
  // Horizontal: linear-gradient(90deg, #f8f9fa, #ffffff);
  // Vertical: linear-gradient(180deg, #f8f9fa, #ffffff);
  // Solid color: background: #f8f9fa;
  // Three colors: linear-gradient(135deg, #f8f9fa 0%, #e8e8e8 50%, #ffffff 100%);
}
```

### 15. Make Icons Bigger/Smaller

**File:** `src/app/globals.scss`

```scss
.filter-icon {
  font-size: 18px; // Desktop - change to 16px, 20px, 24px
}

@media (max-width: 768px) {
  .filter-icon {
    font-size: 16px; // Tablet
  }
}

@media (max-width: 576px) {
  .filter-icon {
    font-size: 15px; // Mobile
  }
}
```

---

## 🎨 Color Presets

### Preset 1: Blue Theme

```scss
.filter-btn {
  &.active {
    background: #007bff;
    border-color: #007bff;
  }
  
  &:hover {
    border-color: #007bff;
    color: #007bff;
  }
}
```

### Preset 2: Purple Theme

```scss
.filter-btn {
  &.active {
    background: #6f42c1;
    border-color: #6f42c1;
  }
  
  &:hover {
    border-color: #6f42c1;
    color: #6f42c1;
  }
}
```

### Preset 3: Green Theme

```scss
.filter-btn {
  &.active {
    background: #28a745;
    border-color: #28a745;
  }
  
  &:hover {
    border-color: #28a745;
    color: #28a745;
  }
}
```

### Preset 4: Dark Mode

```scss
.portfolio-filter-wrapper {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.filter-btn {
  background: #2d2d2d;
  border-color: #444;
  color: #fff;
  
  &.active {
    background: var(--tp-theme-1);
    border-color: var(--tp-theme-1);
  }
}
```

---

## 📱 Testing Tips

### Test on Multiple Devices

1. **Desktop**: 1920px, 1440px, 1280px
2. **Tablet**: 1024px, 768px
3. **Mobile**: 414px, 375px, 320px

### Browser DevTools

```
Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
Select device → Test scroll behavior
Check touch targets (should be 40px+)
```

### Real Device Testing

- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)

---

## ⚡ Performance Tips

1. **Keep animations light** (use transform, opacity)
2. **Avoid heavy box-shadows** on mobile
3. **Use emoji icons** (no SVG overhead)
4. **Minimize repaints** (use transform)
5. **Native scrolling** (no JavaScript)

---

## 🐛 Common Issues & Fixes

### Issue: Buttons wrap on mobile

**Fix:** Ensure `flex-wrap: nowrap` in masonary-menu

### Issue: Scrollbar not visible

**Fix:** Add custom scrollbar styles

### Issue: Touch targets too small

**Fix:** Set `min-height: 40px` minimum

### Issue: Active state not working

**Fix:** Check `.active` class is added by isotope

### Issue: Count showing wrong numbers

**Fix:** Verify `portfolio_data.filter()` logic

---

## 📚 Related Files

- **Component**: `src/components/portfolio/portfolio-grid-col-3-area.tsx`
- **Styles**: `src/app/globals.scss`
- **Data**: Inline in component (portfolio_data array)
- **Hook**: `src/hooks/use-isotop.ts`

---

**Last Updated:** October 12, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
