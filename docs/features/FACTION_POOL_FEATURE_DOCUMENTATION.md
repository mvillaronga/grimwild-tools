# Faction/Campaign Pool Builder - Feature Documentation

## Overview

The Faction/Campaign Pool Builder is a specialized editor for creating faction and campaign pool cards used in Grimwild tabletop gaming. These cards represent ongoing narrative elements, political entities, and campaign-level resources that drive story progression and provide context for adventures.

## Purpose

Faction/Campaign Pools serve as:
- **Narrative Anchors:** Central story elements that persist across sessions
- **Resource Tracking:** Available assets and capabilities for factions
- **Goal Management:** Structured objectives with dice pool mechanics
- **Campaign Context:** Background elements that inform adventure design

## Core Components

### 1. Title
- **Display:** Rendered in title bar with standard card header styling
- **Format:** Uses Cinzel font, uppercase, with larger first letters (initcap styling)
- **Input:** Single text field for faction/campaign name
- **Examples:** "Village of Elit", "Twisted Forest", "Gorge Goblins", "War in the East"

### 2. Resources (Optional)
- **Purpose:** Narrative elements, assets, or capabilities available to the faction
- **Input Method:** Standard textarea with line-by-line entry
- **Display Format:** Each line becomes a separate resource item
- **Styling:** Italicized text similar to features in Combat Kit cards
- **Examples:** 
  - "Elders (wise, cautious)"
  - "Fire archers"
  - "Growing eldritch roots"
  - "Ancient spirits"

### 3. Goals (Required)
- **Purpose:** Structured objectives with dice pool mechanics
- **Input Method:** List-based entry system similar to Combat Kit threats
- **Components:**
  - **Pool Size:** Numeric input (1-12 dice)
  - **Description:** Text description of the goal
- **Display Format:** 
  - Pool notation: Bold dice notation (e.g., "4d", "6d")
  - Description: Italicized and bold text with initial caps for all words
- **Examples:**
  - "4d Ask Baron for Help"
  - "8d Build a Wall"
  - "4d Grow Forth"
  - "6d Lure in Outsiders"

## Technical Architecture

### Component Structure
```
FactionPoolBuilder (Container)
├── FactionPoolForm (Input Interface)
│   ├── Title Input (Text field)
│   ├── Resources Input (Textarea - optional)
│   ├── GoalsList (Structured Management)
│   │   ├── GoalItem (Individual Entry)
│   │   │   ├── Pool Input (Number field 1-12)
│   │   │   ├── Description Input (Text field)
│   │   │   └── Action Buttons (Move/Delete)
│   │   └── Add Goal Button
│   └── Action Controls (Reset/Clear buttons)
└── FactionPoolCard (Display Component)
    ├── Header (Title with styling)
    ├── Goals Section (Pool + Description)
    ├── Divider (Visual separator)
    └── Resources Section (Optional)
```

### Data Structure
```javascript
{
  title: "Village of Elit",
  goals: [
    {
      id: "goal_123",
      pool: "4",
      description: "Ask Baron for Help"
    },
    {
      id: "goal_456", 
      pool: "8",
      description: "Build a Wall"
    }
  ],
  resources: [
    "Elders (wise, cautious)",
    "Fire archers"
  ]
}
```

## User Interface Specifications

### Form Layout
- **Header Row:** Section title with standard action buttons (Defaults/Clear)
- **Title Input:** Single text field for faction/campaign name
- **Goals Section:** 
  - List-based management interface
  - Add/edit/delete/reorder functionality
  - Pool input (number) + description input (text) per goal
  - Empty state display when no goals exist
- **Resources Section:**
  - Optional textarea input
  - Line-by-line entry format
  - Can be left empty

### Goals List Management
- **Entry Interface:** Similar to Combat Kit threats list
- **Add Button:** Single "Add Goal" button at bottom of list
- **Goal Items:** Always in edit state (no display-then-edit mode)
- **Validation:** Pool size 1-12, description required
- **Reordering:** Move up/down buttons for each goal
- **Empty State:** Informative message when no goals exist

