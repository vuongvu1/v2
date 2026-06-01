import { type ReactNode, useState } from "react";

export interface TabDef {
  key: string;
  label: string;
  render: () => ReactNode;
}

export default function PixelTabs({ tabs }: { tabs: TabDef[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="pg-tabs">
      <div className="pg-tablist" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === active}
            className={`pixel-btn pg-tab${t.key === active ? " active" : ""}`}
            data-sfx="click"
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pg-panel" role="tabpanel">
        {current?.render()}
      </div>
    </div>
  );
}
