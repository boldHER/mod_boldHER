from django.db import models
from django.utils import timezone

class Category(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Question(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    question_text = models.TextField()
    published_date = models.DateTimeField(
            blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

class Answer(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    answer_text = models.TextField()
    published_date = models.DateTimeField(
            blank=True, null=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.answer_text

class Comment(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    comment_text = models.TextField()
    published_date = models.DateTimeField(
            blank=True, null=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
