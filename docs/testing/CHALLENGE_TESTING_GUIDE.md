# Challenge Builder - Testing Guide

## Overview

This document provides comprehensive testing procedures for the Challenge Builder feature, including functional testing, user interface validation, export functionality, and edge case handling.

## Feature Summary

The Challenge Builder allows users to create standardized challenge cards with:
- Challenge pools (1-12 dice)
- Challenge titles with special typography
- Multi-line traits and moves
- Optional failure conditions with pools and descriptions
- Professional card export functionality

## Test Plan

### 1. Basic Functionality Tests

#### Test 1.1: Pool Input Validation
**Objective:** Verify pool input accepts valid ranges and handles invalid input

**Steps:**
1. Navigate to Challenge Builder tab
2. Test pool input field:
   - Enter values 1-12 (should accept)
   - Enter 0 (should clamp to 1)
   - Enter 13+ (should clamp to 12)
   - Enter negative numbers (should clamp to 1)
   - Enter non-numeric text (should ignore/reset)

**Expected Results:**
- Pool values stay within 1-12 range
- Invalid inputs are automatically corrected
- Card preview updates immediately with valid values

#### Test 1.2: Title Input and Display
**Objective:** Verify title input and special typography rendering

**Steps:**
1. Enter various title formats:
   - Single word: "Goblin"
   - Multiple words: "Goblin Raider Attack"
   - Special characters: "Goblin's Den!"
   - Long titles: "Very Long Challenge Title That Tests Wrapping"
2. Observe card preview typography

**Expected Results:**
- All characters accepted in title field
- Card displays title with initcap styling (larger first letters)
- Long titles wrap appropriately
- Special characters display correctly

#### Test 1.3: Traits Input Processing
**Objective:** Verify multi-line trait input and bullet list display

**Steps:**
1. Enter traits in various formats:
   - Single trait: "Sneaky"
   - Multiple traits (one per line):
     ```
     Sneaky
     Cowardly
     Pack Tactics
     ```
   - Empty lines mixed with content
   - Trailing/leading whitespace

**Expected Results:**
- Each non-empty line becomes a bullet point
- Empty lines are ignored
- Whitespace is trimmed
- Traits display with ✱ symbols and italic formatting

#### Test 1.4: Moves Input Processing
**Objective:** Verify multi-line moves input and special formatting

**Steps:**
1. Enter moves in various formats:
   - Single move: "Ambush"
   - Multiple moves:
     ```
     Surprise Attack
     Flee when outnumbered
     Call for reinforcements
     ```
   - Long move descriptions
   - Mixed case text

**Expected Results:**
- Each non-empty line becomes a bullet point
- Moves display with ◉ symbols
- Text appears in bold, all caps
- First letters of each word are larger (initcap)

### 2. Failure Conditions Testing

#### Test 2.1: Failure Pool Validation
**Objective:** Verify failure pool input and conditional display

**Steps:**
1. Test failure pool values:
   - Set to 0 (should hide failure section)
   - Set to 1-12 (should show failure section if description exists)
   - Test invalid values (should clamp to 0-12)

**Expected Results:**
- Pool 0 hides failure section regardless of description
- Pool 1-12 shows failure section only with description
- Invalid values are automatically corrected

#### Test 2.2: Failure Description
**Objective:** Verify failure description input and display

**Steps:**
1. Test failure description scenarios:
   - Empty description with pool > 0 (should hide failure)
   - Valid description with pool > 0 (should show failure)
   - Valid description with pool = 0 (should hide failure)

**Expected Results:**
- Failure section only appears when both pool > 0 AND description exists
- Failure displays with ✘ symbol and bold formatting
- Description text appears after pool notation

### 3. Form Controls Testing

#### Test 3.1: Defaults Button
**Objective:** Verify reset to defaults functionality

**Steps:**
1. Modify all form fields with custom values
2. Click "Defaults" button
3. Verify all fields reset to default values:
   - Pool: "6"
   - Title: "Goblin Ambush"
   - Traits: Default multi-line traits
   - Moves: Default multi-line moves
   - Fail Pool: "3"
   - Fail Description: Default description

**Expected Results:**
- All fields immediately reset to defaults
- Card preview updates to show default challenge
- No data loss or corruption

#### Test 3.2: Clear Button
**Objective:** Verify clear form functionality

**Steps:**
1. Enter data in all form fields
2. Click "Clear" button
3. Verify all fields are cleared:
   - Pool: "4" (minimum value)
   - Title: Empty
   - Traits: Empty
   - Moves: Empty
   - Fail Pool: "0"
   - Fail Description: Empty

**Expected Results:**
- All fields cleared to empty/minimum states
- Card preview shows minimal challenge
- Form ready for new input

### 4. Export Functionality Testing

#### Test 4.1: Image Download
**Objective:** Verify PNG download functionality

**Steps:**
1. Create a test challenge with all fields populated
2. Click "Download as Image" button
3. Verify download behavior:
   - File downloads automatically
   - Filename format: `{sanitized-title}.png`
   - Image quality and resolution
   - Content accuracy

