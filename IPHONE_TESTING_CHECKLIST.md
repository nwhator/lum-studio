# 📱 iPhone Testing Checklist & Site Cleanup Report

## ✅ Code Cleanup Status

### Unused Code Audit

All imports are properly used and necessary. No unused code found that requires removal.

### Key Findings

- ✅ All styled-jsx is properly scoped and in use
- ✅ All imports are actively used in components
- ✅ No dead code detected
- ✅ All OurPixo gallery imports functional
- ✅ iOS safety measures already implemented

---

## 🛡️ iOS/Safari Crash Prevention

### Already Implemented Safety Measures

1. **iOS Detection** (`src/utils/ios-safe-gsap.ts`)
   - Detects iOS Safari and mobile devices
   - Automatically disables problematic features
   - Logs all operations for debugging

2. **ScrollSmoother Protection**
   - ✅ Automatically disabled on iOS/mobile
   - ✅ Only enabled on desktop browsers
   - ✅ Prevents the #1 cause of iOS crashes

3. **Animation Safety Wrapper**
   - ✅ `safeAnimationInit()` - Error handling for all animations
   - ✅ Reduces complexity on mobile
   - ✅ Logs errors for debugging

4. **Parallax Protection**
   - ✅ Removes `data-speed` attributes on mobile
   - ✅ Prevents fast scroll crashes
   - ✅ Adds `is-mobile-device` class for CSS adjustments

5. **Error Logging**
   - ✅ Console logging for mobile debugging
   - ✅ Error storage in `window.__animationErrors`
   - ✅ Google Analytics event tracking

---

## 📋 iPhone Testing Checklist

### Critical Pages to Test on iPhone

#### 1. **Home Page** (`/`)

- [ ] Page loads without crash
- [ ] Gallery carousel scrolls smoothly
- [ ] Curve animation displays properly
- [ ] Hero banner animations work
- [ ] Project cards (project-four) clickable
- [ ] Classic/Walk-in buttons work (no 404)
- [ ] No white screens or freezes
- [ ] Smooth scrolling (no jank)

**iOS Specific Checks:**

- [ ] No ScrollSmoother crashes
- [ ] Fast scroll doesn't freeze page
- [ ] Animations don't stutter
- [ ] Touch events responsive

---

#### 2. **Gallery Page** (`/gallery`)

- [ ] Loads without crash
- [ ] Shows 1 picture per category on mobile (6 total)
- [ ] Category filter works
- [ ] Isotope filtering smooth
- [ ] Images lazy load properly
- [ ] "View Package" buttons work
- [ ] No memory issues with images
- [ ] Pinch zoom disabled on gallery

**iOS Specific Checks:**

- [ ] Magic cursor doesn't interfere on touch
- [ ] Image optimization working
- [ ] No excessive battery drain

---

#### 3. **Booking Page** (`/booking`)

- [ ] Page loads completely
- [ ] All 3 steps functional
- [ ] Time slot selection works
- [ ] Only adjacent slots selectable
- [ ] Disabled slots clearly visible
- [ ] Form validation works
- [ ] WhatsApp integration works
- [ ] Payment info displays
- [ ] Copy-to-clipboard works on iOS

**iOS Specific Checks:**

- [ ] No keyboard issues
- [ ] Date picker iOS-friendly
- [ ] Form doesn't reset on scroll
- [ ] No autocomplete issues

---

#### 4. **Package Pages** (Test all 7)

**Baby Shoot** (`/packages/baby-shoot`)

- [ ] Page loads
- [ ] Pricing table displays
- [ ] 3 OurPixo galleries load
- [ ] Iframes responsive
- [ ] "View Full Gallery" buttons work
- [ ] Reviews section visible
- [ ] FAQs expand/collapse

**Wedding** (`/packages/wedding`)

- [ ] Page loads
- [ ] 2 galleries display
- [ ] Pre-wedding + wedding galleries work
- [ ] All interactive elements functional

**Call to Bar** (`/packages/call-to-bar`)

- [ ] Page loads
- [ ] 1 gallery displays
- [ ] Iframe loads properly

**Convocation** (`/packages/convocation`)

- [ ] Page loads
- [ ] 1 gallery displays
- [ ] No crashes

**Family Portraits** (`/packages/family-portraits`)

- [ ] Page loads
- [ ] 1 gallery displays
- [ ] Interactive elements work

**Maternity** (`/packages/maternity`)

