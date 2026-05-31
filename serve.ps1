param(
  [int]$Port = 4173
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "Serving $root at http://127.0.0.1:$Port/"

function Send-Json($context, $payload, $status = 200) {
  $json = $payload | ConvertTo-Json -Depth 20 -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  $context.Response.StatusCode = $status
  $context.Response.ContentType = "application/json; charset=utf-8"
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.Close()
}

function Get-PhpStringValue($path, $key) {
  if (-not [System.IO.File]::Exists($path)) {
    return ""
  }

  $text = [System.IO.File]::ReadAllText($path)
  $pattern = "'" + [regex]::Escape($key) + "'\s*=>\s*'([^']*)'"
  $match = [regex]::Match($text, $pattern)
  if ($match.Success) {
    return $match.Groups[1].Value
  }

  return ""
}

function Get-PhpArrayValues($path, $key) {
  if (-not [System.IO.File]::Exists($path)) {
    return @()
  }

  $text = [System.IO.File]::ReadAllText($path)
  $pattern = "'" + [regex]::Escape($key) + "'\s*=>\s*\[(.*?)\]"
  $match = [regex]::Match($text, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $match.Success) {
    return @()
  }

  return [regex]::Matches($match.Groups[1].Value, "'([^']*)'") | ForEach-Object { $_.Groups[1].Value }
}

function Invoke-TwitchSummary {
  $configPath = Join-Path $root "api\twitch-config.php"
  $clientId = Get-PhpStringValue $configPath "client_id"
  $clientSecret = Get-PhpStringValue $configPath "client_secret"
  $logins = @(Get-PhpArrayValues $configPath "logins")

  if (-not $clientId -or -not $clientSecret) {
    return @{ error = "missing_twitch_credentials"; message = "Add api/twitch-config.php with Twitch credentials." }
  }

  $tokenResponse = Invoke-RestMethod -Method Post -Uri "https://id.twitch.tv/oauth2/token" -Body @{
    client_id = $clientId
    client_secret = $clientSecret
    grant_type = "client_credentials"
  }

  $headers = @{
    "Client-ID" = $clientId
    "Authorization" = "Bearer $($tokenResponse.access_token)"
  }

  $loginQuery = ($logins | ForEach-Object { "login=$([Uri]::EscapeDataString($_))" }) -join "&"
  $streamQuery = ($logins | ForEach-Object { "user_login=$([Uri]::EscapeDataString($_))" }) -join "&"
  $users = Invoke-RestMethod -Headers $headers -Uri "https://api.twitch.tv/helix/users?$loginQuery"
  $streams = Invoke-RestMethod -Headers $headers -Uri "https://api.twitch.tv/helix/streams?$streamQuery"

  $ids = @($users.data | ForEach-Object { $_.id })
  $channelsById = @{}
  if ($ids.Count -gt 0) {
    $channelQuery = ($ids | ForEach-Object { "broadcaster_id=$([Uri]::EscapeDataString($_))" }) -join "&"
    $channels = Invoke-RestMethod -Headers $headers -Uri "https://api.twitch.tv/helix/channels?$channelQuery"
    foreach ($channel in @($channels.data)) {
      $channelsById[$channel.broadcaster_id] = $channel
    }
  }

  $streamsByLogin = @{}
  foreach ($stream in @($streams.data)) {
    $streamsByLogin[$stream.user_login.ToLowerInvariant()] = $stream
  }

  $members = @($users.data | ForEach-Object {
    $stream = $streamsByLogin[$_.login.ToLowerInvariant()]
    $channel = $channelsById[$_.id]
    @{
      id = $_.id
      name = $_.display_name
      login = $_.login
      profileImage = $_.profile_image_url
      offlineImage = $_.offline_image_url
      description = $_.description
      live = [bool]$stream
      title = if ($stream) { $stream.title } else { $null }
      gameName = if ($stream) { $stream.game_name } elseif ($channel) { $channel.game_name } else { $null }
      viewerCount = if ($stream) { [int]$stream.viewer_count } else { 0 }
      thumbnailUrl = if ($stream) { $stream.thumbnail_url.Replace("{width}", "1280").Replace("{height}", "720") } else { $null }
      startedAt = if ($stream) { $stream.started_at } else { $null }
    }
  })

  return @{
    source = "twitch-local"
    generatedAt = [DateTime]::UtcNow.ToString("o")
    totalMembers = $members.Count
    membersLive = @($members | Where-Object { $_.live }).Count
    totalLiveViewers = [int](($members | ForEach-Object { [int]$_["viewerCount"] } | Measure-Object -Sum).Sum)
    members = $members
  }
}

function Invoke-SpotifyTracks {
  $configPath = Join-Path $root "api\spotify-config.php"
  $clientId = Get-PhpStringValue $configPath "client_id"
  $clientSecret = Get-PhpStringValue $configPath "client_secret"
  $artists = @(Get-PhpArrayValues $configPath "artists")

  if (-not $clientId -or -not $clientSecret) {
    return @{ error = "missing_spotify_credentials"; message = "Add api/spotify-config.php with Spotify credentials." }
  }

  $basic = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${clientId}:${clientSecret}"))
  $tokenResponse = Invoke-RestMethod -Method Post -Uri "https://accounts.spotify.com/api/token" -Headers @{
    Authorization = "Basic $basic"
  } -Body @{
    grant_type = "client_credentials"
  }

  $headers = @{ Authorization = "Bearer $($tokenResponse.access_token)" }
  $tracks = @()
  foreach ($artistName in $artists) {
    $artistQuery = [Uri]::EscapeDataString("artist:$artistName")
    $artistResponse = Invoke-RestMethod -Headers $headers -Uri "https://api.spotify.com/v1/search?q=$artistQuery&type=artist&limit=1&market=US"
    $artist = @($artistResponse.artists.items)[0]
    if (-not $artist) { continue }

    $albumResponse = Invoke-RestMethod -Headers $headers -Uri "https://api.spotify.com/v1/artists/$($artist.id)/albums?include_groups=single,album&limit=1&market=US"
    $album = @($albumResponse.items)[0]
    if (-not $album) { continue }

    $trackResponse = Invoke-RestMethod -Headers $headers -Uri "https://api.spotify.com/v1/albums/$($album.id)/tracks?limit=1&market=US"
    $track = @($trackResponse.items)[0]
    if (-not $track) { continue }

    $tracks += @{
      id = $track.id
      title = $track.name
      artist = $artist.name
      artistUrl = $artist.external_urls.spotify
      releaseDate = $album.release_date
      album = $album.name
      albumCover = @($album.images)[0].url
      previewUrl = $track.preview_url
      url = $track.external_urls.spotify
    }
  }

  return @{
    source = "spotify-local"
    generatedAt = [DateTime]::UtcNow.ToString("o")
    tracks = $tracks
  }
}

function Get-ContentType($path) {
  switch ([System.IO.Path]::GetExtension($path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    default { "application/octet-stream" }
  }
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    if ($requestPath -eq "api/twitch.php") {
      try {
        Send-Json $context (Invoke-TwitchSummary)
      }
      catch {
        Send-Json $context @{ error = "local_twitch_api_failed"; message = $_.Exception.Message } 502
      }
      continue
    }

    if ($requestPath -eq "api/spotify.php") {
      try {
        Send-Json $context (Invoke-SpotifyTracks)
      }
      catch {
        Send-Json $context @{ error = "local_spotify_api_failed"; message = $_.Exception.Message } 502
      }
      continue
    }

    $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $requestPath))
    if (-not $fullPath.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
      $context.Response.StatusCode = 403
      $context.Response.Close()
      continue
    }

    if (-not [System.IO.File]::Exists($fullPath)) {
      $context.Response.StatusCode = 404
      $context.Response.Close()
      continue
    }

    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $context.Response.ContentType = Get-ContentType $fullPath
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.Close()
  }
}
finally {
  $listener.Stop()
}
