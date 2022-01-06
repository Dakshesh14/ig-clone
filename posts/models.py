from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime

User = get_user_model()


class Post(models.Model):
    """This is the post model. Each post will have one or more pic associated with it. Pic will be linked using ManyToOne relation.
    A Post may or maynot have comment associated with it, if there's a comment then it will be also ManyToOne relation."""

    title = models.CharField(max_length=75)
    posted_on = models.DateTimeField(auto_now_add=True)

    liked_by = models.ManyToManyField(
        User,
        related_name='likes'
    )

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'

    def get_natural_time(self):
        return naturaltime(self.posted_on)

    def get_likes(self):
        return self.liked_by.count()

    def __str__(self):
        return self
