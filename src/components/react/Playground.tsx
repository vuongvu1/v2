import DigitalClock from "./DigitalClock";
import DrawBoard from "./DrawBoard";
import LofiRadio from "./LofiRadio";
import PixelTabs from "./PixelTabs";
import SnakeGame from "./SnakeGame";

export default function Playground() {
  return (
    <PixelTabs
      tabs={[
        { key: "snake", label: "Snake", render: () => <SnakeGame /> },
        { key: "clock", label: "Clock", render: () => <DigitalClock /> },
        { key: "draw", label: "Draw Board", render: () => <DrawBoard /> },
        { key: "lofi", label: "Lofi Radio", render: () => <LofiRadio /> },
      ]}
    />
  );
}
