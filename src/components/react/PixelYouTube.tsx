import { useState } from "react";

/** Lazy YouTube embed: shows a pixel "play" poster until clicked, then loads the iframe. */
export default function PixelYouTube({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        className="pixel-btn yt-poster"
        data-sfx="click"
        onClick={() => setOpen(true)}
      >
        ► Play “{title}”
      </button>
    );
  }

  const src = `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
  return (
    <div className="yt-frame">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
