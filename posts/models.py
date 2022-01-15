from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime

# django image kit model
# https://pypi.org/project/django-imagekit/

from imagekit.models import ProcessedImageField
from imagekit.processors import Resize


from utility.helpers import random_string_generator

User = get_user_model()


class Post(models.Model):
    """This is the post model. Each post will have one or more pic associated with it. Pic will be linked using ManyToOne relation.
    A Post may or maynot have comment associated with it, if there's a comment then it will be also ManyToOne relation."""

    user = models.ForeignKey(
        User,
        related_name='author',
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=75)
    slug = models.SlugField()
    posted_on = models.DateTimeField(auto_now_add=True)

    likes = models.ManyToManyField(
        User,
        related_name='likes',
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = random_string_generator()
        super(Post, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'

    def get_natural_time(self):
        return naturaltime(self.posted_on)

    def get_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title


class PostImage(models.Model):
    image = ProcessedImageField(
        upload_to="posts/%Y/%m/%d",
        format="JPEG",
        processors=[Resize(700, 700)],
    )
    post = models.ForeignKey(
        'Post',
        on_delete=models.CASCADE,
        related_name='post_images'
    )

    def __str__(self) -> str:
        return self.post.title


class PostComment(models.Model):
    """This model is for comment in post model. This comment will also have a parent of self if there's any parent comment."""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    content = models.CharField(max_length=255)

    post = models.ForeignKey(
        'Post',
        related_name='comments',
        on_delete=models.CASCADE
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='replies',
        null=True,
        blank=True,
    )

    likes = models.ManyToManyField(
        User,
        blank=True,
        related_name='comment_likes'
    )

    posted_on = models.DateTimeField(auto_now_add=True)
    is_edited = models.BooleanField(default=False)

    class PostCommentModelManager(models.Manager):
        """Had to make this model manager to get all the comments w/o parent i.e. this is
        a comment in lecture instead of a reply."""

        def get_queryset(self):
            queryset = super().get_queryset().filter(parent=None)
            return queryset

    class Meta:
        verbose_name = 'Post Comment'
        verbose_name_plural = 'Post Comments'

    objects = models.Manager()
    parent_objects = PostCommentModelManager()

    def get_comment_replies(self):
        return self.replies

    def get_post_naturaltime(self):
        return naturaltime(self.posted_on)

    def get_likes_count(self):
        return int(self.likes.count())

    def get_reply_count(self):
        return int(self.get_comment_replies().count())

    def save(self, *args, **kwargs):
        if self.pk or not self._state.adding:
            self.is_edited = True
        super(PostComment, self).save(*args, **kwargs)

    def __str__(self):
        return self.content
