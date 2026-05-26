import { POS_COLORS } from "./PlayerImage";

const LEGEND = [
  { ring: "#f59e0b", label: "GK", name: "Goalkeeper" },
  { ring: "#3b82f6", label: "DEF", name: "Defender" },
  { ring: "#a855f7", label: "MID", name: "Midfielder" },
  { ring: "#10b981", label: "WNG", name: "Winger" },
  { ring: "#ef4444", label: "ST", name: "Striker" },
];

export default function PositionLegend() {
  return (
    <div className="pos-legend">
      <span className="pos-legend-title">POSITIONS:</span>
      {LEGEND.map(l => (
        <div key={l.label} className="pos-legend-item" title={l.name}>
          <div className="pos-legend-dot" style={{ background: l.ring }} />
          <span>{l.label}</span>
        </div>
      ))}
    </div>
  );
}
