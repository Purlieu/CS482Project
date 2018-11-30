from django.db import models

# Create your models here.


class Game(models.Model):
    title = models.CharField(max_length=120)
    text = models.CharField(max_length=120)

    def __str__(self):
        return self.title
