import { useCallback, useEffect, useRef, useState } from "react";
import { getSound } from "../../lib/sound";

enum Dir {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}
type Cord = { x: number; y: number };

const idx = ({ x, y }: Cord) => (y - 1) * 10 + (x - 1);
const rand = () => Math.floor(Math.random() * 10) + 1;
const START: Cord[] = [
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
];

export default function SnakeGame() {
  const [food, setFood] = useState<Cord>(() => ({ x: rand(), y: rand() }));
  const [snake, setSnake] = useState<Cord[]>(START);
  const [dir, setDir] = useState<Dir>(Dir.RIGHT);
  const [isLost, setIsLost] = useState(false);
  const [score, setScore] = useState(0);
  const prevScore = useRef(0);

  const run = useCallback((direction: Dir, foodPos: Cord) => {
    setSnake((cur) => {
      const head = cur[cur.length - 1];
      let nh = head;
      switch (direction) {
        case Dir.UP:
          nh = { ...head, y: head.y === 1 ? 10 : head.y - 1 };
          break;
        case Dir.DOWN:
          nh = { ...head, y: head.y === 10 ? 1 : head.y + 1 };
          break;
        case Dir.RIGHT:
          nh = { ...head, x: head.x === 10 ? 1 : head.x + 1 };
          break;
        case Dir.LEFT:
          nh = { ...head, x: head.x === 1 ? 10 : head.x - 1 };
          break;
      }
      if (idx(nh) === idx(foodPos)) {
        setFood({ x: rand(), y: rand() });
        setScore((s) => s + 5);
        return cur.concat(nh);
      }
      if (cur.some((p) => idx(p) === idx(nh))) {
        setIsLost(true);
        return cur;
      }
      const [, ...rest] = cur;
      return rest.concat(nh);
    });
  }, []);

  const reset = useCallback(() => {
    setFood({ x: rand(), y: rand() });
    setSnake(START);
    setDir(Dir.RIGHT);
    setIsLost(false);
    setScore(0);
    prevScore.current = 0;
  }, []);

  // Only allow turning onto the perpendicular axis (no instant reverse).
  const changeDir = useCallback((nd: Dir) => {
    setDir((d) => {
      const dHoriz = d === Dir.LEFT || d === Dir.RIGHT;
      const ndHoriz = nd === Dir.LEFT || nd === Dir.RIGHT;
      return dHoriz === ndHoriz ? d : nd;
    });
  }, []);

  // Game tick.
  useEffect(() => {
    if (isLost) return;
    const id = setInterval(() => run(dir, food), 300);
    const stop = () => clearInterval(id);
    document.addEventListener("astro:before-swap", stop, { once: true });
    return () => {
      stop();
      document.removeEventListener("astro:before-swap", stop);
    };
  }, [run, dir, food, isLost]);

  // Keyboard control (preventDefault stops the page from scrolling on arrows).
  useEffect(() => {
    const map: Record<string, Dir> = {
      ArrowUp: Dir.UP,
      ArrowDown: Dir.DOWN,
      ArrowLeft: Dir.LEFT,
      ArrowRight: Dir.RIGHT,
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key in map) {
        e.preventDefault();
        changeDir(map[e.key]);
      }
    };
    const stop = () => window.removeEventListener("keydown", onKey);
    window.addEventListener("keydown", onKey);
    document.addEventListener("astro:before-swap", stop, { once: true });
    return () => {
      stop();
      document.removeEventListener("astro:before-swap", stop);
    };
  }, [changeDir]);

  // SFX
  useEffect(() => {
    if (score > prevScore.current) getSound()?.play("click");
    prevScore.current = score;
  }, [score]);
  useEffect(() => {
    if (isLost) getSound()?.play("error");
  }, [isLost]);

  const snakeSet = new Set(snake.map(idx));
  const foodIdx = idx(food);

  return (
    <div className="snake">
      <div className="snake-grid" role="img" aria-label={`Snake, score ${score}`}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`snake-cell${snakeSet.has(i) ? " on" : ""}${i === foodIdx ? " food" : ""}`}
          />
        ))}
      </div>
      <div className={`snake-score${isLost ? " lost" : ""}`}>
        <span>{isLost ? `GAME OVER — ${score}` : `SCORE ${score}`}</span>
        {isLost && (
          <button type="button" className="pixel-btn snake-again" data-sfx="click" onClick={reset}>
            PLAY AGAIN
          </button>
        )}
      </div>
      <div className="dpad">
        <button type="button" className="pixel-btn up" aria-label="Up" onClick={() => changeDir(Dir.UP)}>▲</button>
        <button type="button" className="pixel-btn left" aria-label="Left" onClick={() => changeDir(Dir.LEFT)}>◀</button>
        <button type="button" className="pixel-btn right" aria-label="Right" onClick={() => changeDir(Dir.RIGHT)}>▶</button>
        <button type="button" className="pixel-btn down" aria-label="Down" onClick={() => changeDir(Dir.DOWN)}>▼</button>
      </div>
    </div>
  );
}
