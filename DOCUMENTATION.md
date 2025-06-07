# Natively - Links in Bio Platform

## Introduction

Natively is a modern "links in bio" platform that allows users to create personalized pages with multiple links to share across social media platforms. It offers profile management, link customization, and analytics tracking to help users promote their content efficiently.

## Architecture Overview

### Frontend
- **Framework**: React.js
- **UI Library**: Material UI
- **State Management**: React Context API
- **Styling**: Styled Components + Material UI styling system

### Backend
- **Framework**: Django
- **Database**: SQLite (development), configurable for production
- **API**: REST API with Django Rest Framework
- **Authentication**: Token-based authentication

## Key Components

### Frontend Components

#### Authentication
- `Login.js` and `Register.js`: Handle user authentication flows
- `AuthContext.js`: Provides authentication state throughout the application

#### Profile Management
- `ProfileContext.js`: Manages profile data and operations
- `ProfileManagement.js`: UI for editing profile information
- `ProfilePage.js`: Container for profile management UI

#### Link Management
- `Dashboard.js`: Main interface for managing links
- `LinkForm.js`: Form for creating and editing links
- `LinksPage.js`: Container for the links dashboard
- `LinkAnalytics.js`: Displays performance metrics for links

#### Public Pages
- `PublicLinkPage.js`: The public-facing "links in bio" page that visitors see

#### Layout
- `DashboardLayout.js`: Main layout structure for authenticated users
  - Includes navigation sidebar
  - Features URL sharing button in the top-right corner
  - Manages app-wide layout components
- Several page components for different sections of the application

### Backend Components

#### Models
- `Profile`: User profile information
- `Link`: Individual links associated with profiles
- `Click`: Analytics tracking for link clicks

#### API Endpoints
- Authentication endpoints for login/register
- Profile CRUD operations
- Link CRUD operations
- Analytics tracking endpoints

## Features

### User Authentication
- User registration and login
- Token-based authentication
- Password recovery (if implemented)

### Profile Management
- Customize display name, bio, and other profile information
- Upload profile images
- Set privacy preferences

### Link Management
- Create, edit, and delete links
- Reorder links with drag-and-drop functionality
- Customize link appearance

### Analytics
- Track link clicks
- View performance metrics for links
- Time-based analytics data

### Public Pages
- Custom public URL for each user
- Mobile-responsive design
- Animated transitions for better user experience

## Configuration

### Environment Variables
- `NODE_ENV`: Determines build environment (development/production)
- Backend database configuration
- API endpoint URLs

### Development Setup
1. Clone the repository
2. Install backend dependencies: `pip install -r requirements.txt`
3. Run backend migrations: `python manage.py migrate`
4. Start backend server: `python manage.py runserver`
5. Install frontend dependencies: `cd frontend && npm install`
6. Start frontend development server: `npm start`

## API Documentation

### Authentication
- `POST /api/auth/token/`: User login (case-insensitive username)
- `POST /api/auth/register/`: User registration

### Profiles
- `GET /api/profiles/`: Get user profile
- `PUT /api/profiles/`: Update user profile
- `PATCH /api/profiles/`: Partial update of user profile
- `POST /api/profiles/image/`: Upload profile image

### Links
- `GET /api/links/`: List all links for the current user
- `POST /api/links/`: Create a new link
- `GET /api/links/:id/`: Get link details
- `PUT /api/links/:id/`: Update a link
- `PATCH /api/links/:id/`: Partial update of a link
- `DELETE /api/links/:id/`: Delete a link

### Analytics
- `GET /api/links/:id/analytics/`: Get analytics for a specific link
- `GET /api/track-click/:id/`: Track a click on a link

## Usage Guide

### Creating a Profile
1. Register for an account
2. Fill in profile details
3. Upload a profile image

### Managing Links
1. Navigate to the Links page
2. Click "Add New Link" to create a link
3. Fill in the title and URL
4. Use the reordering controls to arrange links
5. Track performance in the analytics section

### Sharing Your Page
1. Copy your unique URL by clicking the username link button in the top-right corner
2. Alternatively, copy the shareable URL from the links dashboard
3. URLs are in the format: `http://yourdomain.com/username`
4. Share on social media platforms
5. Monitor click performance through analytics

### Public Profile Page
- Public profile pages show only the creator's content without the Natively navigation header
- Pages are designed for clean presentation to visitors
- All links are tracked when clicked for analytics purposes
- URL format is simply the username: `http://yourdomain.com/username`

## Troubleshooting

### Common Issues
- **Profile image not displaying**: Make sure the backend server is running and the image URL is correctly formatted
- **Links not saving**: Check network connectivity and authentication status
- **Analytics not tracking**: Verify that the backend tracking endpoint is accessible

### Error Handling
- The application includes error handling for network issues
- User-friendly error messages are displayed for common problems

## Future Enhancements

- Integration with social media APIs
- Custom themes and styling options
- Advanced analytics features
- E-commerce integrations
- Custom domains for profile pages
