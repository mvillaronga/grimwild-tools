# Faction/Campaign Pool Builder - Testing Guide

## Overview

This document provides comprehensive testing procedures for the Faction/Campaign Pool Builder feature, including form management, goals system, resources handling, and card generation functionality.

## Feature Summary

The Faction/Campaign Pool Builder enables creation of faction and campaign reference cards with:
- Faction/campaign titles with professional styling
- Structured goals system with dice pool mechanics
- Optional resources section with italicized display
- Conditional visual dividers (only shown when resources exist)
- Professional faction pool card export
- Default data loading for immediate usability
- Half-width centered column layout with builder titles

## Test Plan

### 1. Initial Load and Default Data Testing

#### Test 1.1: Default Data Population
**Objective:** Verify form loads with sample data automatically

**Steps:**
1. Navigate to Faction Pools tab
2. Observe form state on initial load

**Expected Results:**
- Title field contains "Village of Elit"
- Goals list shows 2 pre-populated goals:
  - Goal 1: Pool "4", Description "Ask Baron for Help"
  - Goal 2: Pool "8", Description "Build a Wall"
- Resources textarea contains:
  - "Elders (wise, cautious)"
  - "Fire archers"
- Card preview displays formatted content immediately

#### Test 1.2: Tab Navigation Persistence
**Objective:** Verify data persists when switching tabs

**Steps:**
1. Load Faction Pools tab (verify default data loads)
2. Switch to another tab (Challenge, Monster, etc.)
3. Return to Faction Pools tab

**Expected Results:**
- Form retains all previously entered/default data
- Card preview remains consistent
- No data loss during tab switching

### 2. Title Management Testing

#### Test 2.1: Title Input and Display
**Objective:** Verify title input functionality and card formatting

**Steps:**
1. Clear title field
2. Enter "Twisted Forest"
3. Observe card preview

**Expected Results:**
- Title appears in card header with proper styling
- Uses Cinzel font, uppercase formatting
- Initcap styling (larger first letters) applied
- White text on dark background

#### Test 2.2: Long Title Handling
**Objective:** Test title display with extended text

**Steps:**
1. Enter very long title: "The Ancient Brotherhood of the Crimson Dawn Alliance"
2. Observe card display and responsiveness

**Expected Results:**
- Title wraps appropriately in card header
- Maintains readability on mobile devices
- No text overflow or layout breaking

### 3. Goals System Testing

#### Test 3.1: Goals List Management
**Objective:** Verify goals CRUD operations

**Steps:**
1. Click "Add Goal" button
2. Enter pool "6" and description "Recruit New Members"
3. Verify goal appears in list and card
4. Test reordering with move up/down buttons
5. Delete a goal using delete button

**Expected Results:**
- New goals added to bottom of list
- Goals display in card with proper formatting
- Reordering works correctly
- Deletion removes goal from list and card
- List updates immediately

#### Test 3.2: Pool Input Validation
**Objective:** Test pool size validation and constraints

**Steps:**
1. Add new goal
2. Test pool inputs: 0, 1, 12, 13, -1, "abc"
3. Observe validation behavior

**Expected Results:**
- Pool accepts values 1-12
- Rejects values outside range
- Shows validation errors for invalid input
- Non-numeric input handled gracefully
- Default value "4" when field is empty

#### Test 3.3: Goal Description Formatting
**Objective:** Verify goal description display formatting

**Steps:**
1. Add goal with description "ask baron for help"
2. Add goal with description "BUILD A WALL"
3. Observe card display formatting

**Expected Results:**
- Descriptions display with initial caps: "Ask Baron For Help"
- Text is italicized and bold
- Consistent formatting regardless of input case
- Pool notation appears bold before description

#### Test 3.4: Empty Goals State
**Objective:** Test behavior with no goals

**Steps:**
1. Delete all goals from list
2. Observe empty state display
3. Check card preview

**Expected Results:**
- Empty state message appears in goals list
- "Add Goal" button remains available
- Card shows appropriate empty goals section
- No JavaScript errors occur

### 4. Resources Section Testing

#### Test 4.1: Resources Input and Display
**Objective:** Verify resources textarea functionality

**Steps:**
1. Clear resources textarea
2. Enter multi-line resources:
   ```
   Ancient spirits
   Growing eldritch roots
   Mysterious fog
   ```
3. Observe card display

**Expected Results:**
- Each line appears as separate resource in card
- Resources display in italics
- Proper line spacing maintained
- Resources appear below divider

#### Test 4.2: Empty Resources Handling
**Objective:** Test optional resources behavior and conditional divider

**Steps:**
1. Clear all text from resources textarea
2. Observe card display

**Expected Results:**
- Resources section completely hidden in card when empty
- Divider between resources and goals is also hidden when no resources exist
- Goals section appears directly after header with no divider
- No empty resource lines displayed
- Form remains functional

#### Test 4.3: Resources with Special Characters
**Objective:** Test resources with formatting characters

**Steps:**
1. Enter resources with parentheses, commas, quotes:
   ```
   Elders (wise, "cautious")
   Fire archers & scouts
   Gold reserves (500+ coins)
   ```

**Expected Results:**
- Special characters display correctly
- No formatting issues in card
- Italics applied to entire resource text
- No parsing errors

#### Test 4.4: Conditional Divider Behavior
**Objective:** Test divider visibility based on resources presence

