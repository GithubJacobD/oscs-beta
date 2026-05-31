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
    'api_key' => getenv('YOUTUBE_API_KEY') ?: '',
    'oauth_client_id' => getenv('GOOGLE_OAUTH_CLIENT_ID') ?: '139699710021-casm1832grnovh81780m82rk1lncaqta.apps.googleusercontent.com',
    'oauth_client_secret' => getenv('GOOGLE_OAUTH_CLIENT_SECRET') ?: '',
    'handles' => getenv('YOUTUBE_HANDLES')
        ? array_filter(array_map('trim', explode(',', getenv('YOUTUBE_HANDLES'))))
        : ['YourSunny', 'SantiPungas', 'YoungBaseGo', 'arky', 'Yugi2X', 'noseri', '1jdab1', 'BigMonRaph'],
    'channel_ids' => getenv('YOUTUBE_CHANNEL_IDS')
        ? array_filter(array_map('trim', explode(',', getenv('YOUTUBE_CHANNEL_IDS'))))
        : [],
];

$localConfigPath = __DIR__ . '/youtube-config.php';
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

function youtube_request(string $path, array $query): array
{
    $url = 'https://www.googleapis.com/youtube/v3/' . $path . '?' . http_build_query($query);
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
    ]);

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

function require_api_key(array $config): string
{
    if (!$config['api_key']) {
        send_json([
            'error' => 'missing_youtube_api_key',
            'message' => 'Create a YouTube Data API key and add it to api/youtube-config.php. OAuth client credentials alone do not fetch public channel videos.',
        ], 500);
    }

    return $config['api_key'];
}

function get_channel_by_handle(string $handle, string $apiKey): ?array
{
    $cleanHandle = ltrim($handle, '@');
    $response = youtube_request('channels', [
        'part' => 'snippet,contentDetails,statistics',
        'forHandle' => $cleanHandle,
        'key' => $apiKey,
    ]);

    if (!$response['ok']) {
        return null;
    }

    return $response['data']['items'][0] ?? null;
}

function get_channels_by_ids(array $ids, string $apiKey): array
{
    if (!$ids) {
        return [];
    }

    $response = youtube_request('channels', [
        'part' => 'snippet,contentDetails,statistics',
        'id' => implode(',', $ids),
        'key' => $apiKey,
    ]);

    if (!$response['ok']) {
        return [];
    }

    return $response['data']['items'] ?? [];
}

function get_latest_uploads(array $channel, string $apiKey, int $maxResults = 6): array
{
    $playlistId = $channel['contentDetails']['relatedPlaylists']['uploads'] ?? null;
    if (!$playlistId) {
        return [];
    }

    $response = youtube_request('playlistItems', [
        'part' => 'snippet,contentDetails',
        'playlistId' => $playlistId,
        'maxResults' => $maxResults,
        'key' => $apiKey,
    ]);

    if (!$response['ok']) {
        return [];
    }

    return array_map(function ($item) use ($channel) {
        $snippet = $item['snippet'] ?? [];
        $thumbnailSet = $snippet['thumbnails'] ?? [];
        $thumbnail = $thumbnailSet['maxres']['url']
            ?? $thumbnailSet['standard']['url']
            ?? $thumbnailSet['high']['url']
            ?? $thumbnailSet['medium']['url']
            ?? $thumbnailSet['default']['url']
            ?? '';

        return [
            'videoId' => $snippet['resourceId']['videoId'] ?? ($item['contentDetails']['videoId'] ?? ''),
            'title' => $snippet['title'] ?? '',
            'channelTitle' => $channel['snippet']['title'] ?? ($snippet['channelTitle'] ?? ''),
            'publishedAt' => $snippet['publishedAt'] ?? '',
            'thumbnail' => $thumbnail,
            'url' => isset($snippet['resourceId']['videoId'])
                ? 'https://www.youtube.com/watch?v=' . $snippet['resourceId']['videoId']
                : '',
        ];
    }, $response['data']['items'] ?? []);
}

$action = $_GET['action'] ?? 'latest';
$apiKey = require_api_key($config);

$channels = get_channels_by_ids(array_values($config['channel_ids']), $apiKey);
foreach ($config['handles'] as $handle) {
    $channel = get_channel_by_handle($handle, $apiKey);
    if ($channel) {
        $channels[] = $channel;
    }
}

$deduped = [];
foreach ($channels as $channel) {
    $deduped[$channel['id']] = $channel;
}
$channels = array_values($deduped);

if ($action === 'channels') {
    send_json([
        'source' => 'youtube',
        'generatedAt' => gmdate('c'),
        'channels' => array_map(fn ($channel) => [
            'id' => $channel['id'],
            'title' => $channel['snippet']['title'] ?? '',
            'handle' => $channel['snippet']['customUrl'] ?? null,
            'thumbnail' => $channel['snippet']['thumbnails']['high']['url'] ?? '',
            'subscriberCount' => $channel['statistics']['subscriberCount'] ?? null,
            'viewCount' => $channel['statistics']['viewCount'] ?? null,
            'videoCount' => $channel['statistics']['videoCount'] ?? null,
        ], $channels),
    ]);
}

if ($action === 'latest') {
    $videos = [];
    foreach ($channels as $channel) {
        $videos = array_merge($videos, get_latest_uploads($channel, $apiKey, 3));
    }

    usort($videos, fn ($a, $b) => strcmp($b['publishedAt'], $a['publishedAt']));
    $videos = array_slice($videos, 0, (int) ($_GET['limit'] ?? 12));

    send_json([
        'source' => 'youtube',
        'generatedAt' => gmdate('c'),
        'videos' => $videos,
    ]);
}

send_json([
    'error' => 'unknown_action',
    'allowedActions' => ['latest', 'channels'],
], 400);

