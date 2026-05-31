# OSCS Central Spotify API Setup

Spotify credentials are stored privately in:

```text
api/spotify-config.php
```

The public template is:

```text
api/spotify-config.example.php
```

## Endpoint

Latest staged artist tracks:

```text
https://osce.rf.gd/api/spotify.php?action=tracks
```

The endpoint uses Spotify's client credentials flow server-side, then searches configured artist names and returns album art, release date, artist name, Spotify URL, and preview URL when Spotify provides one.

## Configured Artists

```text
SunnyX
YBG
arky
Yugi2X
nosiiree
flydabl
Redify
```

Artist search can be fuzzy. Spotify artist IDs will be more reliable than names if any result is wrong later.

