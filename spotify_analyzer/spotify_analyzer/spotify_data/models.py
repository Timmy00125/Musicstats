from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# spotify_data/models.py


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )  # Link to Django User model
    spotify_id = models.CharField(max_length=200, unique=True)
    display_name = models.CharField(max_length=200, blank=True, null=True)
    profile_picture_url = models.URLField(blank=True, null=True)
    access_token = models.TextField()  # Store access token
    refresh_token = models.TextField()  # Store refresh token

    def __str__(self):
        return self.display_name or self.spotify_id


class TopArtist(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="top_artists", on_delete=models.CASCADE
    )
    artist_id = models.CharField(max_length=200)
    name = models.CharField(max_length=255)
    genres = models.JSONField(default=list)  # Store genres as JSON array
    popularity = models.IntegerField()

    class Meta:
        unique_together = ("user_profile", "artist_id")

    def __str__(self):
        return f"{self.name} - {self.user_profile.display_name or self.user_profile.spotify_id}"


class TopTrack(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="top_tracks", on_delete=models.CASCADE
    )
    track_id = models.CharField(max_length=200)
    name = models.CharField(max_length=255)
    artists = models.JSONField(default=list)  # Store artists as JSON array
    album_name = models.CharField(max_length=255)
    popularity = models.IntegerField()

    class Meta:
        unique_together = ("user_profile", "track_id")

    def __str__(self):
        return f"{self.name} - {self.user_profile.display_name or self.user_profile.spotify_id}"


class ListeningHistorySnapshot(models.Model):
    user_profile = models.ForeignKey(
        UserProfile,
        related_name="listening_history_snapshots",
        on_delete=models.CASCADE,
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    top_artists_data = models.JSONField(
        default=list
    )  # Store top artists snapshot as JSON array
    top_tracks_data = models.JSONField(
        default=list
    )  # Store top tracks snapshot as JSON array
    total_listening_time_ms = models.IntegerField(
        default=0
    )  # Example - can be calculated later

    def __str__(self):
        return f"Snapshot for {self.user_profile.display_name or self.user_profile.spotify_id} - {self.timestamp}"


class RecentlyPlayedTrack(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="recently_played_tracks", on_delete=models.CASCADE
    )
    track_id = models.CharField(max_length=200)
    played_at = models.DateTimeField()
    track_name = models.CharField(
        max_length=255, blank=True, null=True
    )  # Add track name and artist for easier display
    artists = models.JSONField(default=list, blank=True, null=True)

    def __str__(self):
        return f"{self.track_name or self.track_id} - {self.user_profile.display_name or self.user_profile.spotify_id} - {self.played_at}"


class SavedAlbum(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="saved_albums", on_delete=models.CASCADE
    )
    album_id = models.CharField(max_length=200)
    name = models.CharField(max_length=255)
    artists = models.JSONField(default=list)

    class Meta:
        unique_together = ("user_profile", "album_id")

    def __str__(self):
        return f"{self.name} - {self.user_profile.display_name or self.user_profile.spotify_id}"


class SavedTrack(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="saved_tracks", on_delete=models.CASCADE
    )
    track_id = models.CharField(max_length=200)
    name = models.CharField(max_length=255)
    artists = models.JSONField(default=list)

    class Meta:
        unique_together = ("user_profile", "track_id")

    def __str__(self):
        return f"{self.name} - {self.user_profile.display_name or self.user_profile.spotify_id}"
