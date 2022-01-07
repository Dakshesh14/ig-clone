from django.urls import path

from .apis import (
    PostCommentAPI,
)

urlpatterns = [

    # comments related
    path('comments/<pk>', PostCommentAPI.as_view(), name="post-comments"),
]
