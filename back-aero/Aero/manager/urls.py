from django.urls import path, include
from manager.views import *

urlpatterns = [
    path('issues/', IssueList.as_view()),
    path('issues/<int:pk>', IssueDetail.as_view()),
    path('units/', UnitList.as_view()),
    path('units/<int:pk>', UnitDetail.as_view()),
    path('persons/', PersonList.as_view()),
    path('persons/<int:pk>', PersonDetail.as_view()),
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>', PostDetail.as_view()),
]
