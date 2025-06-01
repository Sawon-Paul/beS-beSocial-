from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
import random
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, username, name, dob, phone_number, password=None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            name=name,
            dob=dob,
            phone_number=phone_number
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name, dob, phone_number, password=None):
        user = self.create_user(email, username, name, dob, phone_number, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=150)
    dob = models.DateField()
    phone_number = models.CharField(max_length=20)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'dob', 'phone_number']

    def __str__(self):
        return self.email




class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)

    def generate_otp(self):
        self.otp = str(random.randint(100000, 999999))
        self.save()

