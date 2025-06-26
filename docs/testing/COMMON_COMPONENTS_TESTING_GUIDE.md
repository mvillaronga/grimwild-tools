# Common Components - Testing Guide

## Overview

This document provides comprehensive testing procedures for the shared components system, including color management, image export functionality, and reusable UI components that are used across all Grimwild Tools features.

## Feature Summary

The Common Components system includes:
- **Color Management:** ColorDropdown, ColorPicker, CustomColorCreator
- **Image Export:** ImageActionsWrapper and export utilities
- **UI Components:** TraitBulletList, MovesBulletList
- **Utility Functions:** Color conversion, validation, and helper functions

## Test Plan

### 1. Color Management System Testing

#### Test 1.1: ColorDropdown Basic Functionality
**Objective:** Verify color selection and dropdown behavior

**Steps:**
1. Navigate to Monster Builder (uses color system)
2. Test dropdown interaction:
   - Click color dropdown to open
   - Verify predefined colors display with swatches
   - Select different colors and verify selection
   - Click outside to close dropdown
   - Test keyboard navigation (Tab, Enter, Escape)

**Expected Results:**
- Dropdown opens/closes correctly
- All predefined colors visible with proper swatches
- Selection updates immediately
- Keyboard navigation works properly
- Visual feedback for selected color

#### Test 1.2: Color Sorting and Organization
**Objective:** Verify color organization by hue

**Steps:**
1. Open color dropdown
2. Examine color order:
   - Verify colors grouped by similar hues
   - Check progression from reds → oranges → yellows → greens → blues → purples
   - Verify custom colors appear at top after "Create Custom"

**Expected Results:**
- Colors organized by hue progression
- Similar colors grouped together
- Custom colors properly positioned
- Logical visual flow through color spectrum

#### Test 1.3: CustomColorCreator Functionality
**Objective:** Verify custom color creation process

**Steps:**
1. Click "Create Custom Color" option
2. Test color picker:
   - Drag around color picker to select colors
   - Verify hex value updates in real-time
   - Test color preview swatch
3. Test name input:
   - Enter single word (should show error)
   - Enter three words (should show error)
   - Enter exactly two words (should accept)
   - Test special characters (should be filtered)
   - Test very long names (should be limited)

**Expected Results:**
- Color picker responds smoothly
- Hex values update correctly
- Two-word validation enforced
- Special characters filtered out
- Appropriate error messages shown

#### Test 1.4: Custom Color Integration
**Objective:** Verify custom colors integrate with dropdown

**Steps:**
1. Create several custom colors with valid two-word names
2. Verify integration:
   - Custom colors appear in dropdown
   - Custom colors marked with "custom" badge
   - Custom colors sorted with predefined colors
   - Selection works for custom colors

**Expected Results:**
- Custom colors appear immediately in dropdown
- Visual distinction with custom badge
- Proper sorting integration
- Full functionality with custom colors

### 2. Image Export System Testing

#### Test 2.1: Download Functionality
**Objective:** Verify PNG download across all features

**Steps:**
1. Test download in each feature:
   - Challenge Builder: Create challenge and download
   - Monster Builder: Create monster and download
   - Combat Kit Builder: Create kit and download
2. Verify download behavior:
   - File downloads automatically
   - Correct filename generation
   - High resolution (2x scale)
   - Transparent background

**Expected Results:**
- Downloads work in all features
- Filenames match content (sanitized)
- High-quality images produced
- Transparent backgrounds preserved

#### Test 2.2: Clipboard Copy Functionality
**Objective:** Verify clipboard copy across browsers

**Steps:**
1. Test clipboard copy in each feature
2. Test in different browsers:
   - Chrome (should work)
   - Firefox (should work)
   - Safari (should work)
   - Edge (should work)
3. Verify clipboard content:
   - Paste into image editor
   - Check image quality
   - Verify transparency

**Expected Results:**
- Clipboard copy works in supported browsers
- High-quality images in clipboard
- Transparency preserved
- Graceful fallback in unsupported browsers

#### Test 2.3: Export Error Handling
**Objective:** Verify error handling and fallbacks

**Steps:**
1. Test error scenarios:
   - Disable clipboard API (if possible)
   - Test with very large content
   - Test rapid successive exports
2. Verify error handling:
   - Appropriate error messages
   - Graceful degradation
   - No application crashes

**Expected Results:**
- Clear error messages for failures
- Application remains stable
- Fallback options when available
- User guidance for resolution

### 3. UI Components Testing

#### Test 3.1: TraitBulletList Component
**Objective:** Verify trait display formatting

**Steps:**
1. Test in Challenge and Monster builders
2. Verify trait display:
   - Traits appear with ✱ symbols
   - Text is italicized
   - Proper spacing and alignment
   - Empty arrays handled gracefully
3. Test with various content:
   - Single trait
   - Multiple traits
   - Very long trait descriptions
   - Special characters in traits

**Expected Results:**
- Consistent ✱ symbol display
- Proper italic formatting
- Good spacing and readability
- Handles all content types gracefully

#### Test 3.2: MovesBulletList Component
**Objective:** Verify moves display formatting

**Steps:**
1. Test in Challenge and Monster builders
2. Verify moves display:
   - Moves appear with ◉ symbols
   - Text is bold and uppercase
   - First letters are larger (initcap)
   - Proper spacing and alignment
3. Test with various content:
   - Single move
   - Multiple moves
   - Very long move descriptions
   - Mixed case input

**Expected Results:**
- Consistent ◉ symbol display
- Bold, uppercase formatting
- Proper initcap styling
- Good visual hierarchy

### 4. Cross-Feature Integration Testing

#### Test 4.1: Color System Consistency
**Objective:** Verify color system works consistently across features

