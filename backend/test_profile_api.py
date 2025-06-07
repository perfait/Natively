import requests

BASE_URL = "http://127.0.0.1:8000/api"
TOKEN = "005832dae8806ca8b5341743a6eb404bea65d509"  # Replace with your actual token

def test_profile_endpoints():
    """Test the profile API endpoints"""
    headers = {"Authorization": f"Token {TOKEN}"}
    
    # Test getting the current user's profile
    profile_response = requests.get(
        f"{BASE_URL}/profiles/me/",
        headers=headers
    )
    print("GET /profiles/me/:", profile_response.status_code)
    if profile_response.status_code == 200:
        print(profile_response.json())
    else:
        print(profile_response.text)
        
    # Test updating the profile
    update_data = {
        "first_name": "Test",
        "last_name": "User Updated",
        "bio": "This is an updated test bio",
        "location": "New Test City",
        "website": "https://example-updated.com",
        "phone": "555-123-4567",
        "display_name": "TestUserUpdated",
        "twitter": "@testuserupdated",
        "instagram": "@testuserupdated",
        "youtube": "Test User Updated",
        "show_in_directory": True,
        "show_stats": True,
        "hide_email": False
    }
    
    update_response = requests.patch(
        f"{BASE_URL}/profiles/update_me/",
        json=update_data,
        headers=headers
    )
    print("PATCH /profiles/update_me/:", update_response.status_code)
    if update_response.status_code == 200:
        print(update_response.json())
    else:
        print(update_response.text)
        
if __name__ == "__main__":
    test_profile_endpoints()
