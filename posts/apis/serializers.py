from rest_framework import serializers


from posts.models import (
    Post,
    PostComment,
    PostImage,
)


class PostCommentSerializer(serializers.ModelSerializer):

    likes = serializers.IntegerField(source="get_likes_count", read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    reply_count = serializers.IntegerField(
        source="get_reply_count",
        read_only=True
    )
    post_ago = serializers.CharField(
        source="get_post_naturaltime",
        read_only=True
    )
    replies = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PostComment
        exclude = (
            'post',
            'parent',
            'posted_on',
        )
        read_only_fields = (
            'is_edited',
        )

    def get_replies(self, obj):
        serializer_context = {'request': self.context.get('request')}

        children = obj.get_comment_replies()
        if not children.exists():
            return None
        serializered_children = PostCommentSerializer(
            children,
            many=True,
            context=serializer_context
        )
        return serializered_children.data

    def get_liked(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
        else:
            user = None
        if user and user in obj.likes.all():
            return True
        return False
