from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'name', 'dob', 'phone_number', 'password', 'password2')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove password2 before creating user
        return User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            name=validated_data['name'],
            dob=validated_data['dob'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )


class LoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email_or_username = data.get('email_or_username')
        password = data.get('password')

        user = User.objects.filter(email=email_or_username).first() or \
               User.objects.filter(username=email_or_username).first()

        if user and user.check_password(password):
            return user
        raise serializers.ValidationError("Invalid credentials")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'name', 'dob', 'phone_number')
