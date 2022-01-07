from django.urls import path

from .apis import (
    PostCommentAPI,
)

urlpatterns = [

    # comments related
    path('comments/<slug>', PostCommentAPI.as_view(), name="post-comments"),
]
