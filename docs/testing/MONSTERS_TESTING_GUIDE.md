# Enhanced Monsters Feature - Testing Guide

## Overview
This document provides comprehensive testing procedures for the new enhanced monsters management system in the Combat Kit Builder.

## Feature Summary
The enhanced monsters feature replaces plain-text monster entry with a structured, interactive management system that includes:
- Individual monster entries with size, name, tier, and role fields
- Tier-specific display formatting
- Add, edit, delete, and reorder functionality
- Real-time validation and error handling
- Responsive design for all screen sizes

## Test Plan

### 1. Basic Functionality Tests

#### 1.1 Default State Testing
**Test**: Load Combat Kit Builder page
**Expected Result**: 
- Default monsters should be loaded: 4 monsters (Deckhands, Rigging Archers, Swashbucklers, Pirate Captain)
- Each monster should display in proper entry form with all fields populated
- Combat Kit card should show properly formatted monsters

#### 1.2 Add Monster Testing
**Test**: Click "⚔️ Add Monster" button
**Expected Result**:
- New monster entry appears at bottom of list
- Default values: Size=4, Name=empty, Tier=Mook, Role=Brute
- All input fields should be editable
- Move up/down buttons should be properly enabled/disabled

#### 1.3 Delete Monster Testing
**Test**: Click delete button (🗑) on any monster
**Expected Result**:
- Monster is removed from list
- Remaining monsters maintain their order
- Combat Kit card updates to reflect changes

### 2. Input Field Testing

#### 2.1 Size Input Testing
**Tests**:
- Enter valid numbers (1-12)
- Enter invalid numbers (0, 13, negative)
- Enter non-numeric values
- Leave field empty

**Expected Results**:
- Valid numbers: Accepted and saved
- Invalid numbers: Red border, error tooltip
- Non-numeric: Field validation prevents/corrects
- Empty: Shows validation error

#### 2.2 Name Input Testing
**Tests**:
- Enter valid monster names
- Enter very long names
- Leave field empty
- Enter special characters

**Expected Results**:
- Valid names: Accepted and saved
- Long names: Accepted, responsive layout handles
- Empty: Shows validation error
- Special characters: Accepted

#### 2.3 Tier Dropdown Testing
**Tests**:
- Select each tier option (Mook, Tough, Elite, Boss)
- Verify dropdown options are complete

**Expected Results**:
- All tier options available
- Selection updates immediately
- Combat Kit card formatting changes based on tier

#### 2.4 Role Dropdown Testing
**Tests**:
- Select each role option (all 12 roles)
- Verify dropdown options are complete

**Expected Results**:
- All 12 role options available (Blaster, Brute, Lurker, etc.)
- Selection updates immediately
- Combat Kit card shows selected role

### 3. Tier-Specific Formatting Tests

#### 3.1 Mook Tier Formatting
**Test**: Create monster with Mook tier
**Expected Format**: `{size}d {name} (Mook {role})`
**Example**: `4d Deckhands (Mook Brute)`

#### 3.2 Tough Tier Formatting
**Test**: Create monster with Tough tier
**Expected Format**: `{size} {name} (Tough {role})`
**Example**: `3 Swashbucklers (Tough Marauder)`

#### 3.3 Elite Tier Formatting
**Test**: Create monster with Elite tier
**Expected Format**: `{size}d | {name} (Elite {role})`
**Example**: `4d | Pirate Captain (Elite Overseer)`

#### 3.4 Boss Tier Formatting
**Test**: Create monster with Boss tier
**Expected Format**: `{size}d | {name} (Boss {role})`
**Example**: `6d | Kraken Lord (Boss Predator)`

### 4. Reordering Tests

#### 4.1 Move Up Testing
**Test**: Click up arrow on monsters (not first)
**Expected Result**:
- Monster moves up one position
- Other monsters adjust accordingly
- First monster's up arrow should be disabled

#### 4.2 Move Down Testing
**Test**: Click down arrow on monsters (not last)
**Expected Result**:
- Monster moves down one position
- Other monsters adjust accordingly
- Last monster's down arrow should be disabled

