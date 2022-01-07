from django.urls import path

from posts.models import Post

from .apis import (
    PostAPI,
    AddPostApi,
    PostCommentAPI,
)

urlpatterns = [

    # posts
    path('posts', PostAPI.as_view(), name='posts'),

    path('add-post', AddPostApi.as_view(), name='add-post'),

    # comments related
    path('comments/<slug>', PostCommentAPI.as_view(), name="post-comments"),
]
