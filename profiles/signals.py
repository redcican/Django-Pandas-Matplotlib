from .models import Profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, **kwargs):
    """
    create a profile for the new user once a user is created
    Args:
        sender (django.contrib.auth.User): User
        instance (Profile.user): the instance of the User
        created (bool): if created, create the Profile for the user 
    """
    if created:
        Profile.objects.create(user=instance)