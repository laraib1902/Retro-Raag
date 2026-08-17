const links = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c2.7 0 3 .01 4.1.06 1 .05 1.6.2 1.9.35.5.2.9.4 1.3.8.4.4.6.8.8 1.3.15.3.3.9.35 1.9.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1-.2 1.6-.35 1.9-.2.5-.4.9-.8 1.3-.4.4-.8.6-1.3.8-.3.15-.9.3-1.9.35-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1-.05-1.6-.2-1.9-.35-.5-.2-.9-.4-1.3-.8-.4-.4-.6-.8-.8-1.3-.15-.3-.3-.9-.35-1.9C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.1c.05-1 .2-1.6.35-1.9.2-.5.4-.9.8-1.3.4-.4.8-.6 1.3-.8.3-.15.9-.3 1.9-.35C7.7 3.21 8 3.2 12 3.2m0 4.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4m0 1.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8m5.3-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M21.8 8.1a2.8 2.8 0 0 0-2-2C18.1 5.6 12 5.6 12 5.6s-6.1 0-7.8.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.7 12a29 29 0 0 0 .5 3.9 2.8 2.8 0 0 0 2 2c1.7.5 7.8.5 7.8.5s6.1 0 7.8-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.9 29 29 0 0 0-.5-3.9M9.9 15.3V8.7l5.7 3.3z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M13.6 10.6 20 3h-1.6l-5.6 6.5L8.3 3H3l6.8 9.7L3 21h1.6l5.9-6.9L15.7 21H21z",
  },
];

export default function SocialLinks() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={l.label}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-paper/85 backdrop-blur-sm transition hover:bg-black/45 hover:text-amber"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d={l.path} />
          </svg>
        </a>
      ))}
    </nav>
  );
}
