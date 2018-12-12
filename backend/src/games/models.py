from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Game(models.Model):
    notes = models.CharField(max_length=255)
    rating = models.IntegerField()
    gameid = models.CharField(max_length=20)
    image = models.CharField(max_length=120, default="")
    title = models.CharField(max_length=100, default="")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default="")

    def __str__(self):
        return self.gameid
