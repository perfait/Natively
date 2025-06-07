# Natively - Changelog

## Version 0.1.0 (June 7, 2025) - Initial Development Release

### Features
- Basic user authentication (login/register)
- Profile management with customizable fields
- Profile image upload and display
- Links management (CRUD operations)
- Public link pages with clean, responsive design
- Basic click tracking for analytics
- Responsive UI for mobile and desktop

### Added Components
- Authentication system with token-based authentication
- Profile context for state management
- Dashboard interface for link management
- Public page component with animations
- Backend REST API endpoints
- Basic analytics tracking system

## Version 0.2.0 (June 7, 2025) - UI Improvements & Bug Fixes

### UI Improvements
- Consistent styling across all pages
- Enhanced Dashboard component styling:
  - Improved Link items with better borders and hover effects
  - Updated shareable URL section with better visual styling
  - Enhanced buttons with consistent border radius and typography
  - Added subtle animations and transitions
  - Fixed container consistency issues
- Better typography with consistent font usage (Mont for headers, Ubuntu for body text)
- Improved mobile responsiveness across components
- Added "Copy my URL" button in top-right corner for quick link sharing:
  - Provides one-click copy of user's public profile URL
  - Displays friendly URL format with username
  - Shows visual feedback with notification when URL is copied
  - Styled with consistent design language

### Bug Fixes
- Fixed profile image loading on public link pages
  - Added formatImageUrl helper function to handle image URLs consistently
  - Exported the function properly from ProfileContext
  - Updated usages across components
- Fixed URL sharing button in top navigation bar
  - Made button visible and accessible at all times
  - Enhanced visual appearance with better styling
  - Improved error handling during URL copying
- Made username login case-insensitive
  - Implemented custom authentication view that handles case-insensitivity
  - Preserved existing credential validation logic
- Simplified shareable profile URLs
  - Removed "/p/" prefix from public profile URLs
  - Updated URL generation across components
  - Maintained backward compatibility for old URL format
  - Fixed public profile page access with new URL format
- Removed header from creators' public link pages
  - Enhanced Navigation component to detect both old and new URL formats
  - Added explicit documentation in PublicLinkPage component
  - Improved route detection for public profile pages
- Fixed duplicate export in ProfilePage component
- Corrected container inconsistencies in Dashboard layout
- Fixed container alignment in Links page to match header
- Eliminated errors in component rendering

### Technical Improvements
- Refactored image URL handling for better consistency
- Improved error handling and user feedback
- Enhanced component structure for better maintainability
- Better error state handling in the UI

### Known Issues
- Advanced analytics features not yet implemented
- Limited theme customization options
- No social media integration features yet

## Planned for Future Releases

### Version 0.3.0
- Custom themes and colors for public pages
- Enhanced analytics with charts and graphs
- Social media integration for automatic posting
- User settings and preferences panel

### Version 0.4.0
- E-commerce features (product links, etc.)
- Custom domain support
- API for third-party integrations
- Additional link types (video embeds, music players, etc.)

### Version 0.5.0
- Team collaboration features
- Advanced SEO optimization
- Scheduling for link publishing
- Enhanced security features
