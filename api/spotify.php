<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$config = [
    'client_id' => getenv('SPOTIFY_CLIENT_ID') ?: '',
    'client_secret' => getenv('SPOTIFY_CLIENT_SECRET') ?: '',
    'artists' => getenv('SPOTIFY_ARTISTS')
        ? array_filter(array_map('trim', explode(',', getenv('SPOTIFY_ARTISTS'))))
        : ['SunnyX', 'YBG', 'arky', 'Yugi2X', 'nosiiree', 'flydabl', 'Redify'],
];

$localConfigPath = __DIR__ . '/spotify-config.php';
if (file_exists($localConfigPath)) {
    $localConfig = require $localConfigPath;
    $config = array_replace($config, $localConfig);
}

function send_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function spotify_request(string $url, string $method = 'GET', array $headers = [], ?string $body = null): array
{
    $curl = curl_init($url);
    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 12,
    ];

    if ($body !== null) {
        $options[CURLOPT_POSTFIELDS] = $body;
    }

    curl_setopt_array($curl, $options);
    $raw = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    if ($raw === false) {
        return ['ok' => false, 'status' => 0, 'error' => $error, 'data' => null];
    }

    $data = json_decode($raw, true);
    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'error' => $data['error']['message'] ?? $error,
        'data' => $data,
    ];
}

function get_spotify_token(array $config): string
{
    if (!$config['client_id'] || !$config['client_secret']) {
        send_json([
            'error' => 'missing_spotify_credentials',
            'message' => 'Add Spotify credentials to api/spotify-config.php.',
        ], 500);
    }

    $basic = base64_encode($config['client_id'] . ':' . $config['client_secret']);
    $response = spotify_request(
        'https://accounts.spotify.com/api/token',
        'POST',
        [
            'Authorization: Basic ' . $basic,
            'Content-Type: application/x-www-form-urlencoded',
        ],
        'grant_type=client_credentials'
    );

    if (!$response['ok'] || empty($response['data']['access_token'])) {
        send_json([
            'error' => 'spotify_token_failed',
            'status' => $response['status'],
            'message' => $response['error'],
        ], 502);
    }

    return $response['data']['access_token'];
}

function spotify_get(string $path, array $query, string $token): array
{
    $url = 'https://api.spotify.com/v1/' . $path . '?' . http_build_query($query);
    $response = spotify_request($url, 'GET', ['Authorization: Bearer ' . $token]);

    if (!$response['ok']) {
        return [
            'error' => $response['error'],
            'status' => $response['status'],
            'data' => [],
        ];
    }

    return $response['data'];
}

function find_artist(string $name, string $token): ?array
{
    $response = spotify_get('search', [
        'q' => 'artist:' . $name,
        'type' => 'artist',
        'limit' => 1,
        'market' => 'US',
    ], $token);

    return $response['artists']['items'][0] ?? null;
}

function latest_track_for_artist(array $artist, string $token): ?array
{
    $response = spotify_get('artists/' . $artist['id'] . '/albums', [
        'include_groups' => 'single,album',
        'limit' => 5,
        'market' => 'US',
    ], $token);

    $album = $response['items'][0] ?? null;
    if (!$album) {
        return null;
    }

    $tracks = spotify_get('albums/' . $album['id'] . '/tracks', [
        'limit' => 1,
        'market' => 'US',
    ], $token);

    $track = $tracks['items'][0] ?? null;
    if (!$track) {
        return null;
    }

    return [
        'id' => $track['id'],
        'title' => $track['name'],
        'artist' => $artist['name'],
        'artistUrl' => $artist['external_urls']['spotify'] ?? '',
        'releaseDate' => $album['release_date'] ?? '',
        'album' => $album['name'] ?? '',
        'albumCover' => $album['images'][0]['url'] ?? '',
        'previewUrl' => $track['preview_url'] ?? null,
        'url' => $track['external_urls']['spotify'] ?? '',
    ];
}

$action = $_GET['action'] ?? 'tracks';
$token = get_spotify_token($config);

if ($action === 'tracks') {
    $tracks = [];
    foreach ($config['artists'] as $artistName) {
        $artist = find_artist($artistName, $token);
        if (!$artist) {
            continue;
        }

        $track = latest_track_for_artist($artist, $token);
        if ($track) {
            $tracks[] = $track;
        }
    }

    send_json([
        'source' => 'spotify',
        'generatedAt' => gmdate('c'),
        'tracks' => $tracks,
    ]);
}

send_json([
    'error' => 'unknown_action',
    'allowedActions' => ['tracks'],
], 400);

