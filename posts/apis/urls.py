from django.urls import path

from posts.models import Post

from .apis import (
    PostAPI,
    PostCommentAPI,
)

urlpatterns = [

    # posts
    path('posts', PostAPI.as_view(), name='posts'),

    # comments related
    path('comments/<slug>', PostCommentAPI.as_view(), name="post-comments"),
]