- [ ] Page loads
- [ ] 1 gallery displays
- [ ] Pricing functional

**General** (`/packages/general`)

- [ ] Page loads
- [ ] 5 galleries display
- [ ] Template + galleries work together
- [ ] No layout issues

**iOS Specific Checks (All Packages):**

- [ ] OurPixo iframes load on iOS Safari
- [ ] Iframes don't cause freezing
- [ ] Aspect ratio correct on iPhone
- [ ] Scrolling between galleries smooth
- [ ] No memory leaks from multiple iframes

---

#### 5. **Service Page** (`/service`)

- [ ] Page loads
- [ ] ServiceSix component displays
- [ ] No numbered subtitles (01-04)
- [ ] Short descriptions visible
- [ ] Images load properly
- [ ] "See Details" buttons work

**iOS Specific Checks:**

- [ ] Panel animations work
- [ ] Image hover effects functional
- [ ] No layout shifts

---

#### 6. **Contact Page** (`/contact`)

- [ ] Form loads
- [ ] All fields functional
- [ ] Form validation works
- [ ] Submit button works
- [ ] No keyboard issues on iOS

---

#### 7. **FAQ Page** (`/faq`)

- [ ] Page loads
- [ ] Accordion works
- [ ] Expand/collapse smooth
- [ ] No animation crashes

---

## 🔍 Specific iPhone Test Scenarios

### Performance Tests

1. **Fast Scrolling**
   - Scroll rapidly up and down on home page
   - Expected: No crashes, smooth animation
   - iOS Safety: ScrollSmoother disabled, should be stable

2. **Memory Test**
   - Visit all 7 package pages sequentially
   - Expected: No crashes, iframes load cleanly
   - Watch for: Memory warnings in Safari

3. **Network Test**
   - Test on 4G/5G (not just WiFi)
   - Expected: Lazy loading works, images compress
   - OurPixo iframes should load progressively

4. **Rotation Test**
   - Rotate device portrait ↔ landscape
   - Expected: Layout adjusts, no content loss
   - Galleries resize properly

5. **Background/Foreground**
   - Switch apps while on gallery page
   - Return to browser
   - Expected: Page state preserved, no reload

---

## 🚨 Known iOS Issues to Watch For

### Potential Problem Areas

1. **ScrollSmoother** ⚠️
   - **Status**: Already disabled on iOS
   - **Check**: Verify console shows "Skipping ScrollSmoother on iOS/mobile"
   - **Expected**: No crashes related to smooth scrolling

2. **Multiple Iframes** ⚠️
   - **Pages affected**: Package pages with galleries
   - **Risk**: Memory issues with 3-5 iframes on one page
   - **Mitigation**: Lazy loading implemented
   - **Test**: Baby Shoot (3 galleries), General (5 galleries)

3. **GSAP Animations** ⚠️
   - **Status**: Safe animation wrapper implemented
   - **Check**: Look for errors in `window.__animationErrors`
   - **Expected**: Animations may be simplified but should work

4. **Image Optimization** ⚠️
   - **Status**: Next.js Image component used
   - **Check**: Network tab - images should be WebP/AVIF
   - **Expected**: Fast loading even on cellular

5. **Touch Events** ⚠️
   - **Areas**: Gallery filters, time slot selection
   - **Check**: Touch targets at least 44x44 pixels
   - **Expected**: No accidental clicks, proper feedback

---

## 🧪 Testing Tools & Methods

### Using iPhone Safari

1. **Enable Web Inspector**
   - Settings → Safari → Advanced → Web Inspector
   - Connect iPhone to Mac
   - Safari → Develop → [iPhone Name]

2. **Console Logging**
   - Check for `[GSAP]` prefixed logs
   - Look for `⚠️ Skipping ScrollSmoother` message
   - Check `__animationErrors` array

3. **Performance Monitor**
   - Look for memory warnings
   - Monitor CPU usage
   - Check for layout thrashing

### Using Chrome DevTools (iPhone Simulation)

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 14 Pro" or similar
4. Test responsive breakpoints
5. Throttle network to "Fast 3G"

---

## ✅ Pre-Deployment Checklist

Before going live, verify:

### Code Quality

- [x] No TypeScript errors (verified)
- [x] No React warnings
- [x] All imports used
- [x] No console errors in production build

### Performance

- [ ] Lighthouse score > 90 on mobile
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 5s
- [ ] Bundle size optimized

