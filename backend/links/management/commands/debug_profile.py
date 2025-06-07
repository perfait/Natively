from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from links.models import Profile
import json

class Command(BaseCommand):
    help = 'Debug profile API for a given user'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username to debug')

    def handle(self, *args, **options):
        username = options['username']
        
        try:
            user = User.objects.get(username=username)
            self.stdout.write(self.style.SUCCESS(f'Found user: {user.username} (ID: {user.id})'))
            
            # Get or create token
            token, created = Token.objects.get_or_create(user=user)
            self.stdout.write(self.style.SUCCESS(f'Token: {token.key}'))
            
            # Get profile
            try:
                profile = Profile.objects.get(user=user)
                self.stdout.write(self.style.SUCCESS(f'Profile found (ID: {profile.id})'))
                
                # Print profile data
                profile_data = {
                    'id': profile.id,
                    'user_id': profile.user_id,
                    'slug': profile.slug,
                    'bio': profile.bio,
                    'location': profile.location,
                    'website': profile.website,
                    'phone': profile.phone,
                    'profile_image': str(profile.profile_image) if profile.profile_image else None,
                    'display_name': profile.display_name,
                    'twitter': profile.twitter,
                    'instagram': profile.instagram,
                    'youtube': profile.youtube,
                    'show_in_directory': profile.show_in_directory,
                    'show_stats': profile.show_stats,
                    'hide_email': profile.hide_email,
                }
                
                self.stdout.write(json.dumps(profile_data, indent=2))
                
                # Print API endpoints
                self.stdout.write('\nAPI Endpoints:')
                self.stdout.write(f'GET /api/profiles/me/ - Get current user profile')
                self.stdout.write(f'PATCH /api/profiles/update_me/ - Update profile')
                self.stdout.write(f'POST /api/profiles/upload-image/ - Upload profile image')
                self.stdout.write('\nExample API calls:')
                self.stdout.write(f'curl -H "Authorization: Token {token.key}" http://localhost:8000/api/profiles/me/')
                
            except Profile.DoesNotExist:
                self.stdout.write(self.style.ERROR('Profile not found!'))
                
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'User {username} not found!'))
