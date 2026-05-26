import PlayerImage from "./PlayerImage";

export default function Substitutes({ players, teamColor, teamAccent, onDragStart, onPlayerClick }) {
  return (
    <div className="bench-bar">
      <div className="bench-bar-title">🪑 SUBSTITUTES ({players.length})</div>
      <div className="bench-bar-list">
        {players.map(p => (
          <div key={p.id} className="bench-chip"
            draggable onDragStart={() => onDragStart(p)} onClick={() => onPlayerClick(p)}>
            <PlayerImage player={p} teamColor={teamColor} teamAccent={teamAccent} size={32} />
            <div className="bench-chip-info">
              <div className="bench-chip-name">{p.name.split(" ").slice(-1)[0]}</div>
              <div className="bench-chip-meta">
                <span className="bench-chip-pos" style={{background: teamColor}}>{p.position}</span>
                <span className="bench-chip-num">#{p.number}</span>
              </div>
            </div>
          </div>
        ))}
        {players.length === 0 && <div className="bench-empty">All on pitch ✓</div>}
      </div>
    </div>
  );
}
