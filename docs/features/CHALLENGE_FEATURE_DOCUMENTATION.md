# Challenge Builder Feature Documentation

## Overview

The Challenge Builder is a core feature of Grimwild Tools that enables Game Masters to create standardized challenge cards for encounters and obstacles. It provides an intuitive interface for defining challenge parameters, traits, moves, and failure conditions, then generates professional-quality cards that can be exported as images.

## Architecture

### Data Structure

Challenges are managed through a state object with the following structure:

```javascript
{
  pool: "6",                    // Challenge dice pool (1-12)
  title: "Goblin Ambush",       // Challenge name/title
  traits: "Sneaky\nCowardly",   // Multi-line trait descriptions
  moves: "Surprise Attack",     // Multi-line move descriptions
  failPool: "3",               // Optional failure dice pool (0-12)
  failDesc: "Goblins scatter"   // Optional failure description
}
```

### Component Architecture

```
ChallengeBuilder (Container)
├── ChallengeForm (Input Interface)
│   ├── Pool Input (Number field, 1-12)
│   ├── Title Input (Text field)
│   ├── Traits Input (Textarea, multi-line)
│   ├── Moves Input (Textarea, multi-line)
│   ├── Fail Pool Input (Number field, 0-12)
│   ├── Fail Description Input (Textarea)
│   └── Action Buttons (Defaults/Clear)
└── ChallengeCard (Display Component)
    ├── Challenge Header (Pool + Title)
    ├── Challenge Circles (Visual indicators)
    ├── Traits Section (Bullet list)
    ├── Moves Section (Bullet list)
    └── Failure Section (Optional)
```

### State Management

The feature uses the `useChallengeState` hook for state management:

```javascript
const {
  pool, setPool,           // Challenge dice pool
  title, setTitle,         // Challenge title
  traits, setTraits,       // Raw trait text
  traitsArr,              // Processed trait array
  moves, setMoves,        // Raw moves text
  movesArr,               // Processed moves array
  failPool, setFailPool,   // Failure dice pool
  failDesc, setFailDesc,   // Failure description
  resetToDefaults,        // Reset to default values
  clearForm              // Clear all fields
} = useChallengeState();
```

## Core Components

### 1. ChallengeBuilder Component

**Location:** `src/components/challenge/ChallengeBuilder.jsx`

**Purpose:** Main container component that orchestrates the challenge creation workflow.

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
const filename = `${sanitize(challengeState.title) || "grimwild-challenge"}.png`;
```

### 2. ChallengeForm Component

**Location:** `src/components/challenge/ChallengeForm.jsx`

**Purpose:** Input interface for challenge parameters with validation and user controls.

**Key Features:**
- **Pool Input:** Number field with 1-12 range validation
- **Title Input:** Text field for challenge name
- **Traits Input:** Textarea for multi-line trait descriptions
- **Moves Input:** Textarea for multi-line move descriptions
- **Fail Pool Input:** Number field with 0-12 range (0 disables failure)
- **Fail Description:** Textarea for failure condition description
- **Action Buttons:** Reset to defaults and clear form functionality

**Validation Logic:**
- Pool values automatically clamped to 1-12 range
- Fail pool values clamped to 0-12 range (0 = no failure)
- Text inputs accept any content (no character limits)

### 3. ChallengeCard Component

**Location:** `src/components/challenge/ChallengeCard.jsx`

**Purpose:** Visual representation of the challenge with professional styling.

**Key Features:**
- **Header Section:** Displays pool size and challenge title with special typography
- **Challenge Circles:** Two static circles as visual indicators
- **Traits Display:** Bullet-point list using TraitBulletList component
- **Moves Display:** Bullet-point list using MovesBulletList component
- **Failure Section:** Conditional display when fail pool > 0 and description exists

**Typography Features:**
- Challenge title uses initcap styling (larger first letters)
- Pool display uses large, bold font
- Failure section uses special ✘ symbol with bold formatting

## Data Processing

### Text to Array Conversion

The system converts multi-line text inputs to arrays for display:

```javascript
// Traits processing
const traitsArr = useMemo(() => {
  return traits
    .split('\n')
    .map(trait => trait.trim())
    .filter(trait => trait.length > 0);
}, [traits]);