**Expected Results:**
- PNG file downloads successfully
- Filename matches sanitized title
- Image is high resolution (2x scale)
- All card content visible and properly formatted

#### Test 4.2: Clipboard Copy
**Objective:** Verify copy to clipboard functionality

**Steps:**
1. Create a test challenge
2. Click "Copy to Clipboard" button
3. Test clipboard content:
   - Paste into image editor
   - Verify image quality
   - Check for transparency

**Expected Results:**
- Image copies to clipboard successfully
- High resolution maintained
- Transparent background preserved
- All formatting intact

#### Test 4.3: Filename Generation
**Objective:** Verify filename sanitization

**Steps:**
1. Test various title formats:
   - "Goblin Ambush" → "goblin_ambush.png"
   - "Special!@#Characters" → "special_characters.png"
   - "Multiple   Spaces" → "multiple_spaces.png"
   - Empty title → "grimwild-challenge.png"

**Expected Results:**
- Special characters removed/replaced
- Spaces converted to underscores
- Multiple underscores collapsed to single
- Empty titles use default filename

### 5. Responsive Design Testing

#### Test 5.1: Mobile Layout
**Objective:** Verify mobile responsiveness

**Steps:**
1. Test on mobile devices or browser dev tools
2. Verify layout at various screen sizes:
   - 320px width (small mobile)
   - 768px width (tablet)
   - 1024px+ width (desktop)

**Expected Results:**
- Form and preview stack vertically on mobile
- All inputs remain accessible and usable
- Text remains readable at all sizes
- Buttons remain clickable

#### Test 5.2: Touch Interface
**Objective:** Verify touch device compatibility

**Steps:**
1. Test on touch devices
2. Verify all interactions work:
   - Input field focus
   - Button taps
   - Scrolling behavior

**Expected Results:**
- All inputs respond to touch
- No hover-dependent functionality
- Appropriate touch target sizes

### 6. Edge Cases and Error Handling

#### Test 6.1: Extreme Content
**Objective:** Test with unusual content amounts

**Steps:**
1. Test with extreme inputs:
   - Very long titles (100+ characters)
   - Many traits (20+ lines)
   - Many moves (20+ lines)
   - Very long individual traits/moves

**Expected Results:**
- Content displays without breaking layout
- Performance remains acceptable
- Export functionality still works
- No JavaScript errors

#### Test 6.2: Special Characters
**Objective:** Verify special character handling

**Steps:**
1. Test with various special characters:
   - Unicode characters: "Gøblin Åttack"
   - Emojis: "Goblin 👹 Attack"
   - HTML entities: "&lt;Goblin&gt;"
   - Quotes and apostrophes: "Goblin's \"Ambush\""

**Expected Results:**
- All characters display correctly
- No HTML injection or XSS issues
- Export preserves special characters
- No encoding problems

### 7. Performance Testing

#### Test 7.1: Input Responsiveness
**Objective:** Verify real-time updates perform well

**Steps:**
1. Type rapidly in various input fields
2. Monitor preview update speed
3. Check for lag or delays

**Expected Results:**
- Preview updates smoothly in real-time
- No noticeable lag during typing
- Memory usage remains stable

#### Test 7.2: Export Performance
**Objective:** Verify export speed and reliability

**Steps:**
1. Create complex challenges
2. Time export operations
3. Test multiple rapid exports

**Expected Results:**
- Exports complete within 2 seconds
- No memory leaks from repeated exports
- Consistent performance across browsers

## Browser Compatibility Testing

### Supported Browsers
Test in the following browsers:
- **Chrome 90+**
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**

### Feature-Specific Testing
- **Clipboard API:** May not work in older browsers
- **Canvas Export:** Should work in all supported browsers
- **CSS Features:** Verify consistent styling

## Accessibility Testing

### Keyboard Navigation
1. Tab through all form elements
2. Verify logical tab order
3. Test Enter/Space key activation

### Screen Reader Testing
1. Test with screen reader software
2. Verify proper label associations
3. Check ARIA attributes

## Bug Reporting Template

When reporting bugs, include:

**Bug Title:** Brief description
**Steps to Reproduce:** Numbered steps
**Expected Result:** What should happen
**Actual Result:** What actually happened
**Browser/Device:** Testing environment
**Screenshots:** If applicable

## Test Results Documentation

### Test Execution Checklist
- [ ] All basic functionality tests passed
- [ ] Form controls work correctly
- [ ] Export functionality verified
- [ ] Responsive design confirmed
- [ ] Edge cases handled properly
- [ ] Performance acceptable
- [ ] Browser compatibility verified
- [ ] Accessibility requirements met

### Known Issues
Document any known issues or limitations:
- Browser-specific behaviors
- Performance considerations
- Accessibility limitations
- Feature gaps

## Conclusion

The Challenge Builder should pass all tests in this guide before being considered production-ready. Any failures should be documented and addressed before release. Regular regression testing should be performed when making changes to ensure continued functionality.
