import { useEffect, useRef, useState } from "react";

export default function LofiRadio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        toggle();
      }
    };
    const stop = () => {
      window.removeEventListener("keydown", onKey);
      audioRef.current?.pause();
    };
    window.addEventListener("keydown", onKey);
    // ClientRouter swaps the DOM without unmounting React; stop audio + listener on nav.
    document.addEventListener("astro:before-swap", stop, { once: true });
    return () => {
      stop();
      document.removeEventListener("astro:before-swap", stop);
    };
  }, []);

  return (
    <div className="lofi">
      <div className={`cassette${playing ? " spin" : ""}`} aria-hidden="true">
        <span className="reel" />
        <span className="reel" />
      </div>
      <button type="button" className="pixel-btn" data-sfx="click" onClick={toggle}>
        {playing ? "❚❚ Pause" : "► Play"}
      </button>
      <p className="lofi-hint">Press SPACE to play / pause</p>
      <audio ref={audioRef} loop src="/audio/lofi.mp3" preload="none" />
    </div>
  );
}
