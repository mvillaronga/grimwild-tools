# Combat Kit Builder - Testing Guide

## Overview

This document provides comprehensive testing procedures for the Combat Kit Builder feature, including scenario management, threats system, enhanced monsters integration, and complex card generation functionality.

## Feature Summary

The Combat Kit Builder enables creation of complete combat scenarios with:
- Scenario titles and environmental features
- Structured threats system (pool and hazard types)
- Enhanced monsters management with tier-based formatting
- Professional combat reference card export
- Integration with Enhanced Monsters Feature

## Test Plan

### 1. Basic Scenario Testing

#### Test 1.1: Title and Features Input
**Objective:** Verify basic scenario information input and display

**Steps:**
1. Navigate to Combat Kit tab
2. Test scenario title input:
   - Enter various titles: "Boarding a Pirate Ship", "Empty Title", "Special!Characters"
   - Verify card header displays with crossed swords icon
3. Test features input:
   - Enter comma-separated features: "Stormy waters, cramped decks"
   - Test single feature: "Narrow corridors"
   - Test empty features field

**Expected Results:**
- Title displays in card header with proper typography
- Crossed swords icon (⚔) appears correctly positioned
- Features display as comma-delimited text
- Empty features section handled gracefully

#### Test 1.2: Form Controls
**Objective:** Verify reset and clear functionality

**Steps:**
1. Populate all form fields with custom data
2. Click "Defaults" button:
   - Verify reset to default pirate ship scenario
   - Check all threats and monsters reset
3. Click "Clear" button:
   - Verify all fields cleared
   - Check empty state displays

**Expected Results:**
- Defaults restore complete default scenario
- Clear removes all content appropriately
- Form ready for new input after operations

### 2. Threats System Testing

#### Test 2.1: Pool Threats Management
**Objective:** Verify pool threat creation, editing, and validation

**Steps:**
1. Click "🎲 Add Pool" button
2. Test pool threat functionality:
   - Enter pool values 1-12 (should accept)
   - Enter invalid values: 0, 13+, negative (should clamp to 1-12)
   - Enter threat name: "Waves Crashing"
   - Verify display format: "4d Waves Crashing"

**Expected Results:**
- Pool values automatically clamped to valid range
- Threat names accept any text content
- Display shows correct "Xd Name" format
- Real-time updates in card preview

#### Test 2.2: Hazard Threats Management
**Objective:** Verify hazard threat creation and display

**Steps:**
1. Click "⚠️ Add Hazard" button
2. Test hazard threat functionality:
   - Enter hazard name: "Kraken Tentacles"
   - Verify display format: "○○ Kraken Tentacles"
   - Test empty names (should not display)

**Expected Results:**
- Hazard threats display with double circles (○○)
- Names accept any text content
- Empty hazards don't appear in card
- Automatic formatting applied

#### Test 2.3: Threats List Operations
**Objective:** Verify threat management operations

**Steps:**
1. Create multiple threats (mix of pool and hazard)
2. Test reordering:
   - Use up/down arrows to reorder threats
   - Verify first item can't move up
   - Verify last item can't move down
3. Test deletion:
   - Delete individual threats
   - Verify confirmation and removal
4. Test empty state:
   - Delete all threats
   - Verify empty state message

**Expected Results:**
- Reordering works correctly with proper button states
- Deletion removes threats immediately
- Empty state displays helpful message
- Card updates reflect all changes

### 3. Enhanced Monsters Testing

#### Test 3.1: Monster Creation and Validation
**Objective:** Verify monster creation with tier/role system

**Steps:**
1. Click "Add Monster" button
2. Test monster fields:
   - Size: Enter 1-12 (valid), test invalid values
   - Name: Enter various monster names
   - Tier: Test all options (Mook, Tough, Elite, Boss)
   - Role: Test all 12 role options

**Expected Results:**
- Size values clamped to 1-12 range
- All tier and role options available
- Names accept any text content
- Form validation prevents invalid states

