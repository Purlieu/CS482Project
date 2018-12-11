from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Game(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.CharField(max_length=255)
    rating = models.IntegerField()
    gameid = models.CharField(max_length=20)

    def __str__(self):
        return self.gameid
