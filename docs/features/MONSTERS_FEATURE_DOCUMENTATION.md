# Enhanced Monsters Feature Documentation

## Overview

The Enhanced Monsters Feature transforms the Combat Kit Builder's monster management from a simple text-based system to a sophisticated, structured interface that provides better user experience, validation, and formatting consistency.

## Architecture

### Data Structure

Monsters are now stored as an array of objects instead of plain text:

```javascript
{
  id: "monster_1234567890_abc",    // Unique identifier
  size: "4",                       // Pool/count size (1-12)
  name: "Deckhands",              // Monster description
  tier: "Mook",                   // Tier level (Mook/Tough/Elite/Boss)
  role: "Brute"                   // Combat role (12 options)
}
```

### Component Architecture

```
MonstersList (Container)
├── MonsterItem (Individual Entry)
│   ├── Size Input (Number field)
│   ├── Name Input (Text field)
│   ├── TierDropdown (4 options)
│   ├── RoleDropdown (12 options)
│   └── Action Buttons (Move/Delete)
└── Add Monster Button
```

### State Management

The feature integrates with the existing `useCombatKitState` hook:

```javascript
const {
  monsters,           // Array of monster objects
  updateMonsters      // Function to update monsters array
} = useCombatKitState();
```

## Core Components

### 1. MonstersList Component

**Location**: `src/components/combatkit/MonstersList.jsx`

**Purpose**: Main container that manages the list of monsters

**Key Features**:
- Displays all monsters in editable form
- Handles add/delete/reorder operations
- Shows empty state when no monsters exist
- Provides "Add Monster" button at bottom

**Props**:
- `monsters`: Array of monster objects
- `onUpdateMonsters`: Callback for monster updates

### 2. MonsterItem Component

**Location**: `src/components/combatkit/MonsterItem.jsx`

**Purpose**: Individual monster entry with all input fields

**Key Features**:
- Always-in-edit state (no display/edit toggle)
- Real-time validation with visual feedback
- Debounced updates to prevent focus loss
- Move up/down and delete functionality

**Props**:
- `monster`: Monster object
- `onUpdate`: Update callback
- `onDelete`: Delete callback
- `onMoveUp`/`onMoveDown`: Reorder callbacks
- `canMoveUp`/`canMoveDown`: Button state flags

### 3. Dropdown Components

**TierDropdown** (`src/components/combatkit/TierDropdown.jsx`):
- 4 options: Mook, Tough, Elite, Boss
- Determines display formatting rules

**RoleDropdown** (`src/components/combatkit/RoleDropdown.jsx`):
- 12 options: Blaster, Brute, Lurker, Marauder, Marksman, Overseer, Predator, Protector, Skirmisher, Swarmer, Tactician, Trickster
- Defines monster combat specialization

## Utility Functions

### Location: `src/utils/monsterUtils.js`

### Key Functions:

#### `createMonster(size, name, tier, role)`
Creates a new monster object with validation

#### `validateMonster(monster)`
Returns validation result with errors array

#### `formatMonsterForDisplay(monster)`
Applies tier-specific formatting rules

#### `convertMonstersToText(monsters)`
Converts monster array to text for Combat Kit card display

#### `reorderMonsters(monsters, fromIndex, toIndex)`
Handles monster reordering logic

## Tier-Specific Formatting

The system applies different formatting rules based on monster tier:

### Mook Tier
**Format**: `{size}d {name} ({tier} {role})`
**Example**: `4d Deckhands (Mook Brute)`
**Usage**: Large groups of weak enemies

### Tough Tier  
**Format**: `{size} {name} ({tier} {role})`
**Example**: `3 Swashbucklers (Tough Marauder)`
**Usage**: Individual stronger enemies (no dice pool)

### Elite Tier
**Format**: `{size}d | {name} ({tier} {role})`
**Example**: `4d | Pirate Captain (Elite Overseer)`
**Usage**: Special enemies with pipe separator

