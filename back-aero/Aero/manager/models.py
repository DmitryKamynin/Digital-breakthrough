from django.db import models


class Issue(models.Model):
    lat = models.FloatField(verbose_name="Широта")
    long = models.FloatField(verbose_name="Долгота")
    issue = models.CharField(max_length=255, verbose_name="Задача")
    unit = models.CharField(max_length=100, verbose_name="Юнит")  # Юнит(Техника)
    time_created = models.DateTimeField(auto_now=True, verbose_name="Время создания задачи")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Время обновления задачи")
    time_finish = models.DateTimeField(auto_now=True, verbose_name="Время закрытия задачи")
    person = models.CharField(max_length=100, verbose_name="Персонаж")  # Персонаж(Работник)
    status = models.CharField(max_length=100, verbose_name="Статус исполнения задачи")

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

    def __str__(self):
        return self.issue


class Unit(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название техники")
    free = models.BooleanField(default=True, verbose_name="Статус доступности")  # Занят / Свободен

    class Meta:
        verbose_name = "Юнит"
        verbose_name_plural = "Юниты"

    def __str__(self):
        return self.name


class Person(models.Model):
    id_telegram = models.IntegerField(verbose_name="ID телеграмма работника")
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    post = models.CharField(max_length=100, verbose_name="Занимаемая должность")

    class Meta:
        verbose_name = "Персонаж"
        verbose_name_plural = "Персонажи"

    def __str__(self):
        return self.last_name


class Post(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название должности")

    class Meta:
        verbose_name = "Должность"
        verbose_name_plural = "Должности"

    def __str__(self):
        return self.name


class Shifts(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название смены")  # Название смены(1, 2, 3, "Первая", "Вторая" и тд.)
    shift_duration = models.TimeField(verbose_name="Длительность смены")

    class Meta:
        verbose_name = "Смена"
        verbose_name_plural = "Смены"

    def __str__(self):
        return self.name


class Problem(models.Model):
    name = models.CharField(max_length=255, verbose_name="Проблема")

    class Meta:
        verbose_name = "Проблема"
        verbose_name_plural = "Проблемы"

    def __str__(self):
        return self.name
