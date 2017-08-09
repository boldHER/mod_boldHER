from django.contrib import admin
from .models import Category
from .models import Question
from .models import Answer
from .models import Comment

admin.site.register(Category)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Comment)