export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** duration in seconds — used only as a fallback before the player reports the real duration */
  duration: number;
  /** YouTube video id (the 11-char id from the watch URL) */
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tagline: string;
  tracks: Track[];
};

/**
 * IMPORTANT — READ BEFORE EDITING
 * ---------------------------------------------------------------------------
 * Every track below is real and wired to a videoId from Shemaroo's official
 * YouTube channel (confirmed by you, track by track, in chat).
 *
 * Per your instructions, no copyrighted songs were searched for or added on
 * your own initiative — every id here is one you sent, with metadata
 * (title/singer/film/year) filled in from a quick verification search on my
 * end. Only add a track here if:
 *   1) you hold the rights to it, or
 *   2) it streams from the rights holder's own YouTube upload with embedding
 *      enabled (check "Share" → embedding isn't disabled on the video).
 *
 * Adding a real song is a one-line change — copy a row and fill in the
 * videoId from the YouTube watch URL, e.g. youtube.com/watch?v=XXXXXXXXXXX
 *                                                                  ^^^^^^^^^^^ this part
 */
export const playlists: Playlist[] = [
  {
    id: "tapri-late-night",
    name: "Tapri, Late Night",
    tagline: "Songs for the last customer of the night",
    tracks: [
      {
        id: "t1",
        title: "Lag Jaa Gale",
        artist: "Lata Mangeshkar",
        film: "Woh Kaun Thi?",
        year: 1964,
        duration: 250,
        videoId: "3wAnXhoCBXQ",
      },
      {
        id: "t2",
        title: "Aap Ki Nazron Ne Samjha",
        artist: "Lata Mangeshkar",
        film: "Anpadh",
        year: 1962,
        duration: 260,
        videoId: "ntQOVhbM_YU",
      },
      {
        id: "t3",
        title: "Gulabi Aankhen Jo Teri Dekhi",
        artist: "Mohammed Rafi",
        film: "The Train",
        year: 1970,
        duration: 240,
        videoId: "GTkj9E9Vuno",
      },
    ],
  },
  {
    id: "moonlit-gully",
    name: "Moonlit Gully",
    tagline: "For a walk under a full moon",
    tracks: [
      {
        id: "m1",
        title: "Pal Pal Dil Ke Paas",
        artist: "Kishore Kumar",
        film: "Blackmail",
        year: 1973,
        duration: 270,
        videoId: "cvQWzlNIjt8",
      },
      {
        id: "m2",
        title: "O Mere Dil Ke Chain",
        artist: "Kishore Kumar",
        film: "Mere Jeevan Saathi",
        year: 1972,
        duration: 270,
        videoId: "-Px0efU00uQ",
      },
    ],
  },
  {
    id: "boombox-mornings",
    name: "Boombox Mornings",
    tagline: "The radio the shopkeeper opens with",
    tracks: [
      {
        id: "b1",
        title: "Abhi Na Jao Chhod Kar",
        artist: "Mohammed Rafi & Asha Bhosle",
        film: "Hum Dono",
        year: 1961,
        duration: 330,
        videoId: "CSoLHmzr_DI",
      },
      {
        id: "b2",
        title: "Tere Husn Ki Kya Tareef Karoon",
        artist: "Mohammed Rafi & Lata Mangeshkar",
        film: "Leader",
        year: 1964,
        duration: 280,
        videoId: "jNka97yEiqU",
      },
      {
        id: "b3",
        title: "Tune O Rangeele Kaisa Jaadu Kiya",
        artist: "Lata Mangeshkar",
        film: "Kudrat",
        year: 1981,
        duration: 212,
        videoId: "jyMTNNcf_q0",
      },
      {
        id: "b4",
        title: "Baharon Phool Barsao",
        artist: "Mohammed Rafi",
        film: "Suraj",
        year: 1966,
        duration: 300,
        videoId: "feD5WdPn_tE",
      },
      {
        id: "b5",
        title: "Kaun Hai Jo Sapno Mein Aaya",
        artist: "Mohammed Rafi",
        film: "Jhuk Gaya Aasman",
        year: 1968,
        duration: 260,
        videoId: "0hS-9XjjgDM",
      },
    ],
  },
];
