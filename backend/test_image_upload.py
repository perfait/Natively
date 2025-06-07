import requests

BASE_URL = "http://127.0.0.1:8000/api"
TOKEN = "005832dae8806ca8b5341743a6eb404bea65d509"  # Replace with your actual token

def test_image_upload():
    """Test the profile image upload endpoint"""
    headers = {"Authorization": f"Token {TOKEN}"}
    
    # Test uploading an image
    image_path = "test_image.jpg"  # Create a small test image in the same directory
    
    with open(image_path, 'rb') as image_file:
        files = {'image': ('test_image.jpg', image_file, 'image/jpeg')}
        
        response = requests.post(
            f"{BASE_URL}/profiles/upload-image/",
            headers=headers,
            files=files
        )
        
        print("POST /profiles/upload-image/:", response.status_code)
        if response.status_code == 200:
            print(response.json())
        else:
            print(response.text)
    
if __name__ == "__main__":
    test_image_upload()
