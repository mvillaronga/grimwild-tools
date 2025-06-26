# Grimwild Tools Documentation

## Overview
This directory contains comprehensive documentation for the Grimwild Tools project, organized by category for easy navigation and maintenance.

## Documentation Structure

### 📁 Features Documentation (`/features/`)
Contains detailed technical documentation for major features and components.

#### Available Documents:
- **[Challenge Builder Feature](features/CHALLENGE_FEATURE_DOCUMENTATION.md)** - Complete technical documentation for the Challenge Builder including architecture, components, data structures, and card generation functionality.
- **[Combat Kit Builder Feature](features/COMBAT_KIT_FEATURE_DOCUMENTATION.md)** - Comprehensive documentation for the Combat Kit Builder including threats management, monster integration, and complex scenario creation.
- **[Common Components Feature](features/COMMON_COMPONENTS_FEATURE_DOCUMENTATION.md)** - Documentation for shared components including color management, image export, and reusable UI components.
- **[Enhanced Monsters Feature](features/MONSTERS_FEATURE_DOCUMENTATION.md)** - Complete technical documentation for the structured monster management system including architecture, components, validation, and integration details.

### 📁 Testing Documentation (`/testing/`)
Contains testing guides, procedures, and results for quality assurance.

#### Available Documents:
- **[Challenge Builder Testing Guide](testing/CHALLENGE_TESTING_GUIDE.md)** - Comprehensive testing procedures for the Challenge Builder feature including functional testing, UI validation, and export functionality.
- **[Combat Kit Builder Testing Guide](testing/COMBAT_KIT_TESTING_GUIDE.md)** - Complete testing procedures for the Combat Kit Builder including threats system, monsters integration, and complex scenario testing.
- **[Common Components Testing Guide](testing/COMMON_COMPONENTS_TESTING_GUIDE.md)** - Testing procedures for shared components including color management, image export, and UI component validation.
- **[Monsters Testing Guide](testing/MONSTERS_TESTING_GUIDE.md)** - Comprehensive testing procedures for the enhanced monsters feature including test plans, expected results, and bug reporting templates.
- **[Monsters Test Results](testing/MONSTERS_TEST_RESULTS.md)** - Complete test execution results with coverage summary, browser compatibility, performance metrics, and production readiness assessment.

## Quick Navigation

### For Developers
- **Feature Implementation**: See `/features/` for technical specifications
- **Code Quality**: See `/testing/` for testing procedures
- **Architecture**: Feature docs contain component architecture and data flow

### For QA/Testing
- **Test Plans**: See `/testing/MONSTERS_TESTING_GUIDE.md`
- **Test Results**: See `/testing/MONSTERS_TEST_RESULTS.md`
- **Bug Reporting**: Templates available in testing guide

### For Product Managers
- **Feature Overview**: Feature documentation contains user-facing functionality
- **Test Coverage**: Test results show comprehensive coverage metrics
- **Production Readiness**: Assessment available in test results

## Documentation Standards

### File Naming Convention
- Feature docs: `{FEATURE_NAME}_FEATURE_DOCUMENTATION.md`
- Testing guides: `{FEATURE_NAME}_TESTING_GUIDE.md`
- Test results: `{FEATURE_NAME}_TEST_RESULTS.md`

### Content Structure
All documentation follows a consistent structure:
1. **Overview** - High-level summary
2. **Technical Details** - Implementation specifics
3. **Usage/Testing** - Practical application
4. **Results/Conclusion** - Outcomes and recommendations

### Maintenance
- Update documentation when features change
- Keep test results current with latest testing
- Archive outdated documentation in `/archive/` (when needed)

## Contributing to Documentation

### Adding New Feature Documentation
1. Create feature doc in `/features/`
2. Create testing guide in `/testing/`
3. Execute tests and create results doc in `/testing/`
4. Update this README with links

### Updating Existing Documentation
1. Modify relevant files
2. Update version/date information
3. Ensure cross-references remain valid
4. Update this README if structure changes

## Related Documentation

### Main Project Documentation
- **[Main README](../README.md)** - Project overview and setup instructions
- **[Package.json](../package.json)** - Dependencies and scripts

### Code Documentation
- **JSDoc Comments** - Inline code documentation
- **Component Props** - React component interfaces
- **Utility Functions** - Helper function documentation

## Support

For questions about documentation:
1. Check existing docs first
2. Review test results for known issues
3. Consult feature documentation for technical details
4. Create issues for documentation improvements

---

*Last Updated: Current Implementation*
*Documentation Version: 1.0*
