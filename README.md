# Grimwild Tools - Product Requirements Document

## Project Overview

**Project Name:** Grimwild Tools
**Version:** 1.0.0
**Platform:** Web Application (React)
**Deployment:** GitHub Pages
**Repository:** https://github.com/mvillaronga/grimwild-tools
**Live URL:** https://mvillaronga.github.io/grimwild-tools/

## Executive Summary

Grimwild Tools is a web-based content generation suite designed to assist Game Masters (GMs) and content creators in developing rich, consistent content for the Grimwild RPG system. The application provides intuitive builders for creating professional-quality game assets that can be exported as images for use in digital or print materials.

## Product Vision

To streamline the content creation process for Grimwild RPG by providing user-friendly tools that generate visually appealing, standardized game components while maintaining the aesthetic and mechanical consistency of the game system.

## Target Audience

### Primary Users
- **Game Masters (GMs)** running Grimwild RPG campaigns
- **Content Creators** developing Grimwild RPG supplements
- **Homebrew Enthusiasts** creating custom content for personal use

### Secondary Users
- **Players** who want to create custom content for their characters

## Core Features

### 1. Challenge Builder
**Purpose:** Create standardized challenge cards for encounters and obstacles

**Key Functionality:**
- **Challenge Pool Configuration:** Set dice pool values (1-99)
- **Title Management:** Custom challenge names with automatic formatting
- **Trait System:** Multi-line trait definitions with bullet-point formatting
- **Move System:** Action/ability definitions with structured presentation
- **Failure Conditions:** Optional failure pool and consequence descriptions
- **Visual Output:** Professionally formatted challenge cards with consistent styling

**User Workflow:**
1. Enter challenge pool value
2. Define challenge title
3. Add traits (one per line)
4. Add moves/actions (one per line)
5. Configure failure conditions (optional)
6. Export as PNG image or copy to clipboard

### 2. Monster Builder
**Purpose:** Create comprehensive monster stat blocks and reference cards

**Key Functionality:**
- **Basic Information:** Name, type, and description fields
- **Color System:** Three-color palette with visual color bar representation
- **Trait System:** Mechanical traits and abilities
- **Move System:** Monster actions and special abilities
- **Motivation System:** "Wants" and "Doesn't want" behavioral drivers
- **Flavor Content:** Customizable flavor tables with dice icons
- **Visual Output:** Complete monster blocks with professional layout

**User Workflow:**
1. Enter monster name and type
2. Configure color palette (3 colors with labels)
3. Write monster description
4. Define traits and moves
5. Set motivations (wants/dislikes)
6. Add flavor content with custom title
7. Export as PNG image or copy to clipboard

### 3. Combat Kit Builder
**Purpose:** Create dynamic antagonists and combat scenarios quickly using tier-based opponents and environmental battlegrounds

**Key Functionality:**
- **Tier System:** Four opponent threat levels (Mook, Tough, Elite, Boss) with distinct characteristics
- **Role Assignment:** Twelve behavioral archetypes to guide combat tactics
- **Battleground Generator:** Environmental elements with features and threats
- **Dynamic Scaling:** Opponents scale based on tier selection
- **Tactical Guidance:** Built-in behavioral keywords for each role
- **Scenario Templates:** Pre-configured combat encounters with environmental hazards

**Tier Definitions:**
- **Mook:** Mostly just set dressing, one action can take out several, large groups can be a task pool
- **Tough:** A typical dangerous enemy, one action can take out one of them, small groups can be a task pool
- **Elite:** Strong scene presence, 4d/6d challenge, often leads a group of lesser enemies
- **Boss:** Commands the scene, 6d/8d challenge or linked challenge, extremely powerful

**Available Roles:**
- **Blaster, Brute, Lurker, Marauder, Marksman, Overseer**
- **Predator, Protector, Skirmisher, Swarmer, Tactician, Trickster**

**Battleground Elements:**
- **Features:** Environmental elements that impact combat (lava pools, unstable ground, etc.)
- **Threats:** Hazards that present extra dangers with suspense mechanics
- **Integration:** Mix features and threats for dynamic combat environments

**User Workflow:**
1. Select opponent tier (Mook/Tough/Elite/Boss)
2. Choose behavioral role from available archetypes
3. Configure battleground features and environmental threats
4. Generate combat scenario with scaling recommendations
5. Export complete combat kit as reference card

### 4. Image Export System
**Purpose:** Generate high-quality images for digital and print use

**Key Functionality:**
- **PNG Export:** Download generated content as PNG files
- **Clipboard Integration:** Copy images directly to clipboard
- **Automatic Naming:** Intelligent filename generation based on content
- **High Quality:** Optimized for both screen and print resolution

## Technical Architecture

### Frontend Stack
- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.0.0
- **Styling:** CSS Modules + Custom CSS
- **Image Generation:** html2canvas 1.4.1
- **Deployment:** GitHub Pages via gh-pages 6.3.0

### Key Dependencies
- **React & React DOM:** Core framework
- **html2canvas:** Client-side image generation
- **gh-pages:** Automated deployment to GitHub Pages

### Browser Compatibility
- Modern browsers supporting ES6+ features
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive design for tablet/phone usage

## User Experience Requirements

### Design Principles
- **Consistency:** Maintain visual consistency with Grimwild RPG aesthetic
- **Simplicity:** Intuitive forms with clear labeling and logical flow
- **Efficiency:** Minimal clicks to generate professional content
- **Accessibility:** Clear typography, good contrast, keyboard navigation

