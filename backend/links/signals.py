from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    print(f"Signal triggered for user: {instance.username}, created={created}")
    if created:
        try:
            profile, created = Profile.objects.get_or_create(user=instance)
            print(f"Profile {'created' if created else 'already exists'} for user: {instance.username}")
        except Exception as e:
            print(f"Error creating profile: {str(e)}")
