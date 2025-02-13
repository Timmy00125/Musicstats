# spotify_data/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import UserProfileViewSet, AuthViewSet

router = routers.DefaultRouter()
router.register(r"user", UserProfileViewSet, basename="user")
router.register(r"auth", AuthViewSet, basename="auth")


# spotify_data/urls.py
urlpatterns = [
    path("", include(router.urls)),
    path(
        "auth/spotify/callback/",
        AuthViewSet.as_view({"get": "spotify_callback"}),
        name="spotify_callback",
    ),  # Named URL for callback
    path(
        "auth/login/", AuthViewSet.as_view({"get": "login"}), name="spotify_login"
    ),  # Add login URL and method GET
]
