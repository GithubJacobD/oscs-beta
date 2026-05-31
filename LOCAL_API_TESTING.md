# Local API Testing

The local preview server can test parts of the API before publishing to InfinityFree.

Start or restart the server:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1 -Port 4173
```

Open the website:

```text
http://127.0.0.1:4173/
```

Test Twitch locally:

```text
http://127.0.0.1:4173/api/twitch.php?action=summary
```

Test Spotify locally:

```text
http://127.0.0.1:4173/api/spotify.php?action=tracks
```

Local API support currently covers Twitch summary data and Spotify tracks. YouTube still needs a YouTube Data API key before it can return live video data.

## Current Local Twitch Result

The Twitch API is working locally and currently reports:

```text
Members live: 1
Live member: youngbasedgo
Total live viewers: 721
```

If the Twitch member count is lower than 9, double-check the configured Twitch logins in `api/twitch-config.php`.
