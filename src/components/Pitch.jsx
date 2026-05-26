import { useState } from "react";

export default function Pitch({ formation, assignments, teamColor, teamAccent, onDrop, onRemove, onDragStart, onPlayerClick, draggedPlayer }) {
  const [hovered, setHovered] = useState(null);

  function handleDragOver(e, posId) { e.preventDefault(); setHovered(posId); }
  function handleDrop(e, posId) { e.preventDefault(); setHovered(null); onDrop(posId); }

  return (
    <div className="pitch-wrapper">
      <div className="pitch">
        {/* Field markings */}
        <div className="field-center-circle" />
        <div className="field-center-dot" />
        <div className="field-halfway" />
        <div className="field-penalty-top" />
        <div className="field-penalty-bottom" />
        <div className="field-goal-top" />
        <div className="field-goal-bottom" />

        {formation.positions.map(pos => {
          const player = assignments[pos.id];
          const isHov = hovered === pos.id;
          return (
            <div key={pos.id} className={`position-slot ${isHov?"hovered":""} ${player?"filled":""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onDragOver={e => handleDragOver(e, pos.id)}
              onDragLeave={() => setHovered(null)}
              onDrop={e => handleDrop(e, pos.id)}>
              {player ? (
                <div className="player-token"
                  draggable
                  onDragStart={() => onDragStart(player)}
                  onClick={() => onPlayerClick(player)}
                  style={{ background: teamColor, color: teamAccent }}
                  title={player.name}>
                  <div className="token-avatar">{player.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
                  <div className="token-name">{player.name.split(" ").slice(-1)[0]}</div>
                  <div className="token-pos">{pos.label}</div>
                  <button className="token-remove" onClick={e => { e.stopPropagation(); onRemove(pos.id); }}>×</button>
                </div>
              ) : (
                <div className="empty-slot">
                  <div className="slot-label">{pos.label}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
