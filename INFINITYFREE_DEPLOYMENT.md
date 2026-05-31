# OSCS Central InfinityFree Deployment

Live domain from the hosting dashboard:

```text
osce.rf.gd
```

## Files To Upload

Upload these project files into the website root, usually:

```text
htdocs/
```

Required:

```text
index.html
styles.css
app.js
.htaccess
assets/
api/twitch.php
api/twitch-config.php
api/youtube.php
api/youtube-config.php
api/spotify.php
api/spotify-config.php
```

Optional docs/assets:

```text
OSCS_CENTRAL_MASTER_DEVELOPMENT_DOCUMENT.md
TWITCH_API_SETUP.md
INFINITYFREE_DEPLOYMENT.md
oscs-homepage-preview.png
```

## Create The Private Twitch Config

On the server, create this file:

```text
api/twitch-config.php
```

Use this format:

```php
<?php

return [
    'client_id' => 'nt8kxurj8f7630z3to2c234byc7jko',
    'client_secret' => 'PASTE_TWITCH_CLIENT_SECRET_HERE',
    'logins' => [
        'Sunny',
        'SantiPungas',
        'YoungBaseGo',
        'arky',
        'Yugi2X',
        'noseri',
        '1jdab1',
        'Redify',
        'BigMonRaph',
    ],
];
```

Do not put the Client Secret in `index.html`, `app.js`, or any public JavaScript file.

## Twitch Developer App Fields

Use these values in the Twitch Developer Console:

| Field | Value |
| --- | --- |
| Name | `OSCS Central` |
| OAuth Redirect URL | `https://osce.rf.gd/` |
| Category | `Website Integration` |
| Client Type | `Confidential` |

The current API uses the client credentials flow, so the redirect URL is mainly required to finish app registration. If Twitch rejects the root URL, use:

```text
https://osce.rf.gd/api/twitch.php
```

## Test URLs

Website:

```text
https://osce.rf.gd/
```

Twitch summary API:

```text
https://osce.rf.gd/api/twitch.php?action=summary
```

Twitch clips API:

```text
https://osce.rf.gd/api/twitch.php?action=clips&login=Sunny
```

YouTube latest API:

```text
https://osce.rf.gd/api/youtube.php?action=latest
```

Spotify tracks API:

```text
https://osce.rf.gd/api/spotify.php?action=tracks
```

## Expected API Result

If credentials are correct, `summary` should return JSON with:

```json
{
  "source": "twitch",
  "totalMembers": 9,
  "membersLive": 0,
  "totalLiveViewers": 0,
  "members": []
}
```

The exact member and live data will change depending on who is live.

## Common Issues

If the API says `missing_twitch_credentials`, the server does not have `api/twitch-config.php` or the Client Secret is empty.

If the API says `token_request_failed`, the Client ID or Client Secret is wrong.

If the website loads but Twitch data does not update, open:

```text
https://osce.rf.gd/api/twitch.php?action=summary
```

and check the JSON error message.

If Spotify data does not update, open:

```text
https://osce.rf.gd/api/spotify.php?action=tracks
```
