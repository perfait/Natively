from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Create auth tokens for all users'

    def handle(self, *args, **options):
        users = User.objects.all()
        count = 0
        for user in users:
            token, created = Token.objects.get_or_create(user=user)
            if created:
                count += 1
                self.stdout.write(f"Created token for user: {user.username}")
        
        self.stdout.write(self.style.SUCCESS(f"Created {count} new tokens"))
