import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// Helper function to format image URL
export const formatImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // In development, Django backend is typically on port 8000 while React is on 3000
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev ? 'http://localhost:8000' : window.location.origin;
  
  // Ensure the URL starts with a slash
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  
  return `${baseUrl}${path}`;
};

// Create a context for user profile data
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
    phone: '',
    profileImage: null,
    socialLinks: {
      twitter: '',
      instagram: '',
      youtube: ''
    },
    privacySettings: {
      showInDirectory: true,
      showStats: true,
      hideEmail: false
    }
  });

  // Fetch profile data from the API
  useEffect(() => {
    if (token) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/profiles/me/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      const profile = response.data;
        // Map API data to our frontend structure
      setProfileData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        displayName: profile.display_name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        phone: profile.phone || '',
        profileImage: profile.profile_image ? formatImageUrl(profile.profile_image) : null,
        socialLinks: {
          twitter: profile.twitter || '',
          instagram: profile.instagram || '',
          youtube: profile.youtube || ''
        },
        privacySettings: {
          showInDirectory: profile.show_in_directory,
          showStats: profile.show_stats,
          hideEmail: profile.hide_email
        }
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to fetch profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update profile data
  const updateProfile = async (newData) => {
    try {
      // Prepare data for the API
      const apiData = {
        first_name: newData.firstName,
        last_name: newData.lastName,
        display_name: newData.displayName,
        bio: newData.bio,
        location: newData.location,
        website: newData.website,
        phone: newData.phone,
        twitter: newData.socialLinks?.twitter,
        instagram: newData.socialLinks?.instagram,
        youtube: newData.socialLinks?.youtube,
        show_in_directory: newData.privacySettings?.showInDirectory,
        show_stats: newData.privacySettings?.showStats,
        hide_email: newData.privacySettings?.hideEmail
      };
      
      const response = await axios.patch('/api/profiles/update_me/', apiData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Update local state
      setProfileData(prevData => ({
        ...prevData,
        ...newData
      }));
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Failed to update profile. Please try again.' 
      };
    }
  };
  // Update profile image
  const updateProfileImage = async (imageFile) => {
    try {
      // If imageFile is null, delete the profile image
      if (!imageFile) {
        const response = await axios.patch('/api/profiles/update_me/', 
          { profile_image: null }, 
          {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        setProfileData(prevData => ({
          ...prevData,
          profileImage: null
        }));
        
        return { success: true, data: response.data };
      }
      
      // Otherwise upload the new image
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post('/api/profiles/upload-image/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
        // Update local state with the new image URL
      const imageUrl = response.data.profile_image;
      setProfileData(prevData => ({
        ...prevData,
        profileImage: formatImageUrl(imageUrl)
      }));
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating profile image:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Failed to update profile image. Please try again.' 
      };
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        updateProfile,
        updateProfileImage,
        loading,
        error,
        refreshProfile: fetchProfileData
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use profile context
export const useProfile = () => useContext(ProfileContext);
