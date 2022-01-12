from django.db.models.fields import files
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
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


class PostsAPI(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostDetailAPI(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'slug'


class AddPostApi(APIView):

    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):

        title = request.data['title']
        post_dict = {'title': title}
        post_serializer = PostSerializer(data=post_dict)

        # print(f"\n\n\{type(request.data['images'][0])}\n\n")

        if post_serializer.is_valid():
            post = post_serializer.save()
        else:
            return Response(post_serializer.errors, status=HTTP_400_BAD_REQUEST)

        images = request.FILES
        images = images.getlist('images')

        for image in images:
            data = {'image': image, 'post': post.pk}
            file_serializer = ImageSerializer(data=data)
            if file_serializer.is_valid():
                file_serializer.save()
            else:
                post.delete()
                return Response(data=file_serializer.errors, status=HTTP_400_BAD_REQUEST)

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
                parent_qs = get_object_or_404(PostComment, pk=parent)
            else:
                parent_qs = None

            instance = serializer.save(
                user=self.request.user,
                content=content,
                parent=parent_qs,
                post=post_qs,
            )
            instance.likes.add(self.request.user)

            return Response(data=serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
