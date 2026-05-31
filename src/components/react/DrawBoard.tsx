import { useRef, useState, type PointerEvent } from "react";

const SIZE = 320;
const CELL = 8; // snap brush to an 8px pixel grid
const BG = "#201b2a";
const PALETTE = ["#f64c72", "#f2c14e", "#2f7d4f", "#4a90d9", "#e8d8b0", "#ffffff"];

export default function DrawBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [color, setColor] = useState(PALETTE[1]);

  const paint = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL) * CELL;
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL) * CELL;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CELL, CELL);
  };

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="draw">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        onPointerDown={(e) => {
          drawing.current = true;
          canvasRef.current?.setPointerCapture(e.pointerId);
          paint(e);
        }}
        onPointerMove={paint}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
      />
      <div className="draw-tools">
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Color ${c}`}
            className={`swatch${c === color ? " active" : ""}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
          />
        ))}
        <button
          type="button"
          aria-label="Eraser"
          className={`swatch${color === BG ? " active" : ""}`}
          style={{ background: BG }}
          title="Eraser"
          onClick={() => setColor(BG)}
        />
        <button type="button" className="pixel-btn" data-sfx="click" onClick={clear}>
          CLEAR
        </button>
      </div>
    </div>
  );
}
