# OSCS Central Twitch API Setup

This project includes a server-side Twitch API endpoint for InfinityFree/PHP hosting:

```text
api/twitch.php
```

The frontend can keep using mock data locally, then use live Twitch data when this PHP endpoint is deployed with your credentials.

## Twitch Developer Console

Use these values when registering the application:

| Field | Value |
| --- | --- |
| Name | `OSCS Central` |
| OAuth Redirect URL | `http://localhost:3000` for local OAuth testing, or your final HTTPS callback URL |
| Category | `Website Integration` |
| Client Type | `Confidential` |

For the current API endpoint, the redirect URL is mostly a registration requirement. The endpoint uses the Twitch client credentials flow, which needs a Client ID and Client Secret but does not redirect users through login.

## Credentials

Your current Client ID:

```text
nt8kxurj8f7630z3to2c234byc7jko
```

You still need the Client Secret from the app's Twitch console page.

Do not paste the Client Secret into `app.js`, `index.html`, or any public frontend file.

## Local Config File

Copy:

```text
api/twitch-config.example.php
```

to:

```text
api/twitch-config.php
```

Then set:

```php
'client_secret' => 'YOUR_SECRET_HERE',
```

`api/twitch-config.php` is ignored by Git so the secret does not get committed.

## Environment Variable Option

Instead of using `api/twitch-config.php`, you can set:

```text
TWITCH_CLIENT_ID
TWITCH_CLIENT_SECRET
TWITCH_LOGINS
```

Example `TWITCH_LOGINS`:

```text
Sunny,SantiPungas,YoungBaseGo,arky,Yugi2X,noseri,1jdab1,Redify,BigMonRaph
```

## Endpoints

Summary:

```text
/api/twitch.php?action=summary
```

Clips for one member:

```text
/api/twitch.php?action=clips&login=Sunny
```

## Frontend Integration

The static website can call `api/twitch.php?action=summary` after deployment. If the API is unavailable, it should continue showing the current mock data.
