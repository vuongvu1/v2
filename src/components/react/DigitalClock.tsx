import { useEffect, useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

export default function DigitalClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    const stop = () => clearInterval(id);
    // ClientRouter swaps the DOM without unmounting React; clear on nav too.
    document.addEventListener("astro:before-swap", stop, { once: true });
    return () => {
      stop();
      document.removeEventListener("astro:before-swap", stop);
    };
  }, []);

  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = `${pad(now.getDate())} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className="clock" role="timer" aria-live="off">
      <div className="clock-time">{time}</div>
      <div className="clock-date">{date}</div>
    </div>
  );
}
