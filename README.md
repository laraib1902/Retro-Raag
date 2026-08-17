# Tapri Radio

A single-page nostalgia radio player, styled after a roadside tapri (paan
shop) on a moonlit night — built with Next.js App Router, TypeScript, and
Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before you ship this

**1. Background images**
`public/bg/scene-wide.png` is the image you uploaded. `public/bg/scene-tall.png`
is currently just a copy of the same file as a placeholder — you said this
would be a separately composed portrait shot, so swap it out with the real
one before deploying (it's what renders on phones in portrait orientation).

**2. Tracks — all real now**
Every track across all three playlists is real: 3 in "Tapri, Late Night," 2 in
"Moonlit Gully," 5 in "Boombox Mornings" — all wired to videoIds from
Shemaroo's official channel, sent by you one at a time in chat, with
metadata (title/singer/film/year) verified against public song databases.

Per your instructions, no copyrighted songs were searched for or added on
this project's own initiative — every id came from you. Adding another is
still a one-line edit:

```ts
{
  id: "t1",
  title: "Song title",
  artist: "Artist",
  film: "Film name",
  year: 1978,
  duration: 245, // seconds — fallback shown before the player reports the real duration
  videoId: "dQw4w9WgXcQ", // the 11-char id from youtube.com/watch?v=XXXXXXXXXXX
},
```

**3. Vercel Analytics / Speed Insights**
These render as no-ops locally and activate automatically once deployed to
Vercel — no setup needed on your end.

**4. Rights/takedown footer**
There's now a small line under the player noting audio streams through
YouTube's embedded player, nothing is hosted, rights stay with the original
labels, and a `mailto:hello@example.com` link for takedown requests. Swap
that address for your real one in `app/page.tsx`.

**5. Autoplay**
The station starts automatically on page load, muted (browsers block
autoplay with sound otherwise). The instant the visitor clicks, taps, or
presses any key anywhere on the page, it unmutes — that's standard practice
for autoplaying media and needs no button. A small "tap anywhere to unmute"
hint shows while it's muted and playing.

## How it's built

- `app/page.tsx` — server component: fixed background + grain, the fixed top
  row (clock / listener count / social links), and the bottom-anchored player.
- `components/RadioPlayer.tsx` — the only client-side "brain." Owns playback
  state and a single real YouTube `iframe`, which it moves (via a plain
  `appendChild`, not a remount) between the desktop pill and the mobile card
  depending on viewport, so there's exactly one player and one audio stream
  no matter which layout is visible.
- `components/PlayerDesktop.tsx` / `PlayerMobile.tsx` — the two visual shells
  described in the brief, each always in the DOM and toggled with
  `hidden sm:flex` / `sm:hidden` so switching breakpoints never reflows one
  layout into the other.
- `components/Vinyl.tsx`, `SeekBar.tsx`, `Transport.tsx`, `PlaylistTabs.tsx` —
  presentational pieces, all defined at module scope so their identity is
  stable across renders (the vinyl's spin state would otherwise reset ~2–3×/second
  from the progress-bar ticking).
- `lib/tracks.ts` — the playlist data. `lib/youtube.ts` loads the YouTube
  IFrame API once, no matter how many components ask for it.

## Known trade-offs

- Listener count is a client-side random walk for atmosphere, not a real
  count of anyone.
- The seek bar's drag range assumes the reported `duration`; until the player
  fires `onReady` for a track, seeking is a no-op.
