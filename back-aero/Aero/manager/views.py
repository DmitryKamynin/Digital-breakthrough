from manager.serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class IssueList(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


@method_decorator(csrf_exempt, name='dispatch')
class IssueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


@method_decorator(csrf_exempt, name='dispatch')
class UnitList(generics.ListCreateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


@method_decorator(csrf_exempt, name='dispatch')
class UnitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


@method_decorator(csrf_exempt, name='dispatch')
class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


@method_decorator(csrf_exempt, name='dispatch')
class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


@method_decorator(csrf_exempt, name='dispatch')
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


@method_decorator(csrf_exempt, name='dispatch')
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer