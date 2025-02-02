from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import CustomUser,HOD,Teacher,Student


class CustomUserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password', 'name', 'last_login')}),
        ('Permissions', {'fields': (
            'is_active',
            'is_staff',
            'is_superuser',
            'groups',
            'is_student',
            'is_teach',
            'is_HOD',
            
            'user_permissions',
        )}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': ('email', 'password1', 'password2')
            }
        ),
    )

    list_display = ('email', 'name', 'is_staff', 'last_login')
    list_filter = ('is_staff', 'is_teach','is_student','is_superuser','is_HOD', 'is_active', 'groups')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)

class HODAdmin(admin.ModelAdmin):
    readonly_fields = ('refid',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(HOD,HODAdmin)
admin.site.register(Teacher)
admin.site.register(Student)

