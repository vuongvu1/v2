import PixelTabs from "./PixelTabs";
import PixelAccordion from "./PixelAccordion";
import PixelYouTube from "./PixelYouTube";
import { piano, videoEdit, type Media } from "../../data/hobbies";

const toItems = (list: Media[]) =>
  list.map((m) => ({
    title: m.title,
    render: () => <PixelYouTube url={m.url} title={m.title} />,
  }));

export default function Hobbies() {
  return (
    <PixelTabs
      tabs={[
        { key: "piano", label: "Piano", render: () => <PixelAccordion items={toItems(piano)} /> },
        { key: "video", label: "Video Edit", render: () => <PixelAccordion items={toItems(videoEdit)} /> },
      ]}
    />
  );
}
