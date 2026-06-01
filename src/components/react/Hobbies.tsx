import { type Media, piano, videoEdit } from "../../data/hobbies";
import PixelAccordion from "./PixelAccordion";
import PixelTabs from "./PixelTabs";
import PixelYouTube from "./PixelYouTube";

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
        {
          key: "video",
          label: "Video Edit",
          render: () => <PixelAccordion items={toItems(videoEdit)} />,
        },
      ]}
    />
  );
}
