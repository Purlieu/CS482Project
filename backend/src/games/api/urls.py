from django.urls import path, include

from .views import (
    GameListView,
    GameDetailView,
    GameCreateView,
    GameDeleteView,
    GameUpdateView,
    GameViewSet,
)

from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', GameViewSet, base_name='games')
urlpatterns = router.urls

""" urlpatterns = [
    path('', GameListView.as_view()),
    path('create/', GameCreateView.as_view()),
    path('<pk>', GameDetailView.as_view()),
    path('<pk>/update/', GameUpdateView.as_view()),
    path('<pk>/delete/', GameDeleteView.as_view()),
] """