#### Test 3.2: Tier-Based Formatting
**Objective:** Verify correct monster display formatting by tier

**Steps:**
1. Create monsters with different tier combinations:
   - **Mook, size 4:** Should display "4d Deckhands (Mook Brute)"
   - **Tough, size 4:** Should display "4d Guards (Tough Protector)"
   - **Tough, size 1:** Should display "1 Captain (Tough Tactician)"
   - **Elite, size 3:** Should display "3d | Elite Guard (Elite Marksman)"
   - **Boss, size 1:** Should display "1d | Pirate King (Boss Overseer)"

**Expected Results:**
- Mook/Tough pools use "Xd Name (Tier Role)" format
- Individual Toughs use "X Name (Tier Role)" format
- Elite/Boss use "Xd | Name (Tier Role)" format
- All formatting appears correctly in card

#### Test 3.3: Monster List Operations
**Objective:** Verify monster management functionality

**Steps:**
1. Create multiple monsters
2. Test reordering with up/down buttons
3. Test editing existing monsters:
   - Change size, name, tier, role
   - Verify updates appear immediately
4. Test deletion and empty state

**Expected Results:**
- Reordering works with proper button states
- In-place editing updates immediately
- Deletion removes monsters correctly
- Empty state displays helpful message

### 4. Integration Testing

#### Test 4.1: Enhanced Monsters Feature Integration
**Objective:** Verify seamless integration with Enhanced Monsters

**Steps:**
1. Test data consistency:
   - Create monsters in Combat Kit
   - Verify same validation rules as Enhanced Monsters
   - Check tier/role options match
2. Test formatting consistency:
   - Compare display formats between features
   - Verify identical tier-based formatting

**Expected Results:**
- Identical validation and behavior
- Consistent formatting across features
- No data conflicts or inconsistencies

#### Test 4.2: Complex Scenario Testing
**Objective:** Test complete scenarios with all elements

**Steps:**
1. Create complex scenario:
   - Title: "Stormy Ship Battle"
   - Features: "High winds, slippery deck, cannon fire"
   - Multiple pool threats: "6d Storm Waves", "4d Cannon Barrage"
   - Multiple hazard threats: "Broken Rigging", "Fire Spread"
   - Multiple monsters: Mix of all tiers and roles
2. Verify card layout and formatting

**Expected Results:**
- All elements display correctly
- Proper section separation
- No layout breaking or overflow
- Professional appearance maintained

### 5. Card Display Testing

#### Test 5.1: Visual Layout Verification
**Objective:** Verify card visual design and layout

**Steps:**
1. Create test scenario with all elements
2. Verify card sections:
   - Header with title and crossed swords
   - Features section with proper labeling
   - Threats section with formatted display
   - Monsters section with tier formatting
   - Visual dividers between sections

**Expected Results:**
- Clean, professional layout
- Proper typography hierarchy
- Clear section separation
- Consistent with design specifications

#### Test 5.2: Typography and Formatting
**Objective:** Verify text formatting matches specifications

**Steps:**
1. Check typography elements:
   - Features/Threats labels use initcap styling
   - Data appears in italics
   - Two-column layout (labels left, values right)
   - Proper font families and sizes

**Expected Results:**
- Labels match Move styling from other cards
- Data properly italicized
- Layout maintains alignment
- Typography consistent with design system

### 6. Export Functionality Testing

#### Test 6.1: Image Export
**Objective:** Verify PNG export functionality

**Steps:**
1. Create complete combat kit scenario
2. Test download functionality:
   - Click "Download as Image"
   - Verify filename: "combat-kit-{scenario-title}.png"
   - Check image quality and content
3. Test clipboard copy functionality

**Expected Results:**
- High-quality PNG export
- Correct filename generation
- All content visible and properly formatted
- Clipboard copy works in supported browsers

