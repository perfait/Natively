from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

def generate_tokens():
    """Generate tokens for all users that don't have one."""
    users = User.objects.all()
    count = 0
    for user in users:
        token, created = Token.objects.get_or_create(user=user)
        if created:
            count += 1
            print(f"Created token for user: {user.username}")
    
    print(f"Created {count} new tokens")

# Call the function when executed directly
if __name__ == "__main__":
    generate_tokens()
