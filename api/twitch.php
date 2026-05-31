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
    'client_id' => getenv('TWITCH_CLIENT_ID') ?: 'nt8kxurj8f7630z3to2c234byc7jko',
    'client_secret' => getenv('TWITCH_CLIENT_SECRET') ?: '',
    'logins' => getenv('TWITCH_LOGINS')
        ? array_filter(array_map('trim', explode(',', getenv('TWITCH_LOGINS'))))
        : ['sunnys', 'santipulgaz', 'youngbasedgo', 'arky', 'Yugi2X', 'nosiiree', '1jdab1', 'Redify', 'BigMonRaph'],
];

$localConfigPath = __DIR__ . '/twitch-config.php';
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

function twitch_request(string $url, string $method = 'GET', array $headers = [], ?array $body = null): array
{
    $curl = curl_init($url);
    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 12,
    ];

    if ($body !== null) {
        $options[CURLOPT_POSTFIELDS] = http_build_query($body);
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
        'error' => $data['message'] ?? $error,
        'data' => $data,
    ];
}

function get_app_token(array $config): string
{
    if (!$config['client_id'] || !$config['client_secret']) {
        send_json([
            'error' => 'missing_twitch_credentials',
            'message' => 'Add TWITCH_CLIENT_SECRET as an environment variable or create api/twitch-config.php from twitch-config.example.php.',
        ], 500);
    }

    $response = twitch_request(
        'https://id.twitch.tv/oauth2/token',
        'POST',
        ['Content-Type: application/x-www-form-urlencoded'],
        [
            'client_id' => $config['client_id'],
            'client_secret' => $config['client_secret'],
            'grant_type' => 'client_credentials',
        ]
    );

    if (!$response['ok'] || empty($response['data']['access_token'])) {
        send_json([
            'error' => 'token_request_failed',
            'status' => $response['status'],
            'message' => $response['error'],
        ], 502);
    }

    return $response['data']['access_token'];
}

function helix_get(string $path, array $query, array $config, string $token): array
{
    $url = 'https://api.twitch.tv/helix/' . $path;
    if ($query) {
        $url .= '?' . http_build_query($query);
    }

    $response = twitch_request($url, 'GET', [
        'Client-ID: ' . $config['client_id'],
        'Authorization: Bearer ' . $token,
    ]);

    if (!$response['ok']) {
        return [
            'error' => $response['error'],
            'status' => $response['status'],
            'data' => [],
        ];
    }

    return $response['data'];
}

function repeated_query(string $key, array $values): array
{
    $query = [];
    foreach ($values as $value) {
        $query[] = [$key => $value];
    }
    return $query;
}

function build_repeated_url_query(string $key, array $values): string
{
    return implode('&', array_map(fn ($value) => urlencode($key) . '=' . urlencode((string) $value), $values));
}

function helix_get_repeated(string $path, string $key, array $values, array $config, string $token): array
{
    $url = 'https://api.twitch.tv/helix/' . $path . '?' . build_repeated_url_query($key, $values);
    $response = twitch_request($url, 'GET', [
        'Client-ID: ' . $config['client_id'],
        'Authorization: Bearer ' . $token,
    ]);

    if (!$response['ok']) {
        return [
            'error' => $response['error'],
            'status' => $response['status'],
            'data' => [],
        ];
    }

    return $response['data'];
}

$action = $_GET['action'] ?? 'summary';
$token = get_app_token($config);
$logins = array_values($config['logins']);

if ($action === 'summary') {
    $users = helix_get_repeated('users', 'login', $logins, $config, $token);
    $streams = helix_get_repeated('streams', 'user_login', $logins, $config, $token);
    $userData = $users['data'] ?? [];
    $streamData = $streams['data'] ?? [];

    $ids = array_map(fn ($user) => $user['id'], $userData);
    $channels = $ids ? helix_get_repeated('channels', 'broadcaster_id', $ids, $config, $token) : ['data' => []];
    $channelById = [];
    foreach (($channels['data'] ?? []) as $channel) {
        $channelById[$channel['broadcaster_id']] = $channel;
    }

    $streamByLogin = [];
    foreach ($streamData as $stream) {
        $streamByLogin[strtolower($stream['user_login'])] = $stream;
    }

    $members = array_map(function ($user) use ($streamByLogin, $channelById) {
        $stream = $streamByLogin[strtolower($user['login'])] ?? null;
        $channel = $channelById[$user['id']] ?? null;

        return [
            'id' => $user['id'],
            'name' => $user['display_name'],
            'login' => $user['login'],
            'profileImage' => $user['profile_image_url'] ?? '',
            'offlineImage' => $user['offline_image_url'] ?? '',
            'description' => $user['description'] ?? '',
            'live' => (bool) $stream,
            'title' => $stream['title'] ?? null,
            'gameName' => $stream['game_name'] ?? ($channel['game_name'] ?? null),
            'viewerCount' => $stream['viewer_count'] ?? 0,
            'thumbnailUrl' => isset($stream['thumbnail_url'])
                ? str_replace(['{width}', '{height}'], ['1280', '720'], $stream['thumbnail_url'])
                : null,
            'startedAt' => $stream['started_at'] ?? null,
        ];
    }, $userData);

    send_json([
        'source' => 'twitch',
        'generatedAt' => gmdate('c'),
        'totalMembers' => count($members),
        'membersLive' => count(array_filter($members, fn ($member) => $member['live'])),
        'totalLiveViewers' => array_sum(array_map(fn ($member) => (int) $member['viewerCount'], $members)),
        'members' => $members,
        'notes' => [
            'Follower totals require the Channel Followers endpoint and may need a broadcaster or moderator user token for full follower details.',
        ],
    ]);
}

if ($action === 'clips') {
    $login = $_GET['login'] ?? $logins[0];
    $users = helix_get('users', ['login' => $login], $config, $token);
    $user = $users['data'][0] ?? null;

    if (!$user) {
        send_json(['error' => 'unknown_twitch_login', 'login' => $login], 404);
    }

    $startedAt = gmdate('c', strtotime('-7 days'));
    $clips = helix_get('clips', [
        'broadcaster_id' => $user['id'],
        'first' => 20,
        'started_at' => $startedAt,
    ], $config, $token);

    send_json([
        'source' => 'twitch',
        'login' => $login,
        'generatedAt' => gmdate('c'),
        'clips' => $clips['data'] ?? [],
    ]);
}

send_json([
    'error' => 'unknown_action',
    'allowedActions' => ['summary', 'clips'],
], 400);
