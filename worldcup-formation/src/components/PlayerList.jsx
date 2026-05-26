import { useState } from "react";
import { getPlayerImageUrl } from "../data/playerIds";

function PlayerAvatar({ player, teamColor, size = 34 }) {
  const [error, setError] = useState(false);
  const imgUrl = getPlayerImageUrl(player.id);
  const initials = player.name.split(" ").map(w => w[0]).slice(0, 2).join("");

  if (!imgUrl || error) {
    return (
      <div className="player-avatar" style={{ width: size, height: size, background: teamColor, fontSize: size * 0.28 }}>
        {initials}
      </div>
    );
  }

  return (
    <div className="player-avatar-wrap" style={{ width: size, height: size }}>
      <img
        src={imgUrl}
        alt={player.name}
        className="player-avatar-img"
        style={{ width: size, height: size }}
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function PlayerList({ players, assignedIds, onDragStart, onPlayerClick, teamColor }) {
  const posOrder = ["GK", "RB", "CB", "LB", "DM", "CM", "AM", "RW", "LW", "ST"];
  const grouped = {};
  posOrder.forEach(p => { grouped[p] = players.filter(pl => pl.position === p); });
  const others = players.filter(pl => !posOrder.includes(pl.position));
  if (others.length) grouped["Other"] = others;

  return (
    <div className="player-list">
      <div className="player-list-header">SQUAD ({players.length} players)</div>
      {Object.entries(grouped).filter(([, v]) => v.length > 0).map(([pos, pls]) => (
        <div key={pos} className="position-group">
          <div className="position-group-label">{pos}</div>
          {pls.map(p => (
            <div key={p.id}
              className={`player-card ${assignedIds.has(p.id) ? "assigned" : ""}`}
              draggable={!assignedIds.has(p.id)}
              onDragStart={() => !assignedIds.has(p.id) && onDragStart(p)}
              onClick={() => onPlayerClick(p)}>
              <PlayerAvatar player={p} teamColor={assignedIds.has(p.id) ? "#444" : teamColor} size={34} />
              <div className="player-card-info">
                <div className="player-card-name">{p.name}</div>
                <div className="player-card-meta">
                  <span className="player-card-club">{p.club}</span>
                  <span className="player-card-age">Age {p.age}</span>
                </div>
              </div>
              <div className="player-card-right">
                <div className="player-card-form">
                  {p.form.slice(-3).map((r, i) => <span key={i} className={`form-dot form-${r}`}>{r}</span>)}
                </div>
                <div className="player-card-num">#{p.number}</div>
              </div>
              {assignedIds.has(p.id) && <div className="assigned-badge">✓</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
