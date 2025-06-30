# Fiction Pillar Builder Feature Documentation

## Overview

The Fiction Pillar Builder is a new feature for Grimwild Tools that enables Game Masters to create structured fiction pillar cards for session preparation. Fiction pillars are a method of preparation that lets you create ready-made blocks of fiction, giving you sturdy foundation than pure off-the-cuff improvisation. These "pillars" serve as anchors for improv storytelling that unfolds during a session, helping you maintain consistency and confidence in your game.

## Architecture

### Data Structure

Fiction pillars are managed through a state object with the following structure:

```javascript
{
  title: "Harvest Festival",           // Pillar title/name
  wants: "everyone to leave with full bellies",  // What the pillar wants
  doesntWant: "arguments about winter or toil",  // What the pillar doesn't want
  sight: "vibrant banners, overflowing carts, bonfires at dusk",  // Visual description
  sound: "laughter and music, creak of carts, rustle of leaves",  // Auditory description
  smell: "roasted corn, spiced cider, damp post-harvest soil",    // Olfactory description
  embody: "bite an apple, play a flute, raise a mug"             // Physical actions to embody
}
```

### Component Architecture

```
FictionPillarBuilder (Container)
├── FictionPillarForm (Input Interface - 50% width, left column)
│   ├── Title Input (Text field)
│   ├── WantsDislikesForm (Shared Component)
│   │   ├── Wants Input (Text field)
│   │   └── Doesn't Want Input (Text field)
│   ├── SensoryForm (Shared Component)
│   │   ├── Sight Input (Text field)
│   │   ├── Sound Input (Text field)
│   │   └── Smell Input (Text field)
│   ├── Embody Input (Text field)
│   └── Action Buttons (Defaults/Clear)
└── Preview Container (50% width, right column, centered)
    ├── Builder Title ("Fiction Pillar Builder")
    └── FictionPillarCard (Display Component)
        ├── Pillar Header (Title)
        ├── WantsDislikesDisplay (Shared Component)
        ├── SensoryDisplay (Shared Component)
        ├── Divider
        └── EmbodyDisplay (Hand icon + description)
```

### State Management

The feature uses a new `useFictionPillarState` hook for state management:

```javascript
const {
  title, setTitle,                    // Pillar title
  wants, setWants,                    // Wants description
  doesntWant, setDoesntWant,         // Doesn't want description
  sight, setSight,                    // Visual description
  sound, setSound,                    // Auditory description
  smell, setSmell,                    // Olfactory description
  embody, setEmbody,                  // Physical actions to embody
  resetToDefaults,                    // Reset to default values
  clearForm                          // Clear all fields
} = useFictionPillarState();
```

## Core Components

### 1. FictionPillarBuilder Component

**Location:** `src/components/fictionpillar/FictionPillarBuilder.jsx`

**Purpose:** Main container component that orchestrates the fiction pillar creation workflow.

**Key Features:**
- Integrates form input with card preview
- Handles filename generation for exports
- Provides responsive layout for different screen sizes
- Wraps preview in ImageActionsWrapper for export functionality

**Filename Generation:**
```javascript
const sanitize = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
const filename = `${sanitize(title) || "fiction-pillar"}.png`;
```

### 2. FictionPillarForm Component

**Location:** `src/components/fictionpillar/FictionPillarForm.jsx`

**Purpose:** Input interface for fiction pillar parameters with validation and user controls.

**Key Features:**
- **Title Input:** Text field for pillar name
- **WantsDislikesForm:** Shared component for wants/doesn't want inputs
- **SensoryForm:** Shared component for sight, sound, and smell inputs
- **Embody Input:** Text field for physical actions to embody at the table
- **Action Buttons:** Reset to defaults and clear form functionality

**Validation Logic:**
- Title accepts any content (no character limits)
- Wants/Doesn't Want fields accept any content
- Sensory fields (sight, sound, smell) are required for complete pillars
- Embody field accepts any content (recommended: short action phrases)
- All sensory fields use the same validation as monster sensory information

### 3. FictionPillarCard Component

**Location:** `src/components/fictionpillar/FictionPillarCard.jsx`

**Purpose:** Visual representation of the fiction pillar with professional styling.

**Key Features:**
- **Header Section:** Displays pillar title with special typography
- **WantsDislikesDisplay:** Shared component showing wants/doesn't want in italics
- **SensoryDisplay:** Shared component showing sight, sound, smell with icons
- **Divider:** Visual separator before embody section
- **EmbodyDisplay:** Hand icon with physical action description

