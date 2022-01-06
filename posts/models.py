from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime

# django image kit model
# https://pypi.org/project/django-imagekit/

from imagekit.models import ProcessedImageField
from imagekit.processors import Resize


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


class PostImage(models.Model):
    image = ProcessedImageField(
        upload_to="posts",
        format="JPEG",
    )
    post = models.ForeignKey('Post', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.post.title


class PostComment(models.Model):
    """This model is for comment in lecture model. This comment will also have a parent of self if there's any parent comment."""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
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
        User, blank=True, related_name='comment_likes')

    posted_on = models.DateTimeField(auto_now_add=True)
    is_edited = models.BooleanField(default=False)

    class LectureCommentModelManager(models.Manager):
        """Had to make this model manager to get all the comments w/o parent i.e. this is
        a comment in lecture instead of a reply."""

        def get_queryset(self):
            queryset = super().get_queryset().filter(parent=None)
            return queryset

    class Meta:
        verbose_name = 'Lecture Comment'
        verbose_name_plural = 'Lecture Comments'

    objects = models.Manager()
    parent_objects = LectureCommentModelManager()

    def get_comment_replies(self):
        return self.replies

    def get_date(self):
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