### 5. Validation Testing

#### 5.1 Real-time Validation
**Test**: Enter invalid data in any field
**Expected Result**:
- Field shows red border immediately
- Tooltip shows error message
- Data is not saved until valid

#### 5.2 Form Completion Validation
**Test**: Try to create monster with missing required fields
**Expected Result**:
- Validation errors shown for empty required fields
- Monster not included in Combat Kit card until valid

### 6. Integration Testing

#### 6.1 Combat Kit Card Integration
**Test**: Make changes to monsters and check card display
**Expected Result**:
- Card updates in real-time
- Proper tier-specific formatting applied
- Only monsters with names appear on card

#### 6.2 Form Reset Testing
**Test**: Click "Defaults" button
**Expected Result**:
- Monsters reset to default set
- All fields properly populated
- Card display updates correctly

#### 6.3 Form Clear Testing
**Test**: Click "Clear" button
**Expected Result**:
- All monsters removed
- Empty state message shown
- Card shows no monsters section

### 7. Responsive Design Testing

#### 7.1 Desktop Testing (1200px+)
**Expected**: All fields in single row, proper spacing

#### 7.2 Tablet Testing (768px-1199px)
**Expected**: Fields stack vertically, maintain usability

#### 7.3 Mobile Testing (480px-767px)
**Expected**: Compact layout, touch-friendly buttons

#### 7.4 Small Mobile Testing (<480px)
**Expected**: Minimal layout, all functionality preserved

### 8. Performance Testing

#### 8.1 Large List Testing
**Test**: Add 20+ monsters
**Expected Result**:
- No performance degradation
- Smooth scrolling and interaction
- Memory usage remains reasonable

#### 8.2 Rapid Input Testing
**Test**: Type quickly in input fields
**Expected Result**:
- No focus loss
- Debounced updates work properly
- No lag or stuttering

### 9. Edge Cases Testing

#### 9.1 Empty State Testing
**Test**: Delete all monsters
**Expected Result**:
- Empty state message displayed
- Add button still functional
- No errors in console

#### 9.2 Duplicate Names Testing
**Test**: Create monsters with identical names
**Expected Result**:
- Allowed (no restriction)
- Each monster maintains unique ID
- Display works correctly

#### 9.3 Browser Refresh Testing
**Test**: Refresh page with custom monsters
**Expected Result**:
- Data persists (if implemented)
- OR reverts to defaults gracefully

## Bug Reporting Template

When reporting bugs, please include:

1. **Steps to Reproduce**: Exact steps taken
2. **Expected Behavior**: What should happen
3. **Actual Behavior**: What actually happened
4. **Browser/Device**: Browser version and device type
5. **Console Errors**: Any JavaScript errors
6. **Screenshots**: Visual evidence if applicable

## Test Results Summary

### ✅ Passing Tests
- [ ] Default state loading
- [ ] Add monster functionality
- [ ] Delete monster functionality
- [ ] Size input validation
- [ ] Name input validation
- [ ] Tier dropdown functionality
- [ ] Role dropdown functionality
- [ ] Mook tier formatting
- [ ] Tough tier formatting
- [ ] Elite tier formatting
- [ ] Boss tier formatting
- [ ] Move up functionality
- [ ] Move down functionality
- [ ] Real-time validation
- [ ] Combat Kit card integration
- [ ] Form reset functionality
- [ ] Form clear functionality
- [ ] Desktop responsive design
- [ ] Tablet responsive design
- [ ] Mobile responsive design
- [ ] Performance with large lists
- [ ] Rapid input handling
- [ ] Empty state handling

### ❌ Failing Tests
(Document any failing tests here)

### 🔄 Tests Requiring Manual Verification
- Browser refresh persistence
- Cross-browser compatibility
- Accessibility compliance
- Touch device interaction

## Conclusion

This testing guide ensures comprehensive coverage of the enhanced monsters feature. All tests should pass before considering the feature complete and ready for production use.
