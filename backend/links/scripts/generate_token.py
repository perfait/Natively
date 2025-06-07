from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

def generate_token():
    """Generate token for testuser"""
    try:
        # Get testuser
        user = User.objects.get(username='testuser')
        
        # Create or get token
        token, created = Token.objects.get_or_create(user=user)
        
        if created:
            print(f"Token created for {user.username}: {token.key}")
        else:
            print(f"Token already exists for {user.username}: {token.key}")
            
        return token.key
    except User.DoesNotExist:
        print("User 'testuser' does not exist")
        return None
    except Exception as e:
        print(f"Error generating token: {str(e)}")
        return None

if __name__ == "__main__":
    # This allows this script to be run directly using Django shell:
    # python manage.py shell < links/scripts/generate_token.py
    generate_token()
