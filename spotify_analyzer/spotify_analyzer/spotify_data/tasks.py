# spotify_data/tasks.py
from celery import shared_task
import requests
import json
from django.utils import timezone
from .models import (
    UserProfile,
    TopArtist,
    TopTrack,
    ListeningHistorySnapshot,
    RecentlyPlayedTrack,
    SavedAlbum,
    SavedTrack,
)


@shared_task
def fetch_and_update_spotify_data_task(user_profile_id):
    try:
        user_profile = UserProfile.objects.get(pk=user_profile_id)
        access_token = user_profile.access_token

        # Fetch Top Artists
        top_artists_data = _fetch_spotify_data(
            access_token, "/me/top/artists?time_range=medium_term&limit=50"
        )
        if top_artists_data and "items" in top_artists_data:
            TopArtist.objects.filter(
                user_profile=user_profile
            ).delete()  # Clear old data
            for artist_data in top_artists_data["items"]:
                TopArtist.objects.create(
                    user_profile=user_profile,
                    artist_id=artist_data["id"],
                    name=artist_data["name"],
                    genres=artist_data["genres"],
                    popularity=artist_data["popularity"],
                )

        # Fetch Top Tracks
        top_tracks_data = _fetch_spotify_data(
            access_token, "/me/top/tracks?time_range=medium_term&limit=50"
        )
        if top_tracks_data and "items" in top_tracks_data:
            TopTrack.objects.filter(
                user_profile=user_profile
            ).delete()  # Clear old data
            for track_data in top_tracks_data["items"]:
                artist_names = [artist["name"] for artist in track_data["artists"]]
                TopTrack.objects.create(
                    user_profile=user_profile,
                    track_id=track_data["id"],
                    name=track_data["name"],
                    artists=artist_names,
                    album_name=track_data["album"]["name"],
                    popularity=track_data["popularity"],
                )

        # Fetch Recently Played Tracks
        recently_played_data = _fetch_spotify_data(
            access_token, "/me/player/recently-played?limit=50"
        )
        if recently_played_data and "items" in recently_played_data:
            RecentlyPlayedTrack.objects.filter(
                user_profile=user_profile
            ).delete()  # Clear old data - or implement update logic
            for item in recently_played_data["items"]:
                track = item["track"]
                artist_names = [artist["name"] for artist in track["artists"]]
                RecentlyPlayedTrack.objects.create(
                    user_profile=user_profile,
                    track_id=track["id"],
                    played_at=item["played_at"],
                    track_name=track["name"],
                    artists=artist_names,
                )

        # Fetch Saved Albums
        saved_albums_data = _fetch_spotify_data(access_token, "/me/albums?limit=50")
        if saved_albums_data and "items" in saved_albums_data:
            SavedAlbum.objects.filter(user_profile=user_profile).delete()
            for item in saved_albums_data["items"]:
                album = item["album"]
                artist_names = [artist["name"] for artist in album["artists"]]
                SavedAlbum.objects.create(
                    user_profile=user_profile,
                    album_id=album["id"],
                    name=album["name"],
                    artists=artist_names,
                )

        # Fetch Saved Tracks
        saved_tracks_data = _fetch_spotify_data(access_token, "/me/tracks?limit=50")
        if saved_tracks_data and "items" in saved_tracks_data:
            SavedTrack.objects.filter(user_profile=user_profile).delete()
            for item in saved_tracks_data["items"]:
                track = item["track"]
                artist_names = [artist["name"] for artist in track["artists"]]
                SavedTrack.objects.create(
                    user_profile=user_profile,
                    track_id=track["id"],
                    name=track["name"],
                    artists=artist_names,
                )

        # Create Listening History Snapshot (Example - you can customize what to include)
        ListeningHistorySnapshot.objects.create(
            user_profile=user_profile,
            top_artists_data=list(
                TopArtist.objects.filter(user_profile=user_profile).values(
                    "artist_id", "name", "genres", "popularity"
                )
            ),
            top_tracks_data=list(
                TopTrack.objects.filter(user_profile=user_profile).values(
                    "track_id", "name", "artists", "album_name", "popularity"
                )
            ),
            total_listening_time_ms=0,  # Calculate listening time if needed and store here
        )

        return f"Spotify data updated for user {user_profile.display_name or user_profile.spotify_id}"

    except UserProfile.DoesNotExist:
        return f"UserProfile with id {user_profile_id} not found."
    except Exception as e:
        return f"Error updating Spotify data for user {user_profile_id}: {str(e)}"


def _fetch_spotify_data(access_token, endpoint):
    headers = {"Authorization": f"Bearer {access_token}"}
    base_url = "https://api.spotify.com/v1"
    url = base_url + endpoint
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise HTTPError for bad responses
    return response.json()
