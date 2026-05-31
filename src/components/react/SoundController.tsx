import { useEffect, useState } from "react";
import { getSound, type SfxName } from "../../lib/sound";

/**
 * Persisted island. Renders the mute toggle and wires global, document-level SFX
 * delegation so any `[data-sfx]` element (and the page transition itself) makes a
 * sound. Audio + mute state live in the window singleton, so this island can come
 * and go without dropping sound.
 */
export default function SoundController() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const sound = getSound();
    if (!sound) return;
    setMuted(sound.muted);
    const unsub = sound.subscribe(setMuted);

    const onClick = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-sfx]");
      if (el) sound.play((el.getAttribute("data-sfx") as SfxName) || "click");
    };
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.(".pixel-btn,[data-sfx-hover]");
      if (el) sound.play("hover");
    };
    const onSwap = () => sound.play("nav");

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("astro:before-swap", onSwap);
    return () => {
      unsub();
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("astro:before-swap", onSwap);
    };
  }, []);

  return (
    <button
      type="button"
      className="pixel-btn sound-toggle"
      aria-pressed={!muted}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      title={muted ? "Sound: OFF" : "Sound: ON"}
      onClick={() => getSound()?.toggle()}
    >
      {muted ? "\u{1F507} SFX" : "\u{1F50A} SFX"}
    </button>
  );
}
