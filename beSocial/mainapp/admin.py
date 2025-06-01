from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'username', 'name', 'dob', 'phone_number', 'is_staff')
    list_filter = ('is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal Info', {'fields': ('name', 'dob', 'phone_number')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'name', 'dob', 'phone_number', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'username', 'name')
    ordering = ('email',)

admin.site.register(User, UserAdmin)
