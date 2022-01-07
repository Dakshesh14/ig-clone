from django.contrib import admin

from .models import (
    Post,
    PostImage,
    PostComment,
)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    '''Admin View for Post'''

    class PostInline(admin.StackedInline):
        model = PostImage
        extra = 1
        min_num = 1
        max_num = 10
        can_delete = False

    list_display = ('title',)
    list_display_links = ('title',)
    readonly_fields = ('slug',)
    inlines = [
        PostInline,
    ]


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    '''Admin View for PostComment'''

    list_display = ('post',)
    list_display_links = ('post',)


@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    pass
