# spotify_data/serializers.py
from rest_framework import serializers
from .models import (
    UserProfile,
    TopArtist,
    TopTrack,
    ListeningHistorySnapshot,
    RecentlyPlayedTrack,
    SavedAlbum,
    SavedTrack,
)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["spotify_id", "display_name", "profile_picture_url"]


class TopArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopArtist
        fields = ["artist_id", "name", "genres", "popularity"]


class TopTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopTrack
        fields = ["track_id", "name", "artists", "album_name", "popularity"]


class ListeningHistorySnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListeningHistorySnapshot
        fields = [
            "timestamp",
            "top_artists_data",
            "top_tracks_data",
            "total_listening_time_ms",
        ]


class RecentlyPlayedTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentlyPlayedTrack
        fields = ["track_id", "played_at", "track_name", "artists"]


class SavedAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedAlbum
        fields = ["album_id", "name", "artists"]


class SavedTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedTrack
        fields = ["track_id", "name", "artists"]
