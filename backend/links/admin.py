from django.contrib import admin
from .models import Profile, Link, Click

class LinkInline(admin.TabularInline):
    model = Link
    extra = 1

class ClickInline(admin.TabularInline):
    model = Click
    extra = 0
    readonly_fields = ('clicked_at', 'ip_address')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'slug')
    search_fields = ('user__username', 'slug')
    inlines = [LinkInline]

@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'profile', 'order', 'created_at', 'get_click_count')
    list_filter = ('profile', 'created_at')
    search_fields = ('title', 'url')
    inlines = [ClickInline]
    
    def get_click_count(self, obj):
        return obj.clicks.count()
    get_click_count.short_description = 'Clicks'

@admin.register(Click)
class ClickAdmin(admin.ModelAdmin):
    list_display = ('link', 'clicked_at', 'ip_address')
    list_filter = ('clicked_at',)
    readonly_fields = ('link', 'clicked_at', 'ip_address')
    can_delete = False