### Interface Design
- **Tab-based Navigation:** Clean separation between Challenge and Monster builders
- **Form-based Input:** Structured forms with appropriate input types
- **Live Preview:** Real-time preview of generated content
- **Responsive Layout:** Adapts to different screen sizes and orientations

### Typography & Styling
- **Primary Font:** Libre Baskerville (serif) for body text
- **Accent Fonts:** Cinzel (serif) for headers, Arvo (serif) for titles
- **Color Scheme:** Warm paper tones (#ede9dd background, #3d2e2a text)
- **Visual Elements:** Dice icons, color bars, structured layouts

## Functional Requirements

### Challenge Builder Requirements
- **FR-C1:** Support challenge pools from 1-12 dice
- **FR-C2:** Handle multi-word challenge titles with proper capitalization
- **FR-C3:** Process multi-line trait input with automatic bullet formatting
- **FR-C4:** Process multi-line move input with structured presentation
- **FR-C5:** Optional failure pool configuration (1-12 dice)
- **FR-C6:** Optional failure description with rich text formatting
- **FR-C7:** Generate filename based on challenge title (sanitized)

### Monster Builder Requirements
- **FR-M1:** Support custom monster names and types
- **FR-M2:** Three-color palette system with hex color selection
- **FR-M3:** Color labels for thematic organization
- **FR-M4:** Multi-line description support
- **FR-M5:** Trait and move systems with bullet-point formatting
- **FR-M6:** Wants/dislikes motivation system
- **FR-M7:** Customizable flavor tables with dice icons (1-6)
- **FR-M8:** Dynamic flavor table sizing based on content

### Combat Kit Builder Requirements
- **FR-CK1:** Four-tier opponent system (Mook, Tough, Elite, Boss) with distinct characteristics
- **FR-CK2:** Twelve role archetypes with behavioral guidance keywords
- **FR-CK3:** Tier-based scaling recommendations and challenge ratings
- **FR-CK4:** Battleground feature system with environmental elements
- **FR-CK5:** Threat system with suspense mechanics and hazard descriptions
- **FR-CK6:** Dynamic scenario generation combining tiers, roles, and environments
- **FR-CK7:** Template system for common combat encounter types
- **FR-CK8:** Integration with existing challenge and monster systems
- **FR-CK9:** Export combat scenarios as structured reference cards

### Export Requirements
- **FR-E1:** PNG image generation at print-quality resolution
- **FR-E2:** Clipboard integration for direct paste into other applications
- **FR-E3:** Automatic filename generation with sanitization
- **FR-E4:** Preserve formatting and styling in exported images

## Non-Functional Requirements

### Performance
- **Load Time:** Initial page load under 3 seconds
- **Export Speed:** Image generation under 2 seconds
- **Responsiveness:** UI interactions under 100ms response time

### Reliability
- **Uptime:** 99.9% availability (GitHub Pages SLA)
- **Data Persistence:** Form data preserved during session
- **Error Handling:** Graceful degradation for unsupported browsers

### Scalability
- **Content Size:** Support for large text inputs (up to 10,000 characters)
- **Image Quality:** Maintain quality at various export sizes
- **Browser Memory:** Efficient memory usage during image generation

### Security
- **Client-Side Only:** No server-side data storage or transmission
- **Safe Exports:** Sanitized filenames prevent directory traversal
- **Content Security:** No execution of user-provided scripts

## Success Metrics

### Quality Metrics
- **Application Stability:** Zero critical crashes or data loss incidents
- **Cross-Browser Compatibility:** Consistent functionality across major browsers
- **Export Reliability:** 100% success rate for image generation and downloads
- **Performance Consistency:** Stable load times and responsive interactions
- **Error Handling:** Graceful handling of edge cases and invalid inputs

## Future Roadmap

### Phase 2 Enhancements
- **Combat Kit Builder:** Complete implementation of tier-based opponents and battleground system
- **Additional Builders:** Location, NPC, and Item generators
- **Monster Enhancement:** Updating the monster builder to allow optional functionality of the fan created bestiary format
- **Template System:** Pre-built templates for common content types
- **Batch Operations:** Generate multiple items simultaneously
- **Advanced Styling:** Customizable themes and color schemes

### Phase 3 Features
- **Data Persistence:** Save/load functionality with local storage
- **Sharing System:** Share generated content via URLs
- **Print Optimization:** PDF export with print-specific formatting

### Long-term Vision
- **Asset Library:** Community-shared content repository
- **Advanced AI:** AI-assisted content generation and suggestions
- **Integration APIs:** Connect with virtual tabletop platforms

## Risk Assessment

### Technical Risks
- **Browser Compatibility:** html2canvas limitations in older browsers
- **Performance:** Large content causing memory issues
- **Deployment:** GitHub Pages service interruptions

### Mitigation Strategies
- **Progressive Enhancement:** Graceful degradation for unsupported features
- **Content Limits:** Reasonable input size restrictions
- **Backup Deployment:** Alternative hosting options prepared

## Conclusion

Grimwild Tools is a personal project focused on creating reliable, user-friendly tools for RPG content creation. Success is measured by the application's stability, consistent functionality, and ability to generate high-quality game assets for personal use and sharing within the RPG community.
