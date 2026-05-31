const members = [
  {
    name: "Sunny",
    twitch: "sunnys",
    business: "sunny@loadedtalent.com",
    socials: {
      twitch: "https://twitch.tv/sunnys",
      youtube: "https://youtube.com/@YourSunny",
      spotify: "https://open.spotify.com/search/SunnyX",
      x: "https://x.com/SunnysIRL",
      instagram: "https://instagram.com/sunnysphere1",
      tiktok: "https://tiktok.com/@yoursunnyirl",
    },
    calendar: "",
    category: "Just Chatting",
    live: true,
    viewers: 18400,
    followers: 850000,
    needsCalendar: true,
  },
  {
    name: "Santipulgaz",
    twitch: "santipulgaz",
    business: "realfontypungas@gmail.com",
    socials: {
      twitch: "https://twitch.tv/santipulgaz",
      youtube: "https://youtube.com/@santipulgaz",
      tiktok: "https://tiktok.com/@santipulgaz",
      instagram: "https://instagram.com/santipulgaz",
      x: "https://x.com/santipulgaz",
    },
    category: "IRL",
    live: false,
    viewers: 0,
    followers: 430000,
  },
  {
    name: "YBG",
    twitch: "youngbasedgo",
    business: "youngbasego@epictalent.gg",
    socials: {
      twitch: "https://twitch.tv/youngbasedgo",
      youtube: "https://youtube.com/@youngbasedgo",
      spotify: "https://open.spotify.com/search/YBG",
      tiktok: "https://tiktok.com/@youngbasedgo",
      instagram: "https://instagram.com/youngbasedgo",
      x: "https://x.com/youngbasedgo",
    },
    category: "NBA 2K",
    live: false,
    viewers: 0,
    followers: 390000,
  },
  {
    name: "Arky",
    twitch: "arky",
    business: "arky@loaded.gg",
    socials: {
      twitch: "https://twitch.tv/arky",
      youtube: "https://youtube.com/@arkyy",
      spotify: "https://open.spotify.com/search/arky",
      tiktok: "https://tiktok.com/@arkyxmo",
      instagram: "https://instagram.com/arkyxmo",
      x: "https://x.com/arkyxmo",
    },
    calendar: "",
    category: "Fortnite",
    live: false,
    viewers: 0,
    followers: 510000,
    needsCalendar: true,
  },
  {
    name: "Yugi2X",
    twitch: "Yugi2X",
    business: "yugi@mythictalent.com",
    socials: {
      twitch: "https://twitch.tv/yugi2x",
      youtube: "https://youtube.com/@yugi2x",
      spotify: "https://open.spotify.com/search/Yugi2X",
      tiktok: "https://tiktok.com/@yugi2x",
      instagram: "https://instagram.com/yugi.2x",
      x: "https://x.com/yugi2x",
    },
    calendar: "",
    category: "GTA V",
    live: false,
    viewers: 0,
    followers: 340000,
    needsCalendar: true,
  },
  {
    name: "Nosiiree",
    twitch: "nosiiree",
    business: "nosbusiness@gmail.com",
    socials: {
      twitch: "https://twitch.tv/nosiiree",
      youtube: "https://youtube.com/@NosiireeLive",
      spotify: "https://open.spotify.com/search/nosiiree",
      tiktok: "https://tiktok.com/@nosiiree",
      instagram: "https://instagram.com/nosiireelive",
      x: "https://x.com/nosiiree",
    },
    category: "Music",
    live: false,
    viewers: 0,
    followers: 145000,
  },
  {
    name: "Jdab",
    twitch: "1jdab1",
    business: "TTVjdab@gmail.com",
    socials: {
      twitch: "https://twitch.tv/1jdab1",
      youtube: "https://youtube.com/@Flydabl",
      spotify: "https://open.spotify.com/search/flydabl",
      tiktok: "https://tiktok.com/@flydabl",
      instagram: "https://instagram.com/flydabl",
      x: "https://x.com/flydabl",
    },
    category: "Call of Duty",
    live: false,
    viewers: 0,
    followers: 94000,
  },
  {
    name: "Redify",
    twitch: "Redify",
    business: "jet@redify.com",
    socials: {
      twitch: "https://twitch.tv/redify",
      spotify: "https://open.spotify.com/search/Redify",
      tiktok: "https://tiktok.com/@redify",
      instagram: "https://instagram.com/redifyx",
      x: "https://x.com/redifyyx",
    },
    category: "Valorant",
    live: false,
    viewers: 0,
    followers: 72000,
  },
  {
    name: "BigMonRaph",
    twitch: "BigMonRaph",
    business: "bigmonraph@gmail.com",
    socials: {
      twitch: "https://twitch.tv/bigmonraph",
      youtube: "https://youtube.com/@bigmonraph",
      tiktok: "https://tiktok.com/@big_mon_raph",
      instagram: "https://instagram.com/bigmonraph",
      x: "https://x.com/bigmonraph",
    },
    category: "Variety",
    live: false,
    viewers: 0,
    followers: 55000,
  },
];