#### Test 6.2: Complex Content Export
**Objective:** Test export with complex scenarios

**Steps:**
1. Create scenario with maximum content:
   - Long title and features
   - Many threats and monsters
   - Complex formatting
2. Verify export handles complexity

**Expected Results:**
- Export completes successfully
- No content cutoff or overflow
- Maintains readability
- Performance remains acceptable

### 7. Edge Cases and Error Handling

#### Test 7.1: Empty States
**Objective:** Verify handling of empty content

**Steps:**
1. Test various empty combinations:
   - No threats, no monsters
   - Empty threat/monster names
   - Only title, no other content
2. Verify card displays appropriately

**Expected Results:**
- Empty sections handled gracefully
- No broken layouts or errors
- Appropriate empty state messages
- Card remains exportable

#### Test 7.2: Data Validation
**Objective:** Test input validation and error prevention

**Steps:**
1. Test invalid inputs:
   - Extremely long names
   - Special characters in all fields
   - Rapid input changes
2. Verify system stability

**Expected Results:**
- Invalid inputs handled gracefully
- No JavaScript errors or crashes
- Performance remains stable
- User feedback for invalid states

### 8. Performance Testing

#### Test 8.1: Large Dataset Performance
**Objective:** Test with many threats and monsters

**Steps:**
1. Create scenario with maximum content:
   - 20+ threats of mixed types
   - 20+ monsters of various tiers
2. Monitor performance:
   - Input responsiveness
   - Card rendering speed
   - Export performance

**Expected Results:**
- Smooth performance with large datasets
- No noticeable lag during input
- Export completes within reasonable time
- Memory usage remains stable

#### Test 8.2: Rapid Operations
**Objective:** Test rapid user interactions

**Steps:**
1. Rapidly add/delete threats and monsters
2. Quick succession of reordering operations
3. Fast typing in multiple fields

**Expected Results:**
- System handles rapid operations smoothly
- No race conditions or state corruption
- Consistent behavior under stress
- No memory leaks

## Browser Compatibility Testing

### Core Functionality
Test in all supported browsers:
- **Chrome 90+**
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**

### Feature-Specific Testing
- **Drag operations:** Verify reordering works
- **Complex layouts:** Check card rendering
- **Export functionality:** Test image generation

## Accessibility Testing

### Keyboard Navigation
1. Tab through all form elements
2. Test add/delete operations with keyboard
3. Verify proper focus management

### Screen Reader Testing
1. Test with screen reader software
2. Verify proper labeling of complex forms
3. Check ARIA attributes for dynamic content

## Integration with Enhanced Monsters

### Consistency Testing
1. Compare behavior with standalone Enhanced Monsters
2. Verify identical validation rules
3. Check formatting consistency
4. Test data structure compatibility

## Bug Reporting Template

**Bug Title:** Brief description
**Component:** Threats/Monsters/Card/Export
**Steps to Reproduce:** Numbered steps
**Expected Result:** What should happen
**Actual Result:** What actually happened
**Browser/Device:** Testing environment
**Data State:** Current form content when bug occurred

## Test Results Documentation

### Test Execution Checklist
- [ ] Basic scenario functionality verified
- [ ] Threats system fully tested
- [ ] Enhanced monsters integration confirmed
- [ ] Card display and formatting correct
- [ ] Export functionality working
- [ ] Edge cases handled properly
- [ ] Performance acceptable
- [ ] Browser compatibility verified
- [ ] Accessibility requirements met
- [ ] Integration consistency confirmed

### Known Issues
Document any known limitations:
- Browser-specific behaviors
- Performance considerations with large datasets
- Accessibility limitations
- Integration edge cases

## Conclusion

The Combat Kit Builder should pass all tests in this guide before being considered production-ready. Pay special attention to the integration with Enhanced Monsters Feature and the complex tier-based formatting system. Regular regression testing should be performed to ensure continued functionality as the system evolves.