### Boss Tier
**Format**: `{size}d | {name} ({tier} {role})`
**Example**: `6d | Kraken Lord (Boss Predator)`
**Usage**: Major antagonists with pipe separator

## Validation System

### Real-time Validation
- Validates fields as user types
- Shows visual feedback (red borders)
- Displays error tooltips
- Prevents invalid data submission

### Validation Rules
- **Size**: Required, numeric, range 1-12
- **Name**: Required, non-empty string
- **Tier**: Required, must be valid tier option
- **Role**: Required, must be valid role option

### Error Handling
- Field-level validation with immediate feedback
- Form-level validation on blur events
- Graceful error recovery
- User-friendly error messages

## Integration Points

### Combat Kit Form
- Replaces previous textarea with MonstersList component
- Maintains form reset/clear functionality
- Preserves existing styling patterns

### Combat Kit Card
- Renders monsters using `convertMonstersToText()`
- Applies tier-specific formatting
- Maintains backward compatibility
- Only shows monsters with names

### State Management
- Direct array manipulation (no text parsing)
- Immediate updates with debouncing
- Maintains data integrity
- Supports undo/redo operations

## Styling and Responsive Design

### CSS Modules
- `MonsterItem.module.css`: Individual monster styling
- `MonstersList.module.css`: Container and layout
- `Dropdown.module.css`: Shared dropdown styling

### Responsive Breakpoints
- **Desktop (1200px+)**: Horizontal layout, all fields in row
- **Tablet (768px-1199px)**: Vertical stacking, maintained spacing
- **Mobile (480px-767px)**: Compact layout, touch-friendly
- **Small Mobile (<480px)**: Minimal layout, preserved functionality

### Visual Design
- Consistent with existing Combat Kit styling
- Hover effects and transitions
- Error state styling (red borders)
- Loading and empty states

## Performance Considerations

### Optimization Strategies
- Debounced input updates (300ms delay)
- Memoized validation functions
- Efficient array operations
- Minimal re-renders

### Memory Management
- Unique IDs prevent memory leaks
- Proper cleanup of event listeners
- Optimized component lifecycle

## Accessibility

### Features
- Proper ARIA labels on dropdowns
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Error announcements

### Compliance
- WCAG 2.1 AA standards
- Semantic HTML structure
- Proper color contrast
- Alternative text for icons

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- Graceful degradation for older browsers
- Progressive enhancement approach
- Polyfills for missing features

## Future Enhancements

### Potential Improvements
- Drag-and-drop reordering
- Bulk operations (select multiple)
- Import/export functionality
- Monster templates/presets
- Advanced filtering/sorting
- Undo/redo system

### API Integration
- Save/load from backend
- Real-time collaboration
- Version control
- Backup/restore

## Troubleshooting

### Common Issues

**Focus Loss While Typing**
- Cause: Immediate updates triggering re-renders
- Solution: Debounced updates implemented

**Validation Errors Not Clearing**
- Cause: State not properly reset
- Solution: Validation state management improved

**Responsive Layout Issues**
- Cause: Fixed widths in CSS
- Solution: Flexible layouts with proper breakpoints

**Performance with Large Lists**
- Cause: Inefficient rendering
- Solution: Optimized component updates

## Development Guidelines

### Code Standards
- Use TypeScript for type safety (future)
- Follow React best practices
- Implement proper error boundaries
- Write comprehensive tests

### Testing Requirements
- Unit tests for utility functions
- Integration tests for components
- E2E tests for user workflows
- Performance testing for large datasets

### Documentation Standards
- JSDoc comments for all functions
- README updates for new features
- API documentation for public interfaces
- User guide updates

## Conclusion

The Enhanced Monsters Feature provides a robust, user-friendly interface for managing Combat Kit monsters while maintaining backward compatibility and following modern web development best practices. The structured approach eliminates parsing errors, improves data validation, and enhances the overall user experience.