### Visual Design Standards
- **Consistent Styling:** Matches Grimwild Tools aesthetic
- **Typography:** Libre Baskerville body, Cinzel headers
- **Color Scheme:** Standard paper/ink theme
- **Responsive Design:** Mobile and desktop compatibility
- **Form Controls:** Standard input styling with focus states

## Display Card Specifications

### Layout Structure
1. **Header:** Title with standard card header styling
2. **Goals Section:** Pool notation + descriptions
3. **Divider:** Visual separator between sections
4. **Resources Section:** Italicized resource list (if present)

### Styling Requirements

#### Title
- **Font:** Cinzel, uppercase, bold
- **Size:** 1.25rem
- **Color:** White text on dark background
- **Format:** Initcap styling (larger first letters)

#### Goals Display
- **Pool Notation:** Bold, larger font (1.1em)
- **Description:** Italicized, bold, initial caps for all words
- **Layout:** Pool left-aligned, description follows
- **Spacing:** 0.3rem margin between goal lines

#### Divider
- **Style:** 2px solid line, 30% opacity
- **Margins:** 0.35rem vertical, 1.5rem horizontal
- **Position:** Between goals and resources sections

#### Resources Display
- **Font Style:** Italicized (similar to Combat Kit features)
- **Layout:** Each resource on separate line
- **Spacing:** Standard line height (1.4)
- **Visibility:** Only shown if resources exist

### Export Functionality
- **Image Export:** PNG format using html2canvas
- **Filename:** Based on faction/campaign title
- **Quality:** 2x scale for high resolution
- **Clipboard:** Copy-to-clipboard support

## Integration Requirements

### Tab Integration
- **New Tab:** "Faction Pools" added to main application tabs
- **Position:** After existing tabs (Challenge, Monster, Combat Kit)
- **Icon/Label:** Standard tab styling with appropriate label

### State Management
- **Local State:** Form data persistence during session
- **Initial Load:** Form loads with default sample data populated
- **Reset Functionality:** "Defaults" button to restore sample data
- **Clear Functionality:** "Clear" button to reset form to empty state
- **Validation:** Real-time input validation and error display

### Default Data
Sample faction pool that loads automatically when form first opens:
```javascript
{
  title: "Village of Elit",
  goals: [
    { pool: "4", description: "Ask Baron for Help" },
    { pool: "8", description: "Build a Wall" }
  ],
  resources: [
    "Elders (wise, cautious)",
    "Fire archers"
  ]
}
```

## Technical Implementation Notes

### Component Files
- `src/components/factionpool/FactionPoolBuilder.jsx` - Main container with default data initialization
- `src/components/factionpool/FactionPoolForm.jsx` - Input interface
- `src/components/factionpool/FactionPoolCard.jsx` - Display component
- `src/components/factionpool/GoalsList.jsx` - Goals management
- `src/components/factionpool/GoalItem.jsx` - Individual goal entry
- `src/utils/factionPoolUtils.js` - Utility functions and default data

### Styling Files
- `src/components/factionpool/FactionPoolBuilder.module.css`
- `src/components/factionpool/FactionPoolForm.module.css`
- `src/components/factionpool/FactionPoolCard.module.css`
- `src/components/factionpool/GoalsList.module.css`

### Key Features
- **Default Data Loading:** Form automatically populates with sample data on first load
- **Structured Data:** Goals as objects, resources as array
- **List Management:** Add/edit/delete/reorder for goals
- **Optional Resources:** Can be empty without affecting display
- **Export Integration:** Standard image export functionality
- **Responsive Design:** Mobile-friendly interface
- **Validation:** Input validation with error states
- **Accessibility:** Proper labels and keyboard navigation

## Testing Considerations

### Core Functionality
- Default data loading on component initialization
- Title input and display formatting
- Goals list management (add/edit/delete/reorder)
- Resources textarea handling (including empty state)
- Card display with proper styling
- Image export functionality

### Edge Cases
- Empty resources section handling
- Single vs multiple goals display
- Long titles and descriptions
- Mobile responsive behavior
- Export with special characters in title

### Integration Testing
- Tab switching functionality
- State persistence during session
- Reset and clear operations
- Cross-browser compatibility
