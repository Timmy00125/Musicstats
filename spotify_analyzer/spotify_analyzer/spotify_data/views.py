from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.models import User
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import AuthException
import requests
import json

from .models import (
    UserProfile,
    TopArtist,
    TopTrack,
    ListeningHistorySnapshot,
    RecentlyPlayedTrack,
    SavedAlbum,
    SavedTrack,
)
from .serializers import (
    UserProfileSerializer,
    TopArtistSerializer,
    TopTrackSerializer,
    ListeningHistorySnapshotSerializer,
    RecentlyPlayedTrackSerializer,
    SavedAlbumSerializer,
    SavedTrackSerializer,
)
from .tasks import fetch_and_update_spotify_data_task


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Allow unauthenticated access to AuthViewSet

    @action(detail=False, methods=["get"])
    def login(self, request):
        strategy = load_strategy(request)
        backend_name = "spotify"
        backend = load_backend(
            strategy, backend_name, redirect_uri=reverse("spotify_callback")
        )  # Define spotify_callback URL
        redirect_uri = backend.redirect_uri
        return redirect(backend.auth_url())

    @action(detail=False, methods=["get"], url_path="spotify/callback")
    def spotify_callback(self, request):
        strategy = load_strategy(request)
        backend_name = "spotify"
        backend = load_backend(
            strategy, backend_name, redirect_uri=reverse("spotify_callback")
        )
        try:
            user = backend.complete(request=request)
        # Complete auth process
        except AuthException as e:
            return Response(
                {"error": "Authentication failed", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user and user.is_active:
            from django.contrib.auth import login as django_login

            django_login(request, user)
            # Create or update UserProfile after successful login
            social_user = user.social_auth.get(provider="spotify")
            access_token = social_user.extra_data["access_token"]
            refresh_token = social_user.extra_data["refresh_token"]
            spotify_user_data = self._get_spotify_user_profile(access_token)

            user_profile, created = UserProfile.objects.update_or_create(
                user=user,
                defaults={
                    "spotify_id": spotify_user_data.get("id"),
                    "display_name": spotify_user_data.get("display_name"),
                    "profile_picture_url": (
                        spotify_user_data.get("images")[0]["url"]
                        if spotify_user_data.get("images")
                        else None
                    ),
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                },
            )
            return redirect(reverse("user-list"))  # Redirect to user profile view
        else:
            return Response(
                {"error": "Login failed"}, status=status.HTTP_400_BAD_REQUEST
            )

    def _get_spotify_user_profile(self, access_token):
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get("https://api.spotify.com/v1/me", headers=headers)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        return response.json()


class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def get_object(self):
        return self.get_queryset().first()  # Return the user's profile

    @action(detail=False, methods=["get"])
    def top_artists(self, request):
        user_profile = self.get_object()
        top_artists = TopArtist.objects.filter(user_profile=user_profile).order_by(
            "-popularity"
        )[
            :50
        ]  # Limit to top 50
        serializer = TopArtistSerializer(top_artists, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def top_tracks(self, request):
        user_profile = self.get_object()
        top_tracks = TopTrack.objects.filter(user_profile=user_profile).order_by(
            "-popularity"
        )[
            :50
        ]  # Limit to top 50
        serializer = TopTrackSerializer(top_tracks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def listening_history(self, request):
        user_profile = self.get_object()
        history = ListeningHistorySnapshot.objects.filter(
            user_profile=user_profile
        ).order_by("-timestamp")[
            :10
        ]  # Last 10 snapshots
        serializer = ListeningHistorySnapshotSerializer(history, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def sync_data(self, request):
        user_profile = self.get_object()
        if user_profile:
            fetch_and_update_spotify_data_task.delay(
                user_profile.id
            )  # Dispatch Celery task
            return Response(
                {"status": "Data sync started in background"},
                status=status.HTTP_202_ACCEPTED,
            )
        else:
            return Response(
                {"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["get"])
    def recently_played(self, request):
        user_profile = self.get_object()
        recently_played = RecentlyPlayedTrack.objects.filter(
            user_profile=user_profile
        ).order_by("-played_at")[:50]
        serializer = RecentlyPlayedTrackSerializer(recently_played, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def saved_albums(self, request):
        user_profile = self.get_object()
        saved_albums = SavedAlbum.objects.filter(user_profile=user_profile)
        serializer = SavedAlbumSerializer(saved_albums, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def saved_tracks(self, request):
        user_profile = self.get_object()
        saved_tracks = SavedTrack.objects.filter(user_profile=user_profile)
        serializer = SavedTrackSerializer(saved_tracks, many=True)
        return Response(serializer.data)