### iOS Compatibility

- [ ] ScrollSmoother disabled on iOS
- [ ] Safe animation wrappers in place
- [ ] Error logging configured
- [ ] Touch targets sized properly

### Functionality

- [ ] All 7 package pages load
- [ ] 14 OurPixo galleries functional
- [ ] Booking form works end-to-end
- [ ] Gallery filtering works
- [ ] Navigation no 404s

### Mobile Specific

- [ ] 1 image per category on mobile gallery
- [ ] Curve animation visible
- [ ] Iframes responsive
- [ ] Forms keyboard-friendly
- [ ] Buttons touch-friendly

---

## 🐛 Debugging Tips for iPhone Issues

### If Page Crashes

1. Check console for GSAP errors
2. Verify ScrollSmoother is disabled: Look for this log:

   ```md
   [GSAP] ⚠️ Skipping ScrollSmoother on iOS/mobile for stability
   ```

3. Check `window.__animationErrors` array
4. Disable animations one by one to isolate issue

### If Iframes Don't Load

1. Check network tab for CORS errors
2. Verify OurPixo URLs are correct
3. Test in different browsers (Chrome iOS, Safari iOS)
4. Check if iOS is blocking third-party content

### If Scrolling is Janky

1. Check for `data-speed` attributes (should be removed on mobile)
2. Verify `is-mobile-device` class is added
3. Check if too many animations running simultaneously
4. Monitor memory usage in Safari inspector

### If Forms Don't Work

1. Check for iOS keyboard covering inputs
2. Verify input types are correct (email, tel, etc.)
3. Test autocomplete behavior
4. Check if `viewport` meta tag is correct

---

## 📊 Expected Console Output on iPhone

### Successful Load

```md
[GSAP] registerGSAPPlugins called
[GSAP] ⚠️ Skipping ScrollSmoother on iOS/mobile for stability
[GSAP] ✅ Registered plugins: ScrollTrigger, SplitText
[GSAP] gallery-animations: ⚠️ Simplified for mobile
[GSAP] gallery-animations: Initializing...
[GSAP] gallery-animations: ✅ Initialized successfully
```

### If Errors Occur

```md
[GSAP] animation-name: ❌ Failed to initialize
[Error Log]: { message: "...", stack: "...", isIOSSafari: true }
```

---

## 🎯 Critical Success Metrics

Page must pass these on iPhone:

1. **No Crashes** - Page loads and stays loaded
2. **Smooth Scrolling** - No jank or freezing
3. **Fast Load** - < 3s on 4G
4. **All Galleries Work** - All 14 OurPixo iframes functional
5. **Forms Functional** - Booking form completes successfully
6. **Navigation Works** - No 404 errors, all links work
7. **Responsive** - Looks good portrait & landscape
8. **Touch Friendly** - All buttons easily clickable

---

## 📱 Device Testing Matrix

### Primary Test Devices

- iPhone 14 Pro (iOS 17+)
- iPhone 13 (iOS 16+)
- iPhone SE (iOS 15+)
- iPhone 11 (iOS 15+)

### Browsers to Test

- ✅ Safari (primary)
- ✅ Chrome for iOS
- ✅ Firefox for iOS
- ✅ Edge for iOS

### Network Conditions

- ✅ WiFi (fast)
- ✅ 5G
- ✅ 4G
- ✅ Slow 3G (edge cases)

---

## 🚀 Final Sign-Off

Before marking as complete:

- [ ] Tested on actual iPhone device (not just simulator)
- [ ] Tested on multiple iPhone models
- [ ] Tested on both Safari and Chrome iOS
- [ ] Tested with slow network
- [ ] Tested background/foreground switching
- [ ] Tested with low battery mode
- [ ] Verified console shows proper iOS safety logs
- [ ] Confirmed no crash reports
- [ ] Verified all user flows work
- [ ] Performance metrics acceptable

---

## 📝 Notes

**Current Status:**

- ✅ iOS safety measures implemented
- ✅ ScrollSmoother disabled on iOS
- ✅ Animation error handling in place
- ✅ Mobile-specific optimizations active
- ✅ All package galleries added
- ✅ No compilation errors

**Next Steps:**

1. Test on actual iPhone device
2. Verify all checkboxes above
3. Document any issues found
4. Fix any iOS-specific bugs
5. Retest until all pass
6. Deploy to production

---

## Ready for iPhone Testing! 📱✨
