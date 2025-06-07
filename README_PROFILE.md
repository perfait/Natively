# Profile Management - Implementation Guide

This document explains the implementation of CRUD functionality for user profile management in the Natively application.

## Features Implemented

1. **Enhanced Profile Model**
   - Extended the Django `Profile` model with additional fields for user profile data
   - Added fields for bio, location, website, phone, profile image, display name, social media links, and privacy settings

2. **API Endpoints**
   - `/api/profiles/me/` - GET endpoint to retrieve the current user's profile
   - `/api/profiles/update_me/` - PATCH endpoint to update the current user's profile
   - `/api/profiles/upload-image/` - POST endpoint to upload a profile image

3. **Frontend Implementation**
   - Created a `ProfileContext` provider to manage profile state across components
   - Implemented profile data fetching and updating via API
   - Added file upload functionality for profile images with validation
   - Added UI for editing profile information with form validation

4. **Testing**
   - Created test scripts to verify API functionality
   - Added debug commands for easier development

## Technical Implementation

### Backend (Django)

1. **Models**
   - Extended the `Profile` model with additional fields
   - Added validation for file uploads

2. **API Views**
   - Added API endpoints for profile operations
   - Implemented proper permissions and authentication
   - Added file handling for image uploads

3. **Serializers**
   - Updated serializers to include all profile fields
   - Added method fields to access related user data

### Frontend (React)

1. **Context API**
   - Created `ProfileContext` to manage profile state
   - Implemented API calls using axios
   - Added loading and error states

2. **Components**
   - Created modular profile management components:
     - `ProfileManagement`: Main container with tabs for different sections
     - `ProfileInfo`: Basic profile information form
     - `ProfilePicture`: Profile image upload and management
     - `ProfileSocialLinks`: Social media links management
     - `ProfilePrivacy`: Privacy settings controls
   - Implemented form validation and error handling
   - Added real-time feedback via notifications

3. **Testing**
   - Created a test component to verify API functionality
   - Added proxy configuration for API communication

## Usage

1. **Profile Data Management**
   - Use the `useProfile` hook to access profile data and functions
   - Call `updateProfile` to save profile changes
   - Call `updateProfileImage` to upload a profile image

2. **API Endpoints**
   - All API calls require authentication with a token
   - Profile endpoints are protected and only accessible to authenticated users

3. **Debug Commands**
   - `python manage.py create_test_user` - Creates a test user with profile
   - `python manage.py generate_tokens` - Generates authentication tokens for all users
   - `python manage.py debug_profile <username>` - Displays profile data for debugging

## Testing the Implementation

1. **Backend Testing**
   - Run `python test_profile_api.py` to test the API endpoints
   - Run `python test_image_upload.py` to test image upload functionality

2. **Frontend Testing**
   - Access `/test/api` route to test API functionality in the browser
   - This route provides a UI to test all profile API endpoints

## User Flow

1. User navigates to the Profile page
2. User can select different tabs to manage various aspects of their profile:
   - Basic Info: Update name, bio, location, etc.
   - Profile Picture: Upload, crop, and manage profile image
   - Social Links: Add/edit social media account links
   - Privacy: Configure profile visibility settings
3. Changes are saved in real-time with feedback
4. Profile information is available throughout the application via context

## Future Improvements

1. Add profile data validation with detailed error messages
2. Implement profile completion percentage indicator
3. Add profile verification functionality
4. Implement direct social media authentication/connection
5. Add option to export profile data
6. Implement public profile view with customization options
