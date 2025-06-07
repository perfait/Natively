from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from links.models import Profile

class Command(BaseCommand):
    help = 'Creates a test user with profile'

    def handle(self, *args, **kwargs):
        # Check if test user exists
        if User.objects.filter(username='testuser').exists():
            self.stdout.write(self.style.WARNING('Test user already exists, updating instead'))
            user = User.objects.get(username='testuser')
            user.set_password('testpassword')
            user.email = 'test@example.com'
            user.first_name = 'Test'
            user.last_name = 'User'
            user.save()
        else:
            self.stdout.write(self.style.SUCCESS('Creating test user'))
            user = User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpassword',
                first_name='Test',
                last_name='User'
            )
        
        # Check if profile exists
        try:
            profile = Profile.objects.get(user=user)
            self.stdout.write(self.style.SUCCESS('Test user profile already exists'))
        except Profile.DoesNotExist:
            profile = Profile.objects.create(
                user=user,
                bio='This is a test profile',
                location='Test City',
                website='https://example.com',
                phone='123-456-7890',
                display_name='TestUser123',
                twitter='@testuser',
                instagram='@testuser',
                youtube='Test User',
                show_in_directory=True,
                show_stats=True,
                hide_email=False
            )
            self.stdout.write(self.style.SUCCESS('Created test user profile'))
        
        self.stdout.write(self.style.SUCCESS(f'Test user created/updated: {user.username} (ID: {user.id})'))
