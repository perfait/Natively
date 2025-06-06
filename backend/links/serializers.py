from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Link, Click

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        # Add additional validation logic if needed
        print(f"Validating registration data: {data}")
        return data
    
    def create(self, validated_data):
        print(f"Creating user with data: {validated_data}")
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data.get('email', ''),
                password=validated_data['password']
            )
            # The profile will be created by the signal in signals.py
            # No need to create it here
            print(f"User created successfully: {user.username} (ID: {user.id})")
            return user
        except Exception as e:
            print(f"Error creating user: {str(e)}")
            raise

class ClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Click
        fields = ('id', 'clicked_at', 'ip_address')
        read_only_fields = ('id', 'clicked_at', 'ip_address')

class LinkSerializer(serializers.ModelSerializer):
    click_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Link
        fields = ('id', 'title', 'url', 'order', 'created_at', 'updated_at', 'click_count')
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_click_count(self, obj):
        return obj.clicks.count()

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    links = LinkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = ('id', 'user', 'slug', 'links')
        read_only_fields = ('id', 'user')