**Steps:**
1. Create custom colors in Monster Builder
2. Navigate to other features and back
3. Verify custom colors persist
4. Test color selection consistency

**Expected Results:**
- Custom colors persist across navigation
- Consistent behavior in all features
- No data loss or corruption
- Identical functionality everywhere

#### Test 4.2: Export System Consistency
**Objective:** Verify export works consistently across features

**Steps:**
1. Create content in each feature
2. Test export functionality in each
3. Compare export quality and behavior
4. Verify filename generation consistency

**Expected Results:**
- Identical export behavior across features
- Consistent image quality
- Similar filename patterns
- No feature-specific issues

### 5. Performance Testing

#### Test 5.1: Color System Performance
**Objective:** Verify color system performance

**Steps:**
1. Test with many custom colors (20+)
2. Rapid color selection changes
3. Quick dropdown open/close operations
4. Monitor memory usage

**Expected Results:**
- Smooth performance with many colors
- No lag during rapid operations
- Stable memory usage
- No performance degradation

#### Test 5.2: Export Performance
**Objective:** Verify export system performance

**Steps:**
1. Test export with complex content
2. Rapid successive exports
3. Large image exports
4. Monitor memory and CPU usage

**Expected Results:**
- Exports complete within 2 seconds
- No memory leaks from repeated exports
- Stable performance with complex content
- Reasonable resource usage

### 6. Browser Compatibility Testing

#### Test 6.1: Color Picker Compatibility
**Objective:** Verify color picker works across browsers

**Steps:**
1. Test react-colorful component in:
   - Chrome, Firefox, Safari, Edge
2. Verify touch support on mobile devices
3. Test keyboard navigation

**Expected Results:**
- Color picker works in all browsers
- Touch gestures work on mobile
- Keyboard navigation functional
- Consistent visual appearance

#### Test 6.2: Export Compatibility
**Objective:** Verify export works across browsers

**Steps:**
1. Test html2canvas functionality in all browsers
2. Test clipboard API support
3. Verify download behavior

**Expected Results:**
- Image generation works everywhere
- Clipboard support where available
- Downloads work consistently
- Appropriate fallbacks provided

### 7. Accessibility Testing

#### Test 7.1: Color System Accessibility
**Objective:** Verify color system accessibility

**Steps:**
1. Test with screen readers
2. Verify keyboard navigation
3. Check color contrast ratios
4. Test with high contrast mode

**Expected Results:**
- Screen reader announces color selections
- Full keyboard navigation support
- Sufficient color contrast
- Works with accessibility tools

#### Test 7.2: Export System Accessibility
**Objective:** Verify export accessibility

**Steps:**
1. Test export buttons with keyboard
2. Verify screen reader announcements
3. Check button labeling and descriptions

**Expected Results:**
- Buttons accessible via keyboard
- Clear announcements for actions
- Descriptive button labels
- Proper ARIA attributes

### 8. Edge Cases and Error Handling

#### Test 8.1: Color System Edge Cases
**Objective:** Test unusual color system scenarios

**Steps:**
1. Test edge cases:
   - Very long color names
   - Duplicate color names
   - Invalid hex values
   - Rapid color creation/deletion
2. Verify error handling

**Expected Results:**
- Graceful handling of edge cases
- Clear error messages
- No data corruption
- System remains stable

#### Test 8.2: Export System Edge Cases
**Objective:** Test unusual export scenarios

**Steps:**
1. Test edge cases:
   - Export with no content
   - Very large content exports
   - Rapid export operations
   - Network interruptions
2. Verify error handling

**Expected Results:**
- Appropriate handling of edge cases
- Clear error messages
- No application crashes
- Graceful recovery

### 9. Integration Testing

#### Test 9.1: Component Interaction
**Objective:** Verify components work together properly

**Steps:**
1. Test combinations:
   - Color selection + export
   - Multiple UI components together
   - Complex content with all components
2. Verify no conflicts or issues

**Expected Results:**
- Components work together seamlessly
- No conflicts or interference
- Consistent behavior in combinations
- Proper state management

## Browser-Specific Testing

### Chrome Testing
- Full feature support expected
- Clipboard API should work
- High performance expected

### Firefox Testing
- Full feature support expected
- Clipboard API should work
- Performance should be good

### Safari Testing
- Full feature support expected
- Clipboard API may have limitations
- Performance should be acceptable

### Edge Testing
- Full feature support expected
- Clipboard API should work
- Performance should be good

## Mobile Testing

### Touch Interface
- Color picker touch gestures
- Button tap targets
- Dropdown interactions
- Export functionality

### Performance
- Smooth color picker operation
- Reasonable export times
- Stable memory usage
- Good responsiveness

## Bug Reporting Template

**Bug Title:** Brief description
**Component:** Color/Export/UI Component
**Steps to Reproduce:** Numbered steps
**Expected Result:** What should happen
**Actual Result:** What actually happened
**Browser/Device:** Testing environment
**Screenshots:** If applicable

## Test Results Documentation

### Test Execution Checklist
- [ ] Color management system fully tested
- [ ] Image export system verified
- [ ] UI components working correctly
- [ ] Cross-feature integration confirmed
- [ ] Performance acceptable
- [ ] Browser compatibility verified
- [ ] Accessibility requirements met
- [ ] Edge cases handled properly

### Known Issues
Document any known limitations:
- Browser-specific behaviors
- Performance considerations
- Accessibility limitations
- Feature gaps

## Conclusion

The Common Components system should pass all tests in this guide before being considered production-ready. These components are critical to the entire application, so thorough testing is essential. Any failures should be documented and addressed before release, and regular regression testing should be performed when making changes to ensure continued functionality across all features.
