from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class UserProfile(models.Model):
    """This is user profile model. This will have two user foreign key,we will make it unique togother, i.e.
    a user can't follow same user twice."""

    user = models.ForeignKey(
        User,
        related_name="following",
        on_delete=models.CASCADE
    )
    following_user = models.ForeignKey(
        User,
        related_name="followers",
        on_delete=models.CASCADE
    )

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        # this will ensure no user can follow same user twice
        unique_together = ('user', 'following_user',)

        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"{self.user.username} started following {self.following_user.username}"