const imagePool = [
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
];

const videos = [
  ["Sunny", "OSCS house stream turns into a full movie", "2h ago", "481K", "newest"],
  ["Arky", "Late night ranked run with the squad", "8h ago", "219K", "more"],
  ["Yugi2X", "The funniest GTA lobby this week", "1d ago", "312K", "shorts"],
  ["Santi", "IRL chaos before the community event", "2d ago", "188K", "more"],
  ["YBG", "Court talk and creator games warmup", "3d ago", "141K", "shorts"],
  ["Nos", "Studio night with OSCS", "4d ago", "97K", "more"],
];

const clips = [
  ["Sunny", "The chat saw it before he did", 982000, "Today", "Day"],
  ["Santi", "Mall stream timing could not be better", 714000, "Yesterday", "Week"],
  ["Arky", "One round, three callouts, no panic", 652000, "3 days ago", "Week"],
  ["Yugi2X", "The lobby went silent", 590000, "2 weeks ago", "Month"],
  ["YBG", "Game winner and instant walk off", 433000, "1 month ago", "Month"],
  ["BigMonRaph", "The award speech became a roast", 312000, "5 months ago", "Year"],
];

const tracks = [
  ["SunnyX", "After Hours Lobby", "Sunny", "2026"],
  ["YBG", "Baseline Energy", "YBG", "2025"],
  ["arky", "Purple Server", "arky", "2025"],
  ["Yugi2X", "No Reset", "Yugi2X", "2026"],
  ["noseri", "Offline Mode", "Nos", "2025"],
  ["1jdab1", "Queue Pop", "Jdab", "2026"],
];

const awards = [
  ["Stream Moment", "Best live moment from the OSCS community season."],
  ["Clip of the Year", "The highlight that moved fastest through the timeline."],
  ["MVP Creator", "Fan-voted member with the strongest overall run."],
  ["Best Collab", "Favorite crossover stream, video, or event."],
  ["Music Drop", "Top track or artist moment from OSCS members."],
  ["Community Choice", "A flexible category for fan-led awards and inside jokes."],
];

const formatNumber = (value) => Intl.NumberFormat("en", { notation: "compact" }).format(value);
const pickImage = (index) => imagePool[index % imagePool.length];
const socialMeta = {
  twitch: { label: "Twitch", icon: "twitch" },
  youtube: { label: "YouTube", icon: "youtube" },
  spotify: { label: "Spotify", icon: "spotify" },
  tiktok: { label: "TikTok", icon: "tiktok" },
  instagram: { label: "Instagram", icon: "instagram" },
  x: { label: "X", icon: "x" },
  calendar: { label: "Calendar", icon: "googlecalendar" },
};
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
}[char]));
const memberSlug = (member) => member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function renderSocialLinks(member) {
  const links = Object.entries(member.socials || {});
  if (member.calendar) {
    links.push(["calendar", member.calendar]);
  }

  return links.map(([key, href]) => {
    const meta = socialMeta[key] || { label: key, icon: "link" };
    return `
      <a class="social-icon-link" href="${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="${escapeHtml(member.name)} on ${escapeHtml(meta.label)}" title="${escapeHtml(meta.label)}">
        <img src="https://cdn.simpleicons.org/${escapeHtml(meta.icon)}/FFFFFF/111111" alt="" loading="lazy">
        <span>${escapeHtml(meta.label)}</span>
      </a>
    `;
  }).join("");
}

