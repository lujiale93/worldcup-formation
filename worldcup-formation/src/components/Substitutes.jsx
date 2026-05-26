import { useState } from "react";
import { getPlayerImageUrl } from "../data/playerIds";

function SubAvatar({ player, teamColor, size = 36 }) {
  const [error, setError] = useState(false);
  const imgUrl = getPlayerImageUrl(player.id);
  const initials = player.name.split(" ").map(w => w[0]).slice(0, 2).join("");
  if (!imgUrl || error) {
    return (
      <div className="sub-avatar" style={{ width: size, height: size, background: teamColor }}>
        {initials}
      </div>
    );
  }
  return (
    <div className="sub-avatar-wrap" style={{ width: size, height: size }}>
      <img src={imgUrl} alt={player.name} className="sub-avatar-img"
        style={{ width: size, height: size }} onError={() => setError(true)} />
    </div>
  );
}

export default function Substitutes({ players, teamColor, onDragStart, onPlayerClick }) {
  return (
    <div className="bench-panel-inner">
      <div className="bench-title">
        <span>🪑</span> BENCH
        <span className="bench-count">{players.length}</span>
      </div>
      <div className="bench-list">
        {players.map(p => (
          <div key={p.id} className="bench-card"
            draggable
            onDragStart={() => onDragStart(p)}
            onClick={() => onPlayerClick(p)}>
            <SubAvatar player={p} teamColor={teamColor} size={34} />
            <div className="bench-card-info">
              <div className="bench-card-name">{p.name.split(" ").slice(-1)[0]}</div>
              <div className="bench-card-meta">
                <span className="bench-pos" style={{ background: teamColor }}>{p.position}</span>
                <span className="bench-age">Age {p.age}</span>
              </div>
            </div>
            <div className="bench-card-num">#{p.number}</div>
          </div>
        ))}
        {players.length === 0 && (
          <div className="bench-empty">All players on pitch</div>
        )}
      </div>
    </div>
  );
}
