# OSCS Central YouTube API Setup

Google OAuth client created:

```text
139699710021-casm1832grnovh81780m82rk1lncaqta.apps.googleusercontent.com
```

The OAuth client secret is stored only in:

```text
api/youtube-config.php
```

Do not put the OAuth secret in frontend JavaScript.

## Important Difference

For OSCS Central's public YouTube sections, a YouTube Data API key is the best credential. The OAuth client ID and secret are used when a user signs in and authorizes private account access.

The current website needs public data:

- Latest videos
- Newest video
- Shorts
- Channel metadata

That should use a YouTube Data API key.

## Next Step In Google Cloud

Create an API key:

1. Go to Google Cloud Console.
2. Open APIs & Services.
3. Make sure YouTube Data API v3 is enabled.
4. Go to Credentials.
5. Create Credentials.
6. Choose API key.
7. Restrict the key to YouTube Data API v3.
8. Add the key to `api/youtube-config.php`.

Set:

```php
'api_key' => 'YOUR_YOUTUBE_DATA_API_KEY',
```

## Endpoint

Latest videos:

```text
https://osce.rf.gd/api/youtube.php?action=latest
```

Channels:

```text
https://osce.rf.gd/api/youtube.php?action=channels
```

## Handles And Channel IDs

The config supports both:

```php
'handles' => [
    'YourSunny',
    'SantiPungas',
],
```

and:

```php
'channel_ids' => [
    'UCxxxxxxxxxxxxxxxxxxxxxx',
],
```

Channel IDs are more reliable than handles, especially for creators with multiple channels.

