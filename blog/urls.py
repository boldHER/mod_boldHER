from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.question_list, name='question_list'),
    url(r'^question/(?P<pk>\d+)/$', views.question_detail, name='question_detail'),
    url(r'^question/new/$', views.question_new, name='question_new'),
    url(r'^question/(?P<pk>\d+)/edit/$', views.question_edit, name='question_edit'),
    url(r'^answer/(?P<pk>\d+)/edit/$', views.answer_edit, name='answer_edit'),
    url(r'^answer/new/(?P<pk>\d+)$', views.answer_new, name='answer_new'),
    url(r'^original$', views.original_page, name="original_page")   
]