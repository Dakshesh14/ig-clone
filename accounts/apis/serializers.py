from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from accounts.models import (
    UserProfile,
)

from posts.apis.serializers import (
    PostSerializer,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"
        excludes = (
            'created'
        )

    def get_posts(self, obj):
        serializer_context = {'request': self.context.get('request')}

        children = obj.user.author
        if not children.exists():
            return None
        serializered_children = PostSerializer(
            children,
            many=True,
            context=serializer_context
        )
        return serializered_children.data
