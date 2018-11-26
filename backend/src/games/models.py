from django.db import models

# Create your models here.


class Game(models.Model):
    title = models.CharField(max_length=120, default="")
    text = models.CharField(max_length=120, default="")

    def __str__(self):
        return self.title
