from django.urls import path, include
from django.urls import path, include
from .api import (
    RegisterAPI,
    LoginAPI,
    UserAPI,
    UserProfileDetailAPI,
)

# importing knox
from knox import views as knox_views

urlpatterns = [
    path('', include('knox.urls')),
    path('user-profile/<str:user__username>', UserProfileDetailAPI.as_view()),
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('user', UserAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
