import { mkdir, writeFile } from "node:fs/promises";

const apiDir = new URL("../api/", import.meta.url);

const twitchLogins = (process.env.TWITCH_LOGINS || "sunnys,santipulgaz,youngbasedgo,arky,Yugi2X,nosiiree,1jdab1,Redify,BigMonRaph")
  .split(",")
  .map((login) => login.trim())
  .filter(Boolean);

const youtubeHandles = (process.env.YOUTUBE_HANDLES || "YourSunny,SantiPungas,YoungBaseGo,arky,Yugi2X,noseri,1jdab1,BigMonRaph")
  .split(",")
  .map((handle) => handle.trim().replace(/^@/, ""))
  .filter(Boolean);

const youtubeChannelIds = (process.env.YOUTUBE_CHANNEL_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

async function writeJson(name, payload) {
  await mkdir(apiDir, { recursive: true });
  await writeFile(new URL(`${name}.json`, apiDir), `${JSON.stringify(payload, null, 2)}\n`);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error?.message || response.statusText;
    throw new Error(`${response.status} ${message}`);
  }

  return data;
}

function repeatedQuery(key, values) {
  return values.map((value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
}

async function refreshTwitch() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    await writeJson("twitch", {
      source: "twitch",
      generatedAt: new Date().toISOString(),
      members: [],
      error: "missing_twitch_credentials",
    });
    return;
  }

  const tokenData = await requestJson("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  const headers = {
    "Client-ID": clientId,
    Authorization: `Bearer ${tokenData.access_token}`,
  };

  const users = await requestJson(`https://api.twitch.tv/helix/users?${repeatedQuery("login", twitchLogins)}`, { headers });
  const streams = await requestJson(`https://api.twitch.tv/helix/streams?${repeatedQuery("user_login", twitchLogins)}`, { headers });
  const ids = (users.data || []).map((user) => user.id);
  const channels = ids.length
    ? await requestJson(`https://api.twitch.tv/helix/channels?${repeatedQuery("broadcaster_id", ids)}`, { headers })
    : { data: [] };

  const channelById = new Map((channels.data || []).map((channel) => [channel.broadcaster_id, channel]));
  const streamByLogin = new Map((streams.data || []).map((stream) => [String(stream.user_login).toLowerCase(), stream]));
  const members = (users.data || []).map((user) => {
    const stream = streamByLogin.get(String(user.login).toLowerCase());
    const channel = channelById.get(user.id);

    return {
      id: user.id,
      name: user.display_name,
      login: user.login,
      profileImage: user.profile_image_url || "",
      offlineImage: user.offline_image_url || "",
      description: user.description || "",
      live: Boolean(stream),
      title: stream?.title || null,
      gameName: stream?.game_name || channel?.game_name || null,
      viewerCount: stream?.viewer_count || 0,
      thumbnailUrl: stream?.thumbnail_url
        ? stream.thumbnail_url.replace("{width}", "1280").replace("{height}", "720")
        : null,
      startedAt: stream?.started_at || null,
    };
  });

  await writeJson("twitch", {
    source: "twitch",
    generatedAt: new Date().toISOString(),
    totalMembers: members.length,
    membersLive: members.filter((member) => member.live).length,
    totalLiveViewers: members.reduce((sum, member) => sum + Number(member.viewerCount || 0), 0),
    members,
  });
}

async function getChannelByHandle(handle, apiKey) {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.search = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    forHandle: handle,
    key: apiKey,
  });
  const data = await requestJson(url);
  return data.items?.[0] || null;
}

async function getChannelsByIds(ids, apiKey) {
  if (!ids.length) return [];
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.search = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    id: ids.join(","),
    key: apiKey,
  });
  const data = await requestJson(url);
  return data.items || [];
}

async function getLatestUploads(channel, apiKey) {
  const playlistId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) return [];

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.search = new URLSearchParams({
    part: "snippet,contentDetails",
    playlistId,
    maxResults: "3",
    key: apiKey,
  });

  const data = await requestJson(url);
  return (data.items || []).map((item) => {
    const snippet = item.snippet || {};
    const thumbnails = snippet.thumbnails || {};
    const videoId = snippet.resourceId?.videoId || item.contentDetails?.videoId || "";

    return {
      videoId,
      title: snippet.title || "",
      channelTitle: channel.snippet?.title || snippet.channelTitle || "",
      publishedAt: snippet.publishedAt || "",
      thumbnail: thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "",
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "",
    };
  });
}

function decodeXml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function matchXml(entry, pattern) {
  return decodeXml(entry.match(pattern)?.[1] || "");
}

async function resolveYoutubeHandle(handle) {
  const response = await fetch(`https://www.youtube.com/@${encodeURIComponent(handle)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });
  const html = await response.text();
  return html.match(/"channelId":"([^"]+)"/)?.[1]
    || html.match(/"externalId":"([^"]+)"/)?.[1]
    || html.match(/itemprop="channelId" content="([^"]+)"/)?.[1]
    || null;
}

async function getRssUploads(channelId) {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`);
  if (!response.ok) return [];

  const xml = await response.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    const videoId = matchXml(entry, /<yt:videoId>(.*?)<\/yt:videoId>/);
    const thumbnail = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] || "";

    return {
      videoId,
      title: matchXml(entry, /<title>([\s\S]*?)<\/title>/),
      channelTitle: matchXml(entry, /<name>([\s\S]*?)<\/name>/),
      publishedAt: matchXml(entry, /<published>(.*?)<\/published>/),
      thumbnail: decodeXml(thumbnail),
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : matchXml(entry, /<link rel="alternate" href="([^"]+)"/),
    };
  });
}

async function refreshYoutubeFromRss() {
  const resolvedIds = await Promise.all(youtubeHandles.map((handle) => resolveYoutubeHandle(handle).catch(() => null)));
  const channelIds = [...new Set([...youtubeChannelIds, ...resolvedIds.filter(Boolean)])];
  const videos = (await Promise.all(channelIds.map((channelId) => getRssUploads(channelId).catch(() => []))))
    .flat()
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
    .slice(0, 12);

  await writeJson("youtube", {
    source: "youtube-rss",
    generatedAt: new Date().toISOString(),
    videos,
    notes: videos.length ? [] : ["No YouTube uploads found from configured handles."],
  });
}

async function refreshYoutube() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    await refreshYoutubeFromRss();
    return;
  }

  const channels = [
    ...(await getChannelsByIds(youtubeChannelIds, apiKey)),
    ...(await Promise.all(youtubeHandles.map((handle) => getChannelByHandle(handle, apiKey).catch(() => null)))),
  ].filter(Boolean);

  const dedupedChannels = [...new Map(channels.map((channel) => [channel.id, channel])).values()];
  const videos = (await Promise.all(dedupedChannels.map((channel) => getLatestUploads(channel, apiKey).catch(() => []))))
    .flat()
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
    .slice(0, 12);

  await writeJson("youtube", {
    source: "youtube",
    generatedAt: new Date().toISOString(),
    videos,
  });
}

await Promise.all([refreshTwitch(), refreshYoutube()]);