function avatarStyle(index) {
  const hue = 252 + index * 17;
  return `background: linear-gradient(135deg, hsl(${hue}, 32%, 64%), hsl(${hue + 72}, 80%, 72%));`;
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  document.querySelector("#clock-time").textContent = time;
  document.querySelector("#clock-date").textContent = date;
  document.querySelector("#stat-time").textContent = time;
}

function setRoute(route) {
  const requestedRoute = route || "home";
  const memberMatch = requestedRoute.match(/^members\/([^/]+)$/);
  const page = memberMatch ? "member-detail" : (document.querySelector(`[data-page="${requestedRoute}"]`) ? requestedRoute : "home");
  if (memberMatch) {
    renderMemberDetail(memberMatch[1]);
  }
  document.querySelectorAll(".page").forEach((element) => element.classList.toggle("active", element.dataset.page === page));
  document.querySelectorAll("[data-route]").forEach((link) => link.classList.toggle("active", link.dataset.route === (page === "member-detail" ? "members" : page)));
  document.querySelector("#mobile-nav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLiveNow() {
  const container = document.querySelector("#live-now");
  container.innerHTML = members.filter((member) => member.live).map((member, index) => `
    <article class="stream-card">
      <div class="stream-thumb">
        <img loading="lazy" src="${pickImage(index)}" alt="${member.name} live stream thumbnail">
      </div>
      <div class="stream-body">
        <div class="stream-profile">
          <span class="avatar" style="${avatarStyle(index)}"></span>
          <div>
            <strong>${member.name}</strong>
            <div class="stream-meta">${member.twitch}</div>
          </div>
        </div>
        <h3>${member.category} with OSCS live chat</h3>
        <div class="stream-meta">
          <span class="pill"><span class="live-dot"></span>Live</span>
          <span class="pill">${formatNumber(member.viewers)} viewers</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderNewestVideo() {
  const [creator, title, uploaded, views] = videos[0];
  document.querySelector("#newest-video").innerHTML = `
    <article class="card">
      <div class="card-thumb">
        <img loading="lazy" src="${pickImage(4)}" alt="${title}">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="pill">${creator}</span>
          <span class="pill">${uploaded}</span>
        </div>
        <h3>${title}</h3>
        <div class="card-meta">${views} views</div>
      </div>
    </article>
  `;
}

function renderOfflineMembers() {
  document.querySelector("#offline-members").innerHTML = members.filter((member) => !member.live).map((member, index) => `
    <article class="offline-member">
      <span class="avatar" style="${avatarStyle(index + 3)}"></span>
      <div>
        <strong>${member.name}</strong>
        <small>${member.category}</small>
      </div>
    </article>
  `).join("");
}

function renderVideos(filter = "all") {
  const filtered = filter === "all" ? videos : videos.filter((video) => video[4] === filter);
  document.querySelector("#video-grid").innerHTML = filtered.map(([creator, title, uploaded, views], index) => `
    <article class="card">
      <div class="card-thumb">
        <img loading="lazy" src="${pickImage(index + 1)}" alt="${title}">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="pill">${creator}</span>
          <span class="pill">${uploaded}</span>
        </div>
        <h3>${title}</h3>
        <div class="card-meta">${views} views</div>
      </div>
    </article>
  `).join("");
}

function renderClipOptions() {
  document.querySelector("#clip-member").insertAdjacentHTML("beforeend", members.map((member) => `<option value="${member.name}">${member.name}</option>`).join(""));
}

function renderClips() {
  const member = document.querySelector("#clip-member").value;
  const sort = document.querySelector("#clip-sort").value;
  const activeRange = document.querySelector("#clip-range .active").dataset.range;
  let filtered = [...clips];

  if (member !== "All") filtered = filtered.filter((clip) => clip[0] === member);
  if (activeRange !== "All Time") filtered = filtered.filter((clip) => clip[4] === activeRange || activeRange === "Year");
  if (sort === "views") filtered.sort((a, b) => b[2] - a[2]);
  if (sort === "newest") filtered.reverse();

  document.querySelector("#clip-grid").innerHTML = filtered.map(([creator, title, views, date], index) => `
    <article class="card">
      <div class="card-thumb">
        <img loading="lazy" src="${pickImage(index + 2)}" alt="${title}">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="pill">${creator}</span>
          <span class="pill">${date}</span>
        </div>
        <h3>${title}</h3>
        <div class="card-meta">${formatNumber(views)} views</div>
      </div>
    </article>
  `).join("") || `<article class="award-card"><h3>No clips found</h3><p>Try a wider range or all members.</p></article>`;
}

function renderMusic() {
  document.querySelector("#music-grid").innerHTML = tracks.map(([artist, title, member, release], index) => `
    <article class="music-card">
      <img class="music-cover" loading="lazy" src="${pickImage(index + 5)}" alt="${title} album cover">
      <div class="music-body">
        <div class="music-meta">
          <span class="pill">${artist}</span>
          <span class="pill">${release}</span>
        </div>
        <h3>${title}</h3>
        <button class="preview-button" type="button" aria-label="Preview ${title}">></button>
      </div>
    </article>
  `).join("");
}

function renderSpotifyTracks(tracksFromApi) {
  if (!tracksFromApi.length) return;

  document.querySelector("#music-grid").innerHTML = tracksFromApi.map((track) => `
    <article class="music-card">
      <img class="music-cover" loading="lazy" src="${escapeHtml(track.albumCover || pickImage(0))}" alt="${escapeHtml(track.title)} album cover">
      <div class="music-body">
        <div class="music-meta">
          <span class="pill">${escapeHtml(track.artist || "OSCS")}</span>
          <span class="pill">${escapeHtml(track.releaseDate || "Spotify")}</span>
        </div>
        <h3>${escapeHtml(track.title || "Untitled track")}</h3>
        <a class="preview-button" href="${escapeHtml(track.url || track.artistUrl || "#")}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(track.title)} on Spotify">></a>
      </div>
    </article>
  `).join("");
}

async function hydrateSpotifyApi() {
  try {
    const response = await fetch("api/spotify.php?action=tracks", { cache: "no-store" });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) return;

    const data = await response.json();
    if (!Array.isArray(data.tracks)) return;
    renderSpotifyTracks(data.tracks);
  } catch (error) {
    console.info("Spotify API unavailable; using staged OSCS music data.");
  }
}

function renderMembers() {
  document.querySelector("#member-grid").innerHTML = members.map((member, index) => `
    <article class="member-card">
      <a class="member-banner" href="#members/${memberSlug(member)}" aria-label="Open ${escapeHtml(member.name)} profile">
        <img loading="lazy" src="${pickImage(index)}" alt="${member.name} profile banner">
      </a>
      <div class="member-body">
        <span class="avatar" style="${avatarStyle(index)}"></span>
        <h3>${member.name}</h3>
        <div class="member-meta">
          <span class="pill">${member.live ? "Live now" : "Offline"}</span>
          <span class="pill">${formatNumber(member.followers)} followers</span>
          ${member.needsCalendar ? `<span class="pill">Calendar needed</span>` : ""}
        </div>
        <p class="member-meta">${member.business}</p>
        <div class="social-list">
          ${renderSocialLinks(member)}
        </div>
        <a class="profile-link" href="#members/${memberSlug(member)}">View profile</a>
      </div>
    </article>
  `).join("");
}

function renderMemberDetail(slug) {
  const index = members.findIndex((member) => memberSlug(member) === slug);
  const member = members[index >= 0 ? index : 0];
  const schedulePanel = member.needsCalendar ? `
      <article class="profile-panel">
        <p class="eyebrow">Schedule</p>
        <h2>${member.calendar ? "Calendar" : "Calendar Needed"}</h2>
        <p>${member.calendar ? "Google Calendar embed is ready to connect." : "Sunny, Arky, and Yugi are the only profiles expecting Google Calendar embeds. Add the real calendar URL here when ready."}</p>
        ${member.calendar ? `<iframe class="calendar-frame" src="${escapeHtml(member.calendar)}" title="${escapeHtml(member.name)} calendar"></iframe>` : ""}
      </article>
  ` : "";

  document.querySelector("#member-detail").innerHTML = `
    <div class="member-profile-hero reveal">
      <div class="member-profile-media">
        <img loading="lazy" src="${pickImage(index >= 0 ? index : 0)}" alt="${escapeHtml(member.name)} profile banner">
      </div>
      <div class="member-profile-copy">
        <a class="back-link" href="#members">Back to members</a>
        <p class="eyebrow">${escapeHtml(member.live ? "Live now" : "Member profile")}</p>
        <h1>${escapeHtml(member.name)}</h1>
        <div class="member-meta">
          <span class="pill">${escapeHtml(member.twitch)}</span>
          <span class="pill">${escapeHtml(member.category)}</span>
          <span class="pill">${formatNumber(member.followers)} followers</span>
          ${member.live ? `<span class="pill"><span class="live-dot"></span>${formatNumber(member.viewers)} viewers</span>` : `<span class="pill">Offline</span>`}
        </div>
        <p>${escapeHtml(member.business)}</p>
        <div class="social-list profile-social-list">
          ${renderSocialLinks(member)}
        </div>
      </div>
    </div>

    <div class="profile-sections reveal">
      ${schedulePanel}
      <article class="profile-panel">
        <p class="eyebrow">Latest Content</p>
        <h2>Content Feed</h2>
        <p>Twitch profile images, live status, latest YouTube uploads, and Spotify releases can populate this page once the PHP API endpoints are running on InfinityFree.</p>
      </article>
      <article class="profile-panel">
        <p class="eyebrow">Business</p>
        <h2>Contact</h2>
        <p>${escapeHtml(member.business)}</p>
      </article>
    </div>
  `;
}

function renderAwards() {
  document.querySelector("#awards-grid").innerHTML = awards.map(([title, description]) => `
    <article class="award-card">
      <p class="eyebrow">OSCS Awards</p>
      <h3>${title}</h3>
      <p>${description}</p>
    </article>
  `).join("");
}

async function hydrateTwitchApi() {
  try {
    const response = await fetch("api/twitch.php?action=summary", { cache: "no-store" });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) return;

    const data = await response.json();
    if (!Array.isArray(data.members)) return;

    const apiByLogin = new Map(data.members.map((member) => [String(member.login || "").toLowerCase(), member]));
    const mergedMembers = members.map((member) => {
      const apiMember = apiByLogin.get(String(member.twitch || "").toLowerCase());
      return {
        ...member,
        ...(apiMember || {}),
        name: apiMember?.name || member.name,
        login: apiMember?.login || member.twitch,
        gameName: apiMember?.gameName || member.category,
        profileImage: apiMember?.profileImage || "",
        live: Boolean(apiMember?.live),
        viewerCount: apiMember?.viewerCount || 0,
      };
    });

    document.querySelector("#stat-members").textContent = members.length;
    document.querySelector("#stat-live").textContent = mergedMembers.filter((member) => member.live).length;
    document.querySelector("#stat-viewers").textContent = formatNumber(mergedMembers.reduce((sum, member) => sum + (member.viewerCount || 0), 0));

    const liveMembers = mergedMembers.filter((member) => member.live);
    if (liveMembers.length) {
      document.querySelector("#live-now").innerHTML = liveMembers.map((member, index) => `
        <article class="stream-card">
          <div class="stream-thumb">
            <img loading="lazy" src="${escapeHtml(member.thumbnailUrl || pickImage(index))}" alt="${escapeHtml(member.name)} live stream thumbnail">
          </div>
          <div class="stream-body">
            <div class="stream-profile">
              ${member.profileImage ? `<img class="avatar" loading="lazy" src="${escapeHtml(member.profileImage)}" alt="${escapeHtml(member.name)} profile picture">` : `<span class="avatar" style="${avatarStyle(index)}"></span>`}
              <div>
                <strong>${escapeHtml(member.name)}</strong>
                <div class="stream-meta">${escapeHtml(member.login)}</div>
              </div>
            </div>
            <h3>${escapeHtml(member.title || `${member.gameName || "Live"} with OSCS`)}</h3>
            <div class="stream-meta">
              <span class="pill"><span class="live-dot"></span>Live</span>
              <span class="pill">${formatNumber(member.viewerCount || 0)} viewers</span>
              ${member.gameName ? `<span class="pill">${escapeHtml(member.gameName)}</span>` : ""}
            </div>
          </div>
        </article>
      `).join("");
    }

    const offlineMembers = mergedMembers.filter((member) => !member.live);
    if (offlineMembers.length) {
      document.querySelector("#offline-members").innerHTML = offlineMembers.map((member, index) => `
        <article class="offline-member">
          ${member.profileImage ? `<img class="avatar" loading="lazy" src="${escapeHtml(member.profileImage)}" alt="${escapeHtml(member.name)} profile picture">` : `<span class="avatar" style="${avatarStyle(index + 3)}"></span>`}
          <div>
            <strong>${escapeHtml(member.name)}</strong>
            <small>${escapeHtml(member.gameName || "Offline")}</small>
          </div>
        </article>
      `).join("");
    }
  } catch (error) {
    console.info("Twitch API unavailable; using staged OSCS data.");
  }
}

function renderYoutubeVideos(videosFromApi) {
  if (!videosFromApi.length) return;

  const cards = videosFromApi.map((video) => [
    video.channelTitle || "OSCS",
    video.title || "Untitled video",
    video.publishedAt ? new Date(video.publishedAt).toLocaleDateString([], { month: "short", day: "numeric" }) : "New",
    "YouTube",
    "more",
    video.thumbnail || pickImage(0),
    video.url || "#",
  ]);

  document.querySelector("#video-grid").innerHTML = cards.map(([creator, title, uploaded, views, , thumbnail, url]) => `
    <article class="card">
      <a class="card-thumb" href="${escapeHtml(url)}" target="_blank" rel="noopener">
        <img loading="lazy" src="${escapeHtml(thumbnail)}" alt="${escapeHtml(title)}">
      </a>
      <div class="card-body">
        <div class="card-meta">
          <span class="pill">${escapeHtml(creator)}</span>
          <span class="pill">${escapeHtml(uploaded)}</span>
        </div>
        <h3>${escapeHtml(title)}</h3>
        <div class="card-meta">${escapeHtml(views)}</div>
      </div>
    </article>
  `).join("");

  const [creator, title, uploaded, views, , thumbnail, url] = cards[0];
  document.querySelector("#newest-video").innerHTML = `
    <article class="card">
      <a class="card-thumb" href="${escapeHtml(url)}" target="_blank" rel="noopener">
        <img loading="lazy" src="${escapeHtml(thumbnail)}" alt="${escapeHtml(title)}">
      </a>
      <div class="card-body">
        <div class="card-meta">
          <span class="pill">${escapeHtml(creator)}</span>
          <span class="pill">${escapeHtml(uploaded)}</span>
        </div>
        <h3>${escapeHtml(title)}</h3>
        <div class="card-meta">${escapeHtml(views)}</div>
      </div>
    </article>
  `;
}

async function hydrateYoutubeApi() {
  try {
    const response = await fetch("api/youtube.php?action=latest&limit=12", { cache: "no-store" });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) return;

    const data = await response.json();
    if (!Array.isArray(data.videos)) return;
    renderYoutubeVideos(data.videos);
  } catch (error) {
    console.info("YouTube API unavailable; using staged OSCS video data.");
  }
}

function wireEvents() {
  document.querySelector("#theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("oscs-theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  document.querySelector("#mobile-menu-button").addEventListener("click", () => {
    document.querySelector("#mobile-nav").classList.toggle("open");
  });

  window.addEventListener("hashchange", () => setRoute(location.hash.slice(1)));

  document.querySelectorAll("[data-video-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-video-tab]").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      renderVideos(button.dataset.videoTab);
    });
  });

  document.querySelector("#clip-range").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    document.querySelectorAll("#clip-range button").forEach((button) => button.classList.remove("active"));
    event.target.classList.add("active");
    renderClips();
  });

  document.querySelector("#clip-member").addEventListener("change", renderClips);
  document.querySelector("#clip-sort").addEventListener("change", renderClips);
}

function init() {
  if (localStorage.getItem("oscs-theme") === "light") document.body.classList.add("light");
  updateClock();
  setInterval(updateClock, 1000);
  document.querySelector("#stat-members").textContent = members.length;
  document.querySelector("#stat-live").textContent = members.filter((member) => member.live).length;
  document.querySelector("#stat-followers").textContent = formatNumber(members.reduce((sum, member) => sum + member.followers, 0));
  document.querySelector("#stat-viewers").textContent = formatNumber(members.reduce((sum, member) => sum + member.viewers, 0));
  renderLiveNow();
  renderNewestVideo();
  renderOfflineMembers();
  renderVideos();
  renderClipOptions();
  renderClips();
  renderMusic();
  renderMembers();
  renderAwards();
  wireEvents();
  setRoute(location.hash.slice(1) || "home");
  hydrateTwitchApi();
  hydrateYoutubeApi();
  hydrateSpotifyApi();
}

init();