**Typography Features:**
- Pillar title uses initcap styling (larger first letters)
- Wants/Doesn't Want sections use same styling as monster wants/dislikes
- Sensory elements use same icon + description format as monster sensory
- Embody section uses hand icon with italicized text
- Consistent spacing and dividers matching monster card layout

## Shared Components

### WantsDislikesForm Component

**Location:** `src/components/common/WantsDislikesForm.jsx`

**Purpose:** Reusable form component for wants/doesn't want inputs

**Props:**
- `wants`: Current wants value
- `setWants`: Wants setter function
- `doesntWant`: Current doesn't want value
- `setDoesntWant`: Doesn't want setter function
- `wantsPlaceholder`: Placeholder text for wants field
- `doesntWantPlaceholder`: Placeholder text for doesn't want field

### WantsDislikesDisplay Component

**Location:** `src/components/common/WantsDislikesDisplay.jsx`

**Purpose:** Reusable display component for wants/doesn't want sections

**Props:**
- `wants`: Wants text to display
- `doesntWant`: Doesn't want text to display

### SensoryForm Component

**Location:** `src/components/common/SensoryForm.jsx`

**Purpose:** Reusable form component for sensory inputs (sight, sound, smell)

**Props:**
- `sight`, `setSight`: Sight value and setter
- `sound`, `setSound`: Sound value and setter
- `smell`, `setSmell`: Smell value and setter
- `required`: Whether fields are required (default: false)

### SensoryDisplay Component

**Location:** `src/components/common/SensoryDisplay.jsx`

**Purpose:** Reusable display component for sensory information

**Props:**
- `sight`: Sight description
- `sound`: Sound description
- `smell`: Smell description

**Features:**
- Uses icons from `public/images/sensories/` directory
- Consistent styling with monster sensory display
- Handles empty values gracefully

### EmbodyDisplay Component

**Location:** `src/components/common/EmbodyDisplay.jsx`

**Purpose:** Reusable display component for embody actions

**Props:**
- `embody`: Embody action description

**Features:**
- Uses hand icon from `public/images/icons/hand.png`
- Italicized text styling consistent with sensory elements
- Appears after a divider for visual separation

## Data Processing

### Default Data

The system includes comprehensive default data based on the Harvest Festival example:

```javascript
const defaultFictionPillarData = {
  title: 'Harvest Festival',
  wants: 'everyone to leave with full bellies',
  doesntWant: 'arguments about winter or toil',
  sight: 'vibrant banners, overflowing carts, bonfires at dusk',
  sound: 'laughter and music, creak of carts, rustle of leaves',
  smell: 'roasted corn, spiced cider, damp post-harvest soil',
  embody: 'bite an apple, play a flute, raise a mug'
};
```

## User Interface

### Form Layout

- **Two-Column Layout:** Form occupies left 50% of screen width, preview occupies right 50%
- **Centered Design:** Both columns are center-locked rather than left/right aligned
- **Header Row:** Section title with action buttons (Defaults/Clear)
- **Title Row:** Text input for pillar name
- **Wants/Doesn't Want:** Shared component with side-by-side text inputs
- **Sensory Information:** Shared component with sight, sound, smell inputs
- **Embody Actions:** Text input for physical actions to embody at the table
- **Builder Title:** "Fiction Pillar Builder" title appears above the preview card

### Visual Design

- **Consistent Styling:** Matches overall Grimwild Tools aesthetic
- **Responsive Design:** Adapts to mobile and desktop screens (stacks vertically on mobile)
- **Clear Typography:** Uses Libre Baskerville and Cinzel fonts
- **Professional Layout:** Clean, organized form with proper spacing
- **Half-Width Columns:** Each column takes exactly 50% of device width on desktop

### Card Styling

- **Paper Background:** Cream-colored background with dark border
- **Header Styling:** Dark background with white text
- **Typography Hierarchy:** Clear distinction between sections
- **Icon Integration:** Uses existing sensory icons from public/images/sensories/
- **Italicized Sections:** Wants/Doesn't Want in italics matching monster styling

## Integration Points

### Tab System Integration

The Fiction Pillar Builder integrates with the existing tab system in `App.jsx`:

```javascript
// Add to tabs array
tabs={["Challenge", "Monsters", "Combat Kit", "Faction Pools", "Fiction Pillars"]}

// Add to tab content rendering
{activeTab === "Fiction Pillars" && <FictionPillarBuilder />}
```

### Image Export System

Integrates with the common ImageActionsWrapper component:

