# Layout Updates Documentation

## Overview

This document describes the layout improvements implemented across all builder components in Grimwild Tools to provide a more consistent and professional user experience.

## Changes Made

### 1. Half-Width Centered Column Layout

All builder components now use a standardized two-column layout:

- **Left Column (50% width):** Form inputs and controls
- **Right Column (50% width):** Preview display with builder title
- **Centered Design:** Both columns are center-locked rather than left/right aligned
- **Responsive:** Stacks vertically on mobile devices (768px and below)

### 2. Builder Titles Added

Each builder now displays a prominent title above the preview card:

- **Challenge Builder:** "Challenge Builder"
- **Monster Builder:** "Monster Builder" (already existed)
- **Combat Kit Builder:** "Combat Kit Builder"
- **Faction Pool Builder:** "Faction Pool Builder"
- **Fiction Pillar Builder:** "Fiction Pillar Builder"

### 3. Conditional Divider Fix (Faction Pools)

The faction pool card divider behavior was improved:

- **Previous:** Divider always shown between resources and goals sections
- **Updated:** Divider only shown when resources exist
- **Benefit:** Cleaner visual layout when no resources are defined

## Technical Implementation

### CSS Changes

Each builder's CSS module was updated with:

```css
.builderLayout > * {
  flex: 0 0 50%;
  max-width: 50%;
}

.previewContainer {
  flex: 0 0 50% !important;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-family: "Cinzel", serif;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .builderLayout > * {
    flex: none;
    max-width: 100%;
  }
  
  .previewContainer {
    flex: none !important;
    max-width: 100%;
  }
  
  .title {
    font-size: 1.25rem;
  }
}
```

### Component Changes

Each builder component was updated to include the title:

```jsx
<div className={styles.previewContainer}>
  <h2 className={styles.title}>[Builder Name] Builder</h2>
  <ImageActionsWrapper filename={filename}>
    {/* Preview component */}
  </ImageActionsWrapper>
</div>
```

### Conditional Divider Implementation

The faction pool card was updated to conditionally render the divider:

```jsx
{/* Resources Section - only show if resources exist */}
{parsedResources.length > 0 && (
  <div className={styles.sectionTop}>
    {/* Resources content */}
  </div>
)}

{/* Divider - only show if resources exist */}
{parsedResources.length > 0 && <hr className={styles.divider} />}

{/* Goals Section - always shown */}
<div className={styles.sectionBottom}>
  {/* Goals content */}
</div>
```

## Files Modified

### CSS Modules
- `src/components/challenge/ChallengeBuilder.module.css`
- `src/components/combatkit/CombatKitBuilder.module.css`
- `src/components/factionpool/FactionPoolBuilder.module.css`
- `src/components/fictionpillar/FictionPillarBuilder.module.css`
- `src/components/monster/MonsterBuilder.module.css`

### React Components
- `src/components/challenge/ChallengeBuilder.jsx`
- `src/components/combatkit/CombatKitBuilder.jsx`
- `src/components/factionpool/FactionPoolBuilder.jsx`
- `src/components/factionpool/FactionPoolCard.jsx`
- `src/components/fictionpillar/FictionPillarBuilder.jsx`

### Documentation Files
- `docs/features/CHALLENGE_FEATURE_DOCUMENTATION.md`
- `docs/features/COMBAT_KIT_FEATURE_DOCUMENTATION.md`
- `docs/features/FACTION_POOL_FEATURE_DOCUMENTATION.md`
- `docs/features/FICTION_PILLAR_FEATURE_DOCUMENTATION.md`
- `docs/testing/FACTION_POOL_TESTING_GUIDE.md`

## Benefits

### User Experience
- **Consistent Layout:** All builders now follow the same visual pattern
- **Better Space Utilization:** Half-width columns make better use of screen real estate
- **Clear Visual Hierarchy:** Builder titles provide immediate context
- **Cleaner Design:** Conditional dividers reduce visual clutter

### Developer Experience
- **Standardized CSS:** Consistent styling patterns across all builders
- **Maintainable Code:** Shared CSS patterns make future updates easier
- **Responsive Design:** Mobile-first approach ensures good experience on all devices

## Testing Considerations

When testing these changes, verify:

1. **Layout Consistency:** All builders use the same column proportions
2. **Responsive Behavior:** Layout stacks properly on mobile devices
3. **Title Display:** Builder titles appear correctly above preview cards
4. **Conditional Divider:** Faction pool divider only shows when resources exist
5. **Cross-Browser Compatibility:** Layout works in all supported browsers

## Future Enhancements

Potential improvements to consider:

- **Collapsible Columns:** Allow users to hide/show form or preview columns
- **Adjustable Column Widths:** Let users customize the column proportions
- **Full-Screen Preview:** Option to view preview cards in full-screen mode
- **Side-by-Side Comparison:** Compare multiple cards simultaneously
