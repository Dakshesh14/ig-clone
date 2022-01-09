from django.urls import path

from .apis import (
    PostsAPI,
    PostDetailAPI,
    AddPostApi,
    PostCommentAPI,
)

urlpatterns = [

    # posts
    path('posts', PostsAPI.as_view(), name='posts'),
    path('post/<slug>', PostDetailAPI.as_view(), name='post'),

    path('add-post', AddPostApi.as_view(), name='add-post'),

    # comments related
    path('comments/<slug>', PostCommentAPI.as_view(), name="post-comments"),
]
