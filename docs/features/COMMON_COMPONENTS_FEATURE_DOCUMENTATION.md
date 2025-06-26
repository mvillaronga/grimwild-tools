# Common Components Feature Documentation

## Overview

The Common Components system provides shared functionality across all Grimwild Tools features, including color management, image export capabilities, and reusable UI components. This system ensures consistency, reduces code duplication, and provides a unified user experience across the application.

## Architecture

### Component Categories

```
Common Components
├── Color Management System
│   ├── ColorDropdown (Main selector)
│   ├── ColorPicker (Wrapper component)
│   └── CustomColorCreator (Color creation)
├── Image Export System
│   ├── ImageActionsWrapper (Export controls)
│   └── imageExport utilities (Core functionality)
├── UI Components
│   ├── TraitBulletList (Styled trait display)
│   └── MovesBulletList (Styled moves display)
└── Utility Systems
    ├── Color utilities (Hex/HSL conversion)
    └── Validation helpers
```

### State Management

Common components use various state management patterns:

- **Local State:** Component-specific state (dropdowns, modals)
- **Prop Drilling:** Parent-managed state for form integration
- **Custom Hooks:** Shared state logic for color management
- **Context-Free:** Self-contained components with minimal dependencies

## Color Management System

### ColorDropdown Component

**Location:** `src/components/common/ColorDropdown.jsx`

**Purpose:** Advanced color selection with predefined and custom color support.

**Key Features:**
- **Predefined Colors:** 30+ carefully curated colors with descriptive names
- **Custom Colors:** User-created colors with two-word naming system
- **Hue-Based Sorting:** Colors organized by hue, saturation, and lightness
- **Visual Preview:** Color swatches with hex values
- **Search Integration:** Quick color selection with visual feedback

**Color Organization:**
```javascript
// Predefined colors (examples)
const monsterColourHex = {
  "scaly green": "#6a8f3c",
  "mossy brown": "#756543", 
  "rocky gray": "#6e7678",
  "azure blue": "#3a7fa7",
  // ... 30+ total colors
};

// Custom colors (user-created)
const customColors = {
  "crimson flame": "#ff4444",
  "ocean depth": "#1a5490"
};
```

**Sorting Algorithm:**
```javascript
function sortColorsByHue(colorNames, allColors) {
  return colorNames.sort((a, b) => {
    const [hueA, satA, lightA] = hexToHsl(allColors[a]);
    const [hueB, satB, lightB] = hexToHsl(allColors[b]);
    
    // Sort by hue, then saturation, then lightness
    if (Math.abs(hueA - hueB) > 5) return hueA - hueB;
    if (Math.abs(satA - satB) > 0.1) return satB - satA;
    return lightA - lightB;
  });
}
```

### CustomColorCreator Component

**Location:** `src/components/common/CustomColorCreator.jsx`

**Purpose:** Modal interface for creating custom colors with validation.

**Key Features:**
- **Color Picker:** Full-spectrum color selection using react-colorful
- **Two-Word Naming:** Enforced naming convention for consistency
- **Real-Time Preview:** Live color preview with hex display
- **Validation System:** Comprehensive input validation and error handling
- **Keyboard Support:** Enter to submit, Escape to cancel

**Validation Rules:**
- Exactly two words required
- Each word minimum 2 characters
- Only letters and spaces allowed
- Automatic lowercase conversion
- Duplicate name prevention

### Color Utilities

**Location:** `src/utils/colors.js`

**Purpose:** Color conversion and manipulation utilities.

**Key Functions:**
```javascript
// Hex to HSL conversion for sorting
function hexToHsl(hex) {
  // Convert hex to RGB, then to HSL
  // Returns [hue, saturation, lightness]
}

// Color validation
function isValidHex(hex) {
  return /^#[0-9A-F]{6}$/i.test(hex);
}
```

## Image Export System

### ImageActionsWrapper Component

**Location:** `src/components/common/ImageActionsWrapper.jsx`

**Purpose:** Unified export interface for all card components.

**Key Features:**
- **Download Functionality:** Save cards as PNG files
- **Clipboard Integration:** Copy images directly to clipboard
- **High Resolution:** 2x scale for print quality
- **Transparent Background:** Clean exports without background
- **Error Handling:** Graceful fallbacks for unsupported browsers

**Usage Pattern:**
```javascript
<ImageActionsWrapper filename="custom-filename.png">
  <CardComponent {...props} />
</ImageActionsWrapper>
```

### Image Export Utilities

**Location:** `src/utils/imageExport.js`

**Purpose:** Core image generation functionality using html2canvas.

**Key Functions:**
```javascript
// Download component as image
async function downloadComponentAsImage(elementRef, filename) {
  const canvas = await html2canvas(elementRef.current, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false
  });
  
  // Create and trigger download
}

// Copy component to clipboard
async function copyComponentAsImageToClipboard(elementRef) {
  const canvas = await html2canvas(elementRef.current, options);
  
  canvas.toBlob(async (blob) => {
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  });
}
```

**Export Configuration:**
- **Scale:** 2x for high resolution
- **Background:** Transparent for clean exports
- **CORS:** Enabled for external resources
- **Quality:** Optimized for both screen and print

