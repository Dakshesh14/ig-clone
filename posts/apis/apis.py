from django.db.models import query
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny


from posts.models import (
    Post,
    PostImage,
    PostComment,
)

from .serializers import (
    PostSerializer,
    ImageSerializer,
    PostCommentSerializer,
)


class PostAPI(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class AddPostApi(APIView):

    def post(self, request, *args, **kwargs):
        title = request.data['title']
        post_dict = {'title': title}
        post_serializer = PostSerializer(data=post_dict)

        if post_serializer.is_valid():
            post = post_serializer.save()
        else:
            return Response(post_serializer.errors, status=HTTP_400_BAD_REQUEST)

        images = request.data['images']

        for image in images:
            data = {'image': image, 'post': post}
            file_serializer = ImageSerializer(data=data)
            if file_serializer.is_valid():
                file_serializer.save()

        return Response(data={
            "message": "Post created successfully."
        }, status=HTTP_201_CREATED)


class PostCommentAPI(generics.ListCreateAPIView):
    serializer_class = PostCommentSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        slug = self.kwargs.get('slug', None)
        post_qs = get_object_or_404(Post, slug=slug)
        qs = PostComment.parent_objects.filter(post=post_qs).all()
        return qs

    def post(self, request, slug=None, format=None, *args, **kwargs):
        post_qs = get_object_or_404(Post, slug=slug)

        serializer = PostCommentSerializer(data=request.data)

        if serializer.is_valid():
            content = request.data.get("content")
            parent = request.data.get("parent_id")

            if parent:
                parent_qs = get_object_or_404(PostComment, slug=parent)
            else:
                parent_qs = None

            instance = serializer.save(
                content=content,
                parent=parent_qs,
                post=post_qs,
            )
            instance.likes.add(self.request.user)

            return Response(data=serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
