from django.contrib import admin
from manager.models import *


class AdminUnit(admin.ModelAdmin):
    list_display = ['name', 'free']

    class Meta:
        verbose_name = "Юнит"


class AdminIssue(admin.ModelAdmin):
    list_display = ['issue', 'unit', 'time_created', 'time_finish', 'person', 'status']

    class Meta:
        verbose_name = "Задача"


class AdminPerson(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'post']

    class Meta:
        verbose_name = "Персонаж"


class AdminPost(admin.ModelAdmin):
    list_display = ['name']

    class Meta:
        verbose_name = "Должность"


class AdminShifts(admin.ModelAdmin):
    list_display = ['name', 'shift_duration']

    class Meta:
        verbose_name = "Смена"


class AdminProblem(admin.ModelAdmin):
    list_display = ['name']

    class Meta:
        verbose_name = "Ghj,ktvf"


admin.site.register(Unit, AdminUnit)
admin.site.register(Issue, AdminIssue)
admin.site.register(Person, AdminPerson)
admin.site.register(Post, AdminPost)
admin.site.register(Shifts, AdminShifts)
admin.site.register(Problem, AdminProblem)
