from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet, basename='profile')
router.register(r'links', views.LinkViewSet, basename='link')
router.register(r'clicks', views.ClickViewSet, basename='click')

# The API URLs are now determined automatically by the router
app_name = 'links'
urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.RegisterAPI.as_view(), name='register'),
    path('auth/token/', obtain_auth_token, name='token_obtain'),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('p/<str:slug>/', views.get_profile_by_slug, name='profile-by-slug'),
    path('track-click/<int:link_id>/', views.track_click, name='track-click'),
]
