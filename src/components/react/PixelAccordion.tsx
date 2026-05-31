import { useState, type ReactNode } from "react";

export interface AccordionItem {
  title: string;
  render: () => ReactNode;
}

export default function PixelAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="acc">
      {items.map((it, i) => {
        const expanded = open === i;
        return (
          <div className="acc-item" key={i}>
            <button
              type="button"
              className="pixel-btn acc-head"
              aria-expanded={expanded}
              data-sfx="click"
              onClick={() => setOpen(expanded ? null : i)}
            >
              {expanded ? "▼" : "▶"} {it.title}
            </button>
            {expanded && <div className="acc-body">{it.render()}</div>}
          </div>
        );
      })}
    </div>
  );
}