```javascript
<ImageActionsWrapper filename={filename}>
  <FictionPillarCard {...pillarProps} />
</ImageActionsWrapper>
```

**Export Features:**
- PNG download with sanitized filename
- Clipboard copy functionality
- High-resolution output (2x scale)
- Transparent background support

## Implementation Requirements

### New Files to Create

1. **Fiction Pillar Components:**
   - `src/components/fictionpillar/FictionPillarBuilder.jsx`
   - `src/components/fictionpillar/FictionPillarForm.jsx`
   - `src/components/fictionpillar/FictionPillarCard.jsx`

2. **Shared Components:**
   - `src/components/common/WantsDislikesForm.jsx`
   - `src/components/common/WantsDislikesDisplay.jsx`
   - `src/components/common/SensoryForm.jsx`
   - `src/components/common/SensoryDisplay.jsx`
   - `src/components/common/EmbodyDisplay.jsx`

3. **Hooks:**
   - `src/hooks/useFictionPillarState.js`

4. **Styles:**
   - `src/components/fictionpillar/FictionPillarBuilder.module.css`
   - `src/components/fictionpillar/FictionPillarForm.module.css`
   - `src/components/fictionpillar/FictionPillarCard.css`
   - `src/components/common/WantsDislikesForm.module.css`
   - `src/components/common/WantsDislikesDisplay.css`
   - `src/components/common/SensoryForm.module.css`
   - `src/components/common/SensoryDisplay.css`
   - `src/components/common/EmbodyDisplay.css`

5. **Utilities:**
   - `src/utils/fictionPillarUtils.js`

### Modifications Required

1. **App.jsx:** Add Fiction Pillars tab and routing
2. **Monster Components:** Refactor to use shared WantsDislikesForm/Display and SensoryForm/Display components
3. **Package dependencies:** No new dependencies required

### Refactoring Benefits

By creating shared components, this implementation will:
- **Reduce Code Duplication:** Wants/dislikes and sensory logic shared between monsters and fiction pillars
- **Improve Consistency:** Identical styling and behavior across features
- **Simplify Maintenance:** Changes to wants/sensory components affect both features
- **Enable Future Reuse:** Other features can easily adopt the same patterns

## Shared Data Structures

### Wants/Dislikes Structure

Both monsters and fiction pillars use the same data structure for wants/dislikes:

```javascript
{
  wants: "string",        // What the entity wants to achieve
  doesntWant: "string"    // What the entity wants to avoid (called 'dislikes' in monsters)
}
```

### Sensory Information Structure

Both monsters and fiction pillars use the same sensory data structure:

```javascript
{
  sight: "string",        // Visual description
  sound: "string",        // Auditory description
  smell: "string"         // Olfactory description
}
```

### Embody Actions Structure

Fiction pillars include an additional embody field for physical actions:

```javascript
{
  embody: "string"        // Physical actions to embody at the table
}
```

### Icon Mapping

Sensory icons are stored in `public/images/sensories/` and the embody icon in `public/images/icons/`:

```javascript
const SENSORY_ICONS = {
  sight: './images/sensories/sight.png',
  sound: './images/sensories/sound.png',
  smell: './images/sensories/smell.png'
};

const EMBODY_ICON = './images/icons/hand.png';
```

**Note:** The hand icon needs to be created and saved to `public/images/icons/hand.png` to match the existing sensory icon style (sight, sound, smell icons).

## Future Enhancements

### Potential Improvements

- **Template System:** Pre-defined fiction pillar templates for common scenarios
- **Import/Export:** Save and load pillar configurations
- **Sensory Validation:** Ensure balanced distribution across sensory types
- **Rich Text Support:** Enhanced formatting for descriptions
- **Batch Operations:** Create multiple pillars for campaign preparation

### Integration Opportunities

- **Campaign Management:** Link pillars to specific sessions or scenarios
- **Cross-Reference System:** Connect pillars to challenges and monsters
- **Sharing System:** Share pillars with other Game Masters
- **Version Control:** Track pillar modifications over time

## Conclusion

The Fiction Pillar Builder extends Grimwild Tools with a powerful session preparation feature that supports the fiction pillar methodology. By leveraging shared components for wants/dislikes and sensory information, it maintains consistency with the existing monster system while providing Game Masters with structured tools for creating vivid, consistent fictional anchors that enhance improvisation and maintain narrative coherence during gameplay.

The implementation emphasizes code reuse and consistency, creating a foundation for future features that may also need wants/dislikes or sensory information components. This approach reduces maintenance overhead while ensuring a cohesive user experience across all Grimwild Tools features.