// Moves processing  
const movesArr = useMemo(() => {
  return moves
    .split('\n')
    .map(move => move.trim())
    .filter(move => move.length > 0);
}, [moves]);
```

### Default Data

The system includes comprehensive default data for development and testing:

```javascript
const defaultChallengeData = {
  pool: '6',
  title: 'Goblin Ambush',
  traits: 'Sneaky\nCowardly\nPack Tactics',
  moves: 'Surprise Attack\nFlee when outnumbered\nCall for reinforcements',
  failPool: '3',
  failDesc: 'Goblins scatter and regroup'
};
```

## User Interface

### Form Layout

- **Header Row:** Section title with action buttons (Defaults/Clear)
- **Pool and Title Row:** Side-by-side number and text inputs
- **Traits Section:** Large textarea with label
- **Moves Section:** Large textarea with label  
- **Failure Section:** Number input and textarea for optional failure conditions

### Visual Design

- **Consistent Styling:** Matches overall Grimwild Tools aesthetic
- **Responsive Design:** Adapts to mobile and desktop screens
- **Clear Typography:** Uses Libre Baskerville and Cinzel fonts
- **Professional Layout:** Clean, organized form with proper spacing

### Card Styling

- **Paper Background:** Cream-colored background with dark border
- **Header Styling:** Dark background with white text
- **Typography Hierarchy:** Clear distinction between sections
- **Visual Indicators:** Challenge circles and dividers for organization

## Integration Points

### Image Export System

The Challenge Builder integrates with the common ImageActionsWrapper component:

```javascript
<ImageActionsWrapper filename={filename}>
  <ChallengeCard {...challengeProps} />
</ImageActionsWrapper>
```

**Export Features:**
- PNG download with sanitized filename
- Clipboard copy functionality
- High-resolution output (2x scale)
- Transparent background support

### Common Components

**TraitBulletList:** Renders traits as styled bullet points
**MovesBulletList:** Renders moves as styled bullet points with special formatting

## Validation and Error Handling

### Input Validation

- **Pool Range:** Automatically clamps values to 1-12
- **Fail Pool Range:** Automatically clamps values to 0-12
- **Text Inputs:** No character limits, accepts any content
- **Required Fields:** No fields are strictly required (graceful degradation)

### Error Prevention

- **Numeric Inputs:** Prevent invalid characters and out-of-range values
- **State Consistency:** Memoized processing prevents inconsistent states
- **Graceful Fallbacks:** Empty inputs handled without errors

## Performance Considerations

### Optimization Strategies

- **Memoized Processing:** Text-to-array conversion only runs when inputs change
- **Efficient Updates:** Individual state setters prevent unnecessary re-renders
- **Lightweight Components:** Minimal component hierarchy for fast rendering

### Memory Management

- **Clean State:** No memory leaks from event listeners or timers
- **Efficient Arrays:** Filtered arrays remove empty entries
- **Optimized Rendering:** Components only re-render when necessary

## Accessibility

### Features

- **Semantic HTML:** Proper form labels and structure
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader Support:** Descriptive labels and ARIA attributes
- **Focus Management:** Logical tab order through form elements

### Compliance

- **WCAG 2.1 AA:** Meets accessibility standards
- **Color Contrast:** Sufficient contrast ratios
- **Text Scaling:** Responsive to browser zoom
- **Alternative Input:** Works with assistive technologies

## Browser Compatibility

### Supported Browsers

- **Chrome 90+:** Full feature support
- **Firefox 88+:** Full feature support  
- **Safari 14+:** Full feature support
- **Edge 90+:** Full feature support

### Fallbacks

- **Progressive Enhancement:** Core functionality works in older browsers
- **Graceful Degradation:** Advanced features degrade gracefully
- **Polyfill Support:** Uses standard web APIs with fallbacks

## Future Enhancements

### Potential Improvements

- **Template System:** Pre-defined challenge templates
- **Import/Export:** Save and load challenge configurations
- **Validation Rules:** Custom validation for specific challenge types
- **Advanced Formatting:** Rich text support for descriptions
- **Batch Operations:** Create multiple challenges at once

### API Integration

- **Backend Storage:** Save challenges to database
- **Sharing System:** Share challenges with other users
- **Version Control:** Track challenge modifications
- **Collaboration:** Real-time collaborative editing

## Troubleshooting

### Common Issues

**Form Not Updating**
- Cause: State setter not called properly
- Solution: Ensure all inputs use proper onChange handlers

**Export Not Working**
- Cause: ImageActionsWrapper not properly wrapping card
- Solution: Verify component hierarchy and ref passing

**Styling Issues**
- Cause: CSS modules not loading correctly
- Solution: Check import paths and CSS module configuration

**Performance Problems**
- Cause: Unnecessary re-renders from state changes
- Solution: Use memoization and optimize state updates

## Development Guidelines

### Code Standards

- **React Best Practices:** Use hooks, functional components
- **State Management:** Keep state minimal and focused
- **Component Design:** Single responsibility principle
- **Error Handling:** Graceful error handling and user feedback

### Testing Requirements

- **Unit Tests:** Test individual component functionality
- **Integration Tests:** Test form-to-card data flow
- **User Interaction Tests:** Test all user workflows
- **Export Tests:** Verify image generation functionality

### Documentation Standards

- **JSDoc Comments:** Document all functions and components
- **README Updates:** Keep documentation current
- **Code Comments:** Explain complex logic and business rules
- **API Documentation:** Document all public interfaces

## Conclusion

The Challenge Builder provides a robust, user-friendly interface for creating professional challenge cards. Its clean architecture, comprehensive validation, and seamless integration with the export system make it a core component of the Grimwild Tools suite. The feature successfully balances simplicity for basic use cases with flexibility for advanced challenge creation needs.
