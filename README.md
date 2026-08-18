# Retro Raag 📻

> A little radio station for old songs, late nights and nostalgic moods.

**Retro Raag** is a single-page nostalgia radio experience inspired by the feeling of sitting at a roadside tapri on a quiet Indian evening, with an old film song playing in the background.

🎧 **[Listen to Retro Raag](https://laraib1902.github.io/Retro-Raag/)**

The project combines a cinematic visual atmosphere with a simple radio player, curated playlists and responsive layouts that feel at home on both desktop and mobile.

---

## ✨ Features

* 🎵 Curated playlists of classic Hindi film songs
* 📻 Real YouTube playback through the YouTube IFrame Player API
* ▶️ Autoplay with muted playback to respect browser autoplay policies
* 🔊 Automatically unmutes after the visitor's first interaction
* ⏮️ Previous, play/pause and next controls
* 🎚️ Interactive seek/progress bar
* 📱 Dedicated desktop and mobile player layouts
* 🎨 Cinematic tapri-inspired visual design
* 🌙 Film-grain overlay and atmospheric background
* 🕐 Live clock display
* 👥 Atmospheric listener count
* 📊 Vercel Analytics and Speed Insights
* ⚡ Static export suitable for simple hosting and GitHub Pages

---

## 🎶 Playlists

Retro Raag currently includes three moods:

| Playlist              | Mood                                     |
| --------------------- | ---------------------------------------- |
| **Tapri, Late Night** | Songs for the last customer of the night |
| **Moonlit Gully**     | For a walk under a full moon             |
| **Boombox Mornings**  | The radio the shopkeeper opens with      |

The songs and their metadata live in `lib/tracks.ts`, making it straightforward to add or remove tracks without touching the player itself.

---

## 🛠️ Tech Stack

* **Next.js 15** with App Router
* **React 19**
* **TypeScript**
* **Tailwind CSS v4**
* **YouTube IFrame Player API**
* **Vercel Analytics**
* **Vercel Speed Insights**

The application uses Next.js static export, so the generated site can be hosted without a traditional Node.js server.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/laraib1902/Retro-Raag.git
cd Retro-Raag
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production build

Create a production build with:

```bash
npm run build
```

Because the project uses Next.js static export, the generated output can be deployed to static hosting such as GitHub Pages.

---

## 📁 Project Structure

```text
Retro-Raag/
├── app/
│   ├── layout.tsx          # Global layout, fonts and metadata
│   ├── page.tsx            # Main radio experience
│   └── globals.css         # Global styles
│
├── components/
│   ├── RadioPlayer.tsx      # Player state and YouTube integration
│   ├── PlayerDesktop.tsx    # Desktop player UI
│   ├── PlayerMobile.tsx     # Mobile player UI
│   ├── PlaylistTabs.tsx     # Playlist navigation
│   ├── Vinyl.tsx            # Record/vinyl visual
│   ├── SeekBar.tsx          # Playback progress control
│   └── Transport.tsx         # Playback controls
│
├── lib/
│   ├── tracks.ts            # Playlists and track metadata
│   └── youtube.ts           # YouTube API loader
│
├── public/
│   └── bg/                  # Background artwork
│
├── next.config.ts           # Static export configuration
├── package.json
└── README.md
```

---

## 🧠 How the Player Works

The radio player is deliberately built around a **single YouTube player instance**.

`RadioPlayer.tsx` owns the playback state and creates the YouTube player once. When the viewport changes between desktop and mobile, the existing player element is moved between the appropriate UI containers instead of destroying and recreating the player.

This means switching between responsive layouts doesn't interrupt the current audio stream.

Changing tracks also reuses the same YouTube player instance rather than creating a new iframe for every song.

---

## ➕ Adding a Track

Tracks are defined in:

```text
lib/tracks.ts
```

A track follows this structure:

```ts
{
  id: "new-track",
  title: "Song Title",
  artist: "Artist Name",
  film: "Film Name",
  year: 1975,
  duration: 240,
  videoId: "XXXXXXXXXXX",
}
```

`duration` acts as a fallback until the YouTube player reports the actual duration.

`videoId` is the 11-character ID from a YouTube URL:

```text
https://www.youtube.com/watch?v=XXXXXXXXXXX
                                      ^^^^^^^^^^^
```

Only use videos that you have permission to embed or that are published by the appropriate rights holder.

---

## 📱 Responsive Design

Retro Raag has separate visual treatments for desktop and mobile rather than simply shrinking the desktop player.

The two layouts remain available in the DOM while CSS controls which presentation is visible. The underlying YouTube player itself remains a single instance.

This keeps the experience consistent while allowing each layout to be designed specifically for its screen size.

---

## 📊 Analytics

The project includes:

* Vercel Analytics
* Vercel Speed Insights

These are integrated directly into the application and can run without additional configuration when deployed through Vercel.

---

## ⚠️ Important Notes

### YouTube playback

Retro Raag does not host the audio files itself. Playback is handled through YouTube's embedded player.

If a YouTube video is removed, becomes unavailable, or no longer permits embedding, the player handles the playback error and moves to the next track.

### Autoplay

Modern browsers generally prevent websites from autoplaying media with sound.

Retro Raag therefore starts playback muted. Once the visitor interacts with the page, the player attempts to unmute automatically.

### Listener count

The displayed listener count is an atmospheric UI element. It is **not a measurement of real-time listeners**.

---

## 🤝 Contributing

Found something that could be improved?

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the project locally.
5. Open a pull request with a short description of the change.

For larger changes, opening an issue first is recommended so the approach can be discussed before implementation.

---

## 📜 Disclaimer

Retro Raag is a frontend experiment and nostalgia-focused radio interface.

Music playback is provided through embedded YouTube content. The project does not host or redistribute the underlying audio files.

All rights to music, recordings, artwork and other third-party content remain with their respective owners.

If you are a rights holder and believe content should not be available through the project, please contact the project maintainer so the relevant embedded content can be reviewed and removed.

---

## ❤️ Built for the Vibe

Retro Raag isn't trying to be another music streaming platform.

It's meant to feel like finding an old radio at a quiet tapri, turning the knob, and suddenly hearing a song you haven't thought about in years.

**Press play. Stay a while.**
