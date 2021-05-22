from manager.models import *
from rest_framework import serializers


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ('id', 'lat', 'long', 'issue', 'unit', 'time_created', 'person', 'status')


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ('id', 'name', 'free')


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'first_name', 'last_name', 'post', 'id_telegram')


class PostSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField(required=False)
    class Meta:
        model = Post
        fields = ('id', 'name', 'description')

