from django import forms

from .models import Question, Answer

class QuestionForm(forms.ModelForm):

    class Meta:
        model = Question
        fields = ('title', 'author', 'question_text', 'category')


class AnswerForm(forms.ModelForm):

    class Meta:
        model = Answer
        fields = ('author', 'answer_text',)