# OSCS Central - Master Development Document

Version: 1.0  
Project Type: Community Entertainment Hub  
Built By: OSCS  
Hosting Stack: InfinityFree + Supabase + GitHub  
Frontend Goal: Modern, animated, fast, responsive, API-driven

## 1. Website Overview

OSCS Central is a modern entertainment hub for the OSCS creator community. It is inspired by creator collectives such as AMP, CORE, FaZe, and OTK, while maintaining a distinct OSCS identity.

The site should feel premium, cinematic, smooth, dark-mode optimized, creator-focused, minimal but alive, interactive without clutter, mobile-first, and optimized for desktop and TV displays.

The site should not feel corporate, overdesigned, generic, or copied from another creator group.

The visual direction combines Twitch culture, YouTube creator energy, music artist aesthetics, gaming UI, cyber-minimal visuals, soft animation, and smooth transitions.

## 2. Core Website Structure

### Main Navigation

- Home
- Videos
- Clips
- Music
- Members
- Awards

### Top Right Controls

- Dark/light mode toggle

### Header Information

- Current user local time and date
- Total members
- Members live right now
- Total Twitch followers
- Total live viewers

## 3. Color System

### Core Colors

| Token | Color |
| --- | --- |
| Primary Purple | `#978DB9` |
| Pure White | `#FFFFFF` |
| Pure Black | `#000000` |
| Soft Background | `#0D0D0D` |
| Secondary Dark | `#161616` |
| Border Color | `#2A2A2A` |
| Success Green | `#00FF99` |
| Offline Gray | `#7A7A7A` |
| Live Red | `#FF3B5C` |
| Hover Glow | `rgba(151,141,185,0.35)` |

### Theme Notes

Dark mode should be the default experience. Light mode should exist, but the brand should still feel premium and creator-focused in both themes.

## 4. Typography

### Primary Font

```css
font-family: "Inter", sans-serif;
```

### Alternative Fonts

- Space Grotesk
- Satoshi
- Poppins

### Heading Style

- Bold
- Tight spacing
- Uppercase optional
- Strong hierarchy for section titles and content labels

### Body Style

- Minimal
- Clean
- Easy to read
- Optimized for cards, dashboards, and creator metadata

## 5. Layout Style

The interface should use wide spacing, rounded cards, blur effects, transparent layers, floating UI, and soft drop shadows.

### Preferred Values

```css
border-radius: 20px;
transition: 0.3s ease;
backdrop-filter: blur(20px);
```

### UI Direction

- Cards should feel layered but not cluttered.
- Sections should have strong spacing and clear grouping.
- Motion should support the experience, not distract from content.
- Desktop and TV layouts should feel cinematic.
- Mobile layouts should prioritize fast scanning and thumb-friendly navigation.

## 6. Homepage

### Section 1: Hero Header

Contains:

- OSCS logo
- Main navigation
- Theme toggle

### Section 2: Live Stats

Shows:

- Current date and time
- Members live
- Total viewers
- Total followers

### Section 3: Live Now

Powered by Twitch API.

Each live stream card includes:

- Stream thumbnail
- Stream title
- Stream category
- Viewer count
- Profile picture
- Live indicator

### Section 4: Newest Video

Powered by YouTube Data API v3.

Includes:

- Thumbnail
- Video title
- Upload date
- View count

### Section 5: Offline Members

Powered by Twitch API.

Each offline member card includes:

- Profile picture
- Username
- Last category played

## 7. Videos Page

### Header

YouTube

### Sections

- Latest Updates
- Newest Video
- More Videos
- Shorts

### Data Source

- YouTube Data API v3

### Video Card Fields

- Thumbnail
- Title
- Upload time
- View count

## 8. Clips Page

### Data Source

- Twitch Clips API

### Filters

- Day
- Week
- Month
- Year
- All Time

### Sort Options

- Most Viewed
- Newest

### Member Dropdown

- Sunny
- Santi
- YBG
- Arky
- Yugi
- Nos
- Jdab
- Redify
- BigMonRaph

### Clip Card Fields

- Clip thumbnail
- Creator
- View count
- Created date
- Clip title

## 9. Music Page

### Data Source

- Spotify API

### Features

- Pull all member music
- Song previews
- Album art
- Artist pages
- Spotify embed/player

### Music Card Fields

- Album cover
- Song title
- Artist
- Release date
- Preview/play button

## 10. Members Page

### Page Includes

- All members
- Profile pictures
- Social links
- Business contacts
- Schedules
- Twitch links
- YouTube links

### Individual Member Page Includes

- Banner/header
- Profile picture
- Username
- Social links
- Creator statistics
- Embedded schedule
- Latest content

## 11. Member Data

### Sunny

Business: `sunny@loadedtalent.com`

Platforms:

- Twitch: Sunny
- YouTube: YourSunny
- Spotify: SunnyX
- X: SunnysIRL
- Instagram: sunnysphere1
- TikTok: yoursunnyirl

Needs:

- Google Calendar embed

### Santi

Business: `realfontypungas@gmail.com`

Platforms:

- Twitch: SantiPungas
- YouTube: SantiPungas
- X: SantiPungas
- Instagram: SantiPungas
- TikTok: SantiPungas

### YBG

Business: `youngbasego@epictalent.gg`

Platforms:

- Twitch: YoungBaseGo
- YouTube: YBG Vlogs
- YouTube: YBG Clips
- Spotify: YBG
- X: YRBaseGO
- Instagram: youngbasego
- TikTok: youngbasego

### Arky

Business: `arky@loaded.gg`

Platforms:

- Twitch: arky
- YouTube: arky
- YouTube: arkyszn live
- YouTube: arkyvlogs
- Spotify: arky
- X: arkysznz
- Snapchat: arkysznz
- Instagram: arkysznz
- TikTok: arkysznz

Needs:

- Google Calendar embed

### Yugi2X

Business: `yugi@mythictalent.com`

Platforms:

- Twitch: Yugi2X
- YouTube: Yugi2X
- YouTube: Yugi2X Live
- YouTube: Yugi2X Vlogs
- Spotify: Yugi2X
- X: Yugi2X
- Snapchat: Yugibts
- Instagram: Yugi2X
- TikTok: Yugi2X

Needs:

- Google Calendar embed

### Nos

Business: `nosbusiness@gmail.com`

Platforms:

- Twitch: noseri
- YouTube: noseri live
- Spotify: noseri
- X: nosneighborhood
- Instagram: nosirlzeioe
- TikTok: nosiree

### Jdab

Business: `TTVjdab@gmail.com`

Platforms:

- Twitch: 1jdab1
- YouTube: 1jdab1
- Spotify: 1jdab1
- X: 1jdab1
- Instagram: 1jdab1
- TikTok: 1jdab1

### Redify

Business: `jet@redify.com`

Platforms:

- Twitch: Redify
- Spotify: Redify
- X: Redifyys
- Instagram: Redify
- TikTok: Redify

### BigMonRaph

Business: `bigmonraph@gmail.com`

Platforms:

- Twitch: BigMonRaph
- YouTube: BigMonRaph
- X: BigMonRaph
- Instagram: BigMonRaph
- TikTok: big_mon_mon_raph

## 12. Image Style

Images should be cinematic, use soft gradients, have rounded corners, use hover zoom effects, and load lazily.

### Ratios

- Thumbnails: `16:9`
- Profile pictures: circular

```css
.profile-picture {
  border-radius: 999px;
}
```

## 13. Required Effects

### Animations

- Fade in
- Slide up
- Hover glow
- Floating cards
- Smooth theme transition

### Recommended Libraries

- Framer Motion
- GSAP

Framer Motion is recommended for React component transitions. GSAP may be used for heavier timeline-based hero or page transition effects if needed.

## 14. Responsive Design Requirements

The site must support:

- Mobile
- Tablet
- Desktop
- TV browsers

### Breakpoints

```css
768px
1024px
1440px
```

### Responsive Priorities

- Mobile: fast navigation, stacked cards, thumb-friendly controls
- Tablet: two-column content where appropriate
- Desktop: cinematic spacing, richer hover states, wider data panels
- TV: larger text, high contrast, strong focus states

## 15. Development Stack

### Frontend

- Next.js
- React
- TailwindCSS

### Backend

- Supabase

### Hosting

- GitHub Pages or Vercel
- InfinityFree optional

### APIs

- Twitch API
- YouTube Data API v3
- Spotify API

### Analytics

- Google Analytics

## 16. API Integration Requirements

### Twitch

Used for:

- Live member status
- Stream thumbnails
- Stream titles
- Categories
- Viewer counts
- Profile images
- Follower totals
- Clips

Required credentials:

- Twitch Client ID
- Twitch Client Secret
- OAuth access token

### YouTube

Used for:

- Newest videos
- More videos
- Shorts
- Upload dates
- View counts
- Thumbnails

Required credentials:

- YouTube Data API v3 key
- Channel IDs for each creator

### Spotify

Used for:

- Member music
- Track data
- Album art
- Artist links
- Embedded players
- Preview URLs when available

Required credentials:

- Spotify Client ID
- Spotify Client Secret

### Supabase

Used for:

- Member profiles
- Cached API responses
- Site settings
- Awards data
- Optional analytics events

Recommended tables:

- `members`
- `member_socials`
- `member_platform_accounts`
- `live_status_cache`
- `youtube_video_cache`
- `twitch_clip_cache`
- `spotify_track_cache`
- `awards`
- `site_settings`

## 17. Suggested Environment Variables

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_ACCESS_TOKEN=

YOUTUBE_API_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Client-safe variables should use `NEXT_PUBLIC_`. Private API secrets must stay server-side only.

## 18. Page Routes

Recommended Next.js routes:

```text
/
/videos
/clips
/music
/members
/members/[slug]
/awards
```

Optional future routes:

```text
/live
/schedule
/about
/contact
```

## 19. Component Plan

Recommended component structure:

```text
components/
  layout/
    SiteHeader.tsx
    SiteFooter.tsx
    MobileNav.tsx
  ui/
    StatCard.tsx
    CreatorCard.tsx
    VideoCard.tsx
    ClipCard.tsx
    MusicCard.tsx
    ThemeToggle.tsx
  home/
    HeroSection.tsx
    LiveStats.tsx
    LiveNow.tsx
    NewestVideo.tsx
    OfflineMembers.tsx
  members/
    MemberGrid.tsx
    MemberProfile.tsx
    MemberSocialLinks.tsx
```

## 20. Important Reminders

### TODO

- Add Google Drive logo assets
- Add Google Calendar embeds
- Add Discord invite links
- Add real social URLs
- Add API keys later
- Add real tokens later
- Add channel IDs and creator IDs for all platforms
- Add awards content and categories
- Decide final deployment target

## 21. Acceptance Criteria

The project is ready for launch when:

- All core pages exist and are responsive.
- Dark/light mode works globally.
- Header stats update from API or cached data.
- Twitch live members display correctly.
- YouTube videos display correctly.
- Twitch clips can be filtered and sorted.
- Spotify music data displays correctly.
- Member pages include socials, contact information, and latest content.
- API secrets are stored securely server-side.
- Supabase caching prevents excessive API calls.
- Images are lazy-loaded and optimized.
- Site passes basic performance, accessibility, and mobile layout checks.