## UI Components

### TraitBulletList Component

**Location:** `src/components/common/TraitBulletList.jsx`

**Purpose:** Standardized display for trait lists across all cards.

**Key Features:**
- **Consistent Styling:** Italicized text with ✱ symbols
- **Responsive Layout:** Adapts to different card sizes
- **Empty State Handling:** Graceful handling of empty arrays
- **Accessibility:** Proper semantic markup for screen readers

**Styling:**
```css
.trait-list {
  font-style: italic;
  list-style: none;
}

.trait-list li::before {
  content: "✱ ";
  font-weight: bold;
}
```

### MovesBulletList Component

**Location:** `src/components/common/MovesBulletList.jsx`

**Purpose:** Standardized display for moves lists with special formatting.

**Key Features:**
- **Bold Caps Styling:** All caps with larger first letters
- **Consistent Symbols:** ◉ symbols for move indicators
- **Typography Hierarchy:** Proper font sizing and weight
- **Visual Impact:** Strong visual presence for important actions

**Styling:**
```css
.moves-list li {
  font-weight: bold;
  text-transform: uppercase;
}

.moves-list li::before {
  content: "◉ ";
}

.initcap {
  font-size: 1.2em;
  font-weight: 700;
}
```

## Integration Patterns

### Form Integration

Common components integrate seamlessly with form systems:

```javascript
// Color picker integration
<ColorDropdown
  colorValue={selectedColor}
  onColorChange={setSelectedColor}
  labelValue={colorLabel}
  onLabelChange={setColorLabel}
  customColorsState={customColorsState}
/>

// Export wrapper integration
<ImageActionsWrapper filename={generateFilename()}>
  <DisplayComponent {...formData} />
</ImageActionsWrapper>
```

### State Management

Components follow consistent state patterns:

- **Controlled Components:** Parent manages all state
- **Callback Props:** Standard onChange patterns
- **Error Boundaries:** Graceful error handling
- **Loading States:** User feedback during operations

## Styling System

### CSS Modules

All common components use CSS Modules for scoped styling:

```javascript
import styles from './Component.module.css';

<div className={styles.container}>
  <button className={`${styles.button} ${styles.primary}`}>
    Action
  </button>
</div>
```

### Design Tokens

Consistent design tokens across components:

```css
:root {
  --paper: #f7f4ef;
  --ink: #221f1a;
  --background: #ede9dd;
  --text-primary: #3d2e2a;
  --border-color: #c9c4b4;
  --accent-color: #3d2e2a;
}
```

### Typography

Standardized typography system:

- **Headers:** Cinzel font for titles and labels
- **Body Text:** Libre Baskerville for readability
- **Special Text:** Custom styling for traits and moves
- **Responsive Sizing:** Scales appropriately across devices

## Performance Considerations

### Optimization Strategies

- **Lazy Loading:** Components load only when needed
- **Memoization:** Expensive operations cached appropriately
- **Event Delegation:** Efficient event handling patterns
- **Bundle Splitting:** Common components in shared chunks

### Memory Management

- **Cleanup:** Proper cleanup of event listeners and timers
- **Ref Management:** Careful handling of DOM references
- **State Optimization:** Minimal state for maximum performance
- **Garbage Collection:** No memory leaks from closures

## Browser Compatibility

### Supported Features

- **Modern APIs:** Clipboard API with fallbacks
- **Canvas Support:** html2canvas for all supported browsers
- **CSS Features:** Modern CSS with graceful degradation
- **JavaScript:** ES6+ features with appropriate polyfills

### Fallback Strategies

- **Clipboard:** Download fallback when clipboard unavailable
- **Canvas:** Error messages for unsupported browsers
- **CSS:** Progressive enhancement for advanced features
- **JavaScript:** Polyfills for missing APIs

## Testing Strategies

### Component Testing

- **Unit Tests:** Individual component functionality
- **Integration Tests:** Component interaction patterns
- **Visual Tests:** Screenshot comparison for UI consistency
- **Accessibility Tests:** Screen reader and keyboard navigation

### Export Testing

- **Image Generation:** Verify canvas output quality
- **File Downloads:** Test filename generation and download
- **Clipboard:** Test copy functionality across browsers
- **Error Handling:** Test failure scenarios and recovery

## Future Enhancements

### Planned Improvements

- **Theme System:** Dark/light mode support
- **Animation Library:** Consistent animations across components
- **Icon System:** Standardized icon components
- **Form Validation:** Shared validation utilities
- **Accessibility:** Enhanced ARIA support and keyboard navigation

### Integration Opportunities

- **Design System:** Formal design system documentation
- **Storybook:** Component documentation and testing
- **Testing Library:** Comprehensive test coverage
- **Performance Monitoring:** Real-time performance metrics

## Conclusion

The Common Components system provides a solid foundation for Grimwild Tools, ensuring consistency, maintainability, and excellent user experience. By centralizing shared functionality, the system reduces development overhead while providing powerful, reusable components that enhance every feature in the application. The modular architecture allows for easy extension and modification while maintaining backward compatibility and performance.
