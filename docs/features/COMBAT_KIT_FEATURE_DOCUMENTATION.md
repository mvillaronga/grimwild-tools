# Combat Kit Builder Feature Documentation

## Overview

The Combat Kit Builder is a comprehensive feature that enables Game Masters to create dynamic combat scenarios by combining environmental features, structured threats, and tier-based monsters. It provides an advanced interface for building complete combat encounters that can be exported as professional reference cards.

## Architecture

### Data Structure

Combat Kits are managed through a complex state object with multiple sub-systems:

```javascript
{
  title: "Boarding a Pirate Ship",     // Scenario title
  features: "Stormy waters, cramped decks", // Environmental features
  threats: [                           // Structured threat objects
    {
      id: "threat_123",
      type: "pool",
      pool: "4",
      name: "Waves Crashing"
    },
    {
      id: "threat_456", 
      type: "hazard",
      name: "Kraken Tentacles"
    }
  ],
  monsters: [                          // Structured monster objects
    {
      id: "monster_789",
      size: "4",
      name: "Deckhands",
      tier: "Mook",
      role: "Brute"
    }
  ]
}
```

### Component Architecture

```
CombatKitBuilder (Container)
├── CombatKitForm (Input Interface)
│   ├── Title Input (Text field)
│   ├── Features Input (Text field)
│   ├── ThreatsList (Structured Management)
│   │   ├── ThreatItem (Individual Entry)
│   │   │   ├── Pool Input (for pool threats)
│   │   │   ├── Name Input (for all threats)
│   │   │   └── Action Buttons (Move/Delete)
│   │   └── Add Buttons (Pool/Hazard)
│   └── MonstersList (Enhanced Management)
│       ├── MonsterItem (Individual Entry)
│       │   ├── Size Input (Number field)
│       │   ├── Name Input (Text field)
│       │   ├── TierDropdown (4 options)
│       │   ├── RoleDropdown (12 options)
│       │   └── Action Buttons (Move/Delete)
│       └── Add Monster Button
└── CombatKitCard (Display Component)
    ├── Header (Title with crossed swords)
    ├── Features Section (Comma-delimited)
    ├── Threats Section (Formatted display)
    └── Monsters Section (Tier-based formatting)
```

### State Management

The feature uses the `useCombatKitState` hook with integrated sub-systems:

```javascript
const {
  combatKit,              // Main combat kit object
  updateCombatKit,        // Update main properties
  resetToDefaults,        // Reset to default scenario
  clearForm,             // Clear all fields
  threats,               // Direct threats array access
  updateThreats,         // Update threats array
  monsters,              // Direct monsters array access
  updateMonsters         // Update monsters array
} = useCombatKitState();
```

## Core Components

### 1. CombatKitBuilder Component

**Location:** `src/components/combatkit/CombatKitBuilder.jsx`

**Purpose:** Main container that orchestrates the complete combat kit creation workflow.

**Key Features:**
- Integrates multiple sub-systems (threats, monsters, features)
- Handles complex state management across components
- Provides responsive layout for form and preview
- Generates dynamic filenames based on scenario title

### 2. CombatKitForm Component

**Location:** `src/components/combatkit/CombatKitForm.jsx`

**Purpose:** Primary input interface that coordinates all combat kit elements.

**Key Features:**
- **Title Input:** Scenario name with crossed swords icon
- **Features Input:** Comma-separated environmental elements
- **Threats Management:** Integrated ThreatsList component
- **Monsters Management:** Integrated MonstersList component
- **Action Controls:** Reset to defaults and clear form functionality

### 3. ThreatsList Component

**Location:** `src/components/combatkit/ThreatsList.jsx`

**Purpose:** Advanced threat management system with dual threat types.

**Key Features:**
- **Pool Threats:** Dice-based threats with configurable pool size
- **Hazard Threats:** Suspense-based threats with automatic circle notation
- **Dual Add System:** Separate buttons for different threat types (🎲/⚠️)
- **Interactive Management:** Add, edit, delete, and reorder functionality
- **Empty State Handling:** Informative display when no threats exist

**Threat Types:**
```javascript
// Pool Threat
{
  id: "threat_123",
  type: "pool", 
  pool: "4",           // Dice pool size (1-12)
  name: "Waves Crashing"
}

// Hazard Threat  
{
  id: "threat_456",
  type: "hazard",
  name: "Kraken Tentacles"  // Auto-displays with ○○
}
```

### 4. MonstersList Component

**Location:** `src/components/combatkit/MonstersList.jsx`

**Purpose:** Enhanced monster management system with tier-based formatting.

**Key Features:**
- **Structured Data:** Individual monster objects with validation
- **Tier System:** Four tiers (Mook, Tough, Elite, Boss) with specific formatting
- **Role System:** Twelve combat roles for tactical variety
- **Interactive Management:** Add, edit, delete, and reorder functionality
- **Display Formatting:** Automatic formatting based on tier rules

**Monster Tiers and Formatting:**
- **Mook/Tough Pools:** "4d Deckhands (Mook Brute)"
- **Individual Toughs:** "1 Captain (Tough Tactician)"  
- **Elite/Boss:** "3d | Elite Guard (Elite Protector)"

### 5. CombatKitCard Component

**Location:** `src/components/combatkit/CombatKitCard.jsx`

**Purpose:** Professional display component with complex formatting logic.

**Key Features:**
- **Header Design:** Title with crossed swords icon positioning
- **Features Display:** Comma-delimited environmental elements
- **Threats Rendering:** Automatic formatting for pool/hazard types
- **Monsters Rendering:** Tier-based formatting with proper notation
- **Visual Hierarchy:** Clear section separation with proper styling

