from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
)
from rest_framework import viewsets
from games.models import Game
import re
from.serializers import GameSerializer


class GameListView(ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        user = self.request.user
        gameList = Game.objects.filter(owner=user)
        return gameList


class GameDetailView(RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameCreateView(CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def perform_create(self, serializer):
        print(self.request.data)
        gameid = serializer.validated_data.get('gameid'),
        print(gameid)
        queryset = Game.objects.filter(gameid=gameid[0])
        if queryset.exists():
            print("Inside query")
            queryset.update(
                rating=self.request.data.get('rating'),
                notes=self.request.data.get('notes'),
            )
        else:
            serializer.save(owner=self.request.user)


class GameUpdateView(UpdateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameDeleteView(DestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


# class GameViewSet(viewsets.ModelViewSet):
#     serializer_class = GameSerializer
#     queryset = Game.objects.all()
