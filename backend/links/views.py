from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.authtoken.models import Token
from .models import Profile, Link, Click
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    ProfileSerializer,
    LinkSerializer,
    ClickSerializer
)

class RegisterAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print("RegisterAPI.post called with data:", request.data)
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                print("Serializer is valid, saving user")
                user = serializer.save()
                print(f"User created: {user.username} (ID: {user.id})")
                token, created = Token.objects.get_or_create(user=user)
                print(f"Token created: {token.key}")
                return Response({
                    "user": UserSerializer(user, context=self.get_serializer_context()).data,
                    "token": token.key
                })
            else:
                print("Serializer validation errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Exception in RegisterAPI.post: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Profile.objects.all()
        return Profile.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LinkViewSet(viewsets.ModelViewSet):
    serializer_class = LinkSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Link.objects.all()
        return Link.objects.filter(profile__user=self.request.user)
    
    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        serializer.save(profile=profile)

class ClickViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClickSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Click.objects.all()
        return Click.objects.filter(link__profile__user=self.request.user)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_profile_by_slug(request, slug):
    profile = get_object_or_404(Profile, slug=slug)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def track_click(request, link_id):
    link = get_object_or_404(Link, id=link_id)
    click = Click.objects.create(
        link=link,
        ip_address=request.META.get('REMOTE_ADDR')
    )
    return Response({'status': 'success'}, status=status.HTTP_200_OK)