**Steps:**
1. Start with empty resources textarea
2. Verify no divider appears in card
3. Add resources: "Ancient spirits"
4. Verify divider appears between resources and goals
5. Clear resources again
6. Verify divider disappears

**Expected Results:**
- Divider only appears when resources exist
- Divider disappears immediately when resources are cleared
- Goals section positioning adjusts appropriately
- No visual artifacts or spacing issues

### 5. Card Display and Styling Testing

#### Test 5.1: Visual Layout Verification
**Objective:** Confirm card matches design specifications

**Steps:**
1. Load default data
2. Inspect card visual elements

**Expected Results:**
- Header: Dark background, white title text
- Goals: Pool notation bold, descriptions italic/bold with initial caps
- Divider: 2px line, 30% opacity between sections
- Resources: Italicized text below divider
- Overall: Matches Grimwild Tools aesthetic

#### Test 5.2: Responsive Design Testing
**Objective:** Verify mobile and desktop compatibility

**Steps:**
1. Test on desktop browser (1920x1080)
2. Test on tablet simulation (768px width)
3. Test on mobile simulation (375px width)

**Expected Results:**
- Card remains readable at all screen sizes
- Text doesn't overflow containers
- Form controls remain accessible
- Layout adapts appropriately

### 6. Action Controls Testing

#### Test 6.1: Reset to Defaults Functionality
**Objective:** Verify "Defaults" button behavior

**Steps:**
1. Modify title, goals, and resources
2. Click "Defaults" button
3. Observe form state

**Expected Results:**
- All fields reset to original default values
- Goals list restored to original 2 goals
- Resources textarea restored to default content
- Card preview updates immediately

#### Test 6.2: Clear Form Functionality
**Objective:** Verify "Clear" button behavior

**Steps:**
1. Load form with default data
2. Click "Clear" button
3. Observe form state

**Expected Results:**
- Title field cleared
- All goals removed from list
- Resources textarea cleared
- Card shows empty state appropriately
- Form ready for new input

### 7. Export Functionality Testing

#### Test 7.1: Image Export
**Objective:** Test PNG export functionality

**Steps:**
1. Create faction pool with custom data
2. Click export/download button
3. Verify downloaded file

**Expected Results:**
- PNG file downloads successfully
- Filename based on faction title
- High resolution (2x scale) image
- All card elements visible and properly formatted

#### Test 7.2: Copy to Clipboard
**Objective:** Test clipboard functionality

**Steps:**
1. Create faction pool
2. Use copy to clipboard function
3. Paste into image editor

**Expected Results:**
- Image copies to clipboard successfully
- Maintains quality and formatting
- All elements visible when pasted
- Works across different browsers

### 8. Integration Testing

#### Test 8.1: Tab Integration
**Objective:** Verify integration with main application

**Steps:**
1. Navigate between all tabs
2. Verify Faction Pools tab appears correctly
3. Test tab switching performance

**Expected Results:**
- Faction Pools tab appears in correct position
- Tab styling matches other tabs
- Smooth transitions between tabs
- No performance issues

#### Test 8.2: Cross-Browser Compatibility
**Objective:** Test across different browsers

**Steps:**
1. Test in Chrome, Firefox, Safari, Edge
2. Verify all functionality works consistently

**Expected Results:**
- Consistent behavior across browsers
- Export functionality works in all browsers
- Styling appears identical
- No browser-specific errors

### 9. Error Handling and Edge Cases

#### Test 9.1: Invalid Input Handling
**Objective:** Test form resilience with invalid data

**Steps:**
1. Enter extremely long titles (500+ characters)
2. Enter special characters in all fields
3. Test rapid clicking of add/delete buttons

**Expected Results:**
- Form handles long input gracefully
- Special characters don't break functionality
- No crashes from rapid user interactions
- Appropriate validation messages shown

#### Test 9.2: Network/Performance Testing
**Objective:** Test under various conditions

**Steps:**
1. Test with slow network connection
2. Test with multiple tabs open
3. Test after extended browser session

**Expected Results:**
- Form remains responsive under load
- No memory leaks during extended use
- Consistent performance across sessions
- Export functionality works regardless of network speed

## Test Data Sets

### Minimal Test Case
```javascript
{
  title: "Test Faction",
  goals: [
    { pool: "1", description: "Simple Goal" }
  ],
  resources: []
}
```

### Complex Test Case
```javascript
{
  title: "The Ancient Brotherhood of Mystic Arts & Sciences",
  goals: [
    { pool: "12", description: "Unlock the Forbidden Tome of Eternal Wisdom" },
    { pool: "8", description: "Recruit the Last Dragon Rider" },
    { pool: "6", description: "Establish Secret Base in Crystal Caves" },
    { pool: "4", description: "Gather Intelligence on Royal Court" }
  ],
  resources: [
    "Ancient scrolls & mystical artifacts",
    "Network of spies (throughout the kingdom)",
    "Hidden treasury (10,000+ gold pieces)",
    "Trained assassins & battle mages",
    "Secret passages under the capital"
  ]
}
```

## Success Criteria

- All tests pass without errors
- Form loads with default data immediately
- Goals and resources display with correct formatting
- Export functionality works reliably
- Responsive design functions across devices
- Integration with main application is seamless
- Performance remains acceptable under normal use
