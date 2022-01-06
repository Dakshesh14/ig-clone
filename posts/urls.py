from django.urls import path, include

app_name = 'posts'

urlpatterns = [
    path('api/', include('posts.apis.urls')),
]