## Threats Management System

### Threat Creation

```javascript
// Pool threat creation
const createPoolThreat = (pool = '4', name = '') => {
  return {
    id: generateThreatId(),
    type: 'pool',
    pool: pool.toString(),
    name: name.trim()
  };
};

// Hazard threat creation
const createHazardThreat = (name = '') => {
  return {
    id: generateThreatId(), 
    type: 'hazard',
    name: name.trim()
  };
};
```

### Display Conversion

The system converts structured threats to display format:

```javascript
const convertThreatsToText = (threats) => {
  return threats
    .filter(threat => threat.name && threat.name.trim())
    .map(threat => {
      if (threat.type === 'pool') {
        return `${threat.pool}d ${threat.name.trim()}`;
      } else if (threat.type === 'hazard') {
        return `○○ ${threat.name.trim()}`;
      }
      return threat.name.trim();
    })
    .join('\n');
};
```

### Threat Operations

- **Add:** Create new threats with type-specific buttons
- **Edit:** In-place editing of pool size and names
- **Delete:** Remove threats with confirmation
- **Reorder:** Move threats up/down in list
- **Validation:** Ensure pool values stay within 1-12 range

## Monsters Management System

### Monster Creation

```javascript
const createMonster = (size, name, tier, role) => {
  return {
    id: generateMonsterId(),
    size: size.toString(),
    name: name.trim(),
    tier: tier,
    role: role
  };
};
```

### Tier-Based Formatting

```javascript
const formatMonsterForDisplay = (monster) => {
  const { size, name, tier, role } = monster;
  const sizeNum = parseInt(size);
  
  if (tier === 'Mook' || (tier === 'Tough' && sizeNum > 1)) {
    return `${size}d ${name} (${tier} ${role})`;
  } else if (tier === 'Tough' && sizeNum === 1) {
    return `${size} ${name} (${tier} ${role})`;
  } else if (tier === 'Elite' || tier === 'Boss') {
    return `${size}d | ${name} (${tier} ${role})`;
  }
  return `${size}d ${name} (${tier} ${role})`;
};
```

### Available Options

**Tiers:** Mook, Tough, Elite, Boss
**Roles:** Blaster, Brute, Lurker, Marauder, Marksman, Overseer, Predator, Protector, Skirmisher, Swarmer, Tactician, Trickster

## Integration with Enhanced Monsters

The Combat Kit Builder seamlessly integrates with the Enhanced Monsters Feature:

- **Shared Components:** Uses same MonsterItem and validation logic
- **Consistent Formatting:** Maintains tier-based display rules
- **State Management:** Direct array manipulation without text parsing
- **Backward Compatibility:** Supports legacy text-based threat format

## User Interface

### Form Organization

- **Header Section:** Title and action buttons
- **Basic Info:** Scenario title and environmental features
- **Threats Section:** Expandable list with dual add buttons
- **Monsters Section:** Expandable list with comprehensive management

### Visual Design

- **Consistent Styling:** Matches Grimwild Tools aesthetic
- **Responsive Layout:** Adapts to different screen sizes
- **Clear Hierarchy:** Logical organization of complex information
- **Interactive Elements:** Hover states and smooth transitions

### Card Layout

- **Professional Design:** Clean, organized reference card
- **Typography Hierarchy:** Clear distinction between sections
- **Visual Indicators:** Icons and formatting for different element types
- **Compact Format:** Efficient use of space for table reference

## Validation and Error Handling

### Input Validation

- **Pool Ranges:** Threat pools and monster sizes clamped to 1-12
- **Required Fields:** Names required for display, other fields optional
- **Data Integrity:** Unique IDs prevent conflicts and enable tracking
- **Type Safety:** Structured objects prevent parsing errors

### Error Prevention

- **Graceful Degradation:** Empty sections handled without errors
- **State Consistency:** Direct array manipulation prevents sync issues
- **User Feedback:** Clear indicators for required vs optional fields
- **Validation Messages:** Helpful error messages for invalid inputs

## Performance Considerations

### Optimization Strategies

- **Direct State Management:** No text parsing overhead
- **Efficient Updates:** Targeted array operations
- **Memoized Components:** Prevent unnecessary re-renders
- **Lazy Loading:** Components only render when needed

### Memory Management

- **Unique IDs:** Prevent memory leaks from duplicate references
- **Clean Operations:** Proper cleanup of deleted items
- **Efficient Arrays:** Filtered operations for display
- **Optimized Rendering:** Minimal component hierarchy

## Future Enhancements

### Potential Improvements

- **Drag-and-Drop:** Visual reordering of threats and monsters
- **Templates:** Pre-defined combat scenarios
- **Import/Export:** Save and share combat kits
- **Advanced Validation:** Custom rules for specific scenarios
- **Bulk Operations:** Multi-select and batch operations

### Integration Opportunities

- **Monster Builder:** Direct import from Monster Builder
- **Challenge Builder:** Combine challenges with combat kits
- **Campaign Management:** Link combat kits to larger campaigns
- **Random Generation:** Procedural combat kit creation

## Conclusion

The Combat Kit Builder represents the most complex feature in Grimwild Tools, successfully managing multiple interconnected systems while maintaining an intuitive user experience. Its structured approach to threats and monsters eliminates parsing errors while providing powerful management capabilities. The feature demonstrates advanced React patterns and state management techniques while delivering professional-quality output for tabletop gaming.
