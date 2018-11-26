from rest_framework.generics import ListAPIView, RetrieveAPIView
from games.models import Game
from.serializers import GameSerializer


class GameListView(ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameDetailView(RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
