import { useState, useRef } from "react";

export default function Pitch({ formation, assignments, teamColor, teamAccent, onDrop, onRemove, onDragStart, onPlayerClick, draggedPlayer, onSwap, onMovePosition }) {
  const [hovered, setHovered] = useState(null);
  const [draggingPos, setDraggingPos] = useState(null);
  const pitchRef = useRef(null);

  function handleSlotDragOver(e, posId) { e.preventDefault(); setHovered(posId); }
  function handleSlotDrop(e, posId) {
    e.preventDefault(); setHovered(null);
    if (draggingPos) {
      if (draggingPos !== posId) onSwap(draggingPos, posId);
      setDraggingPos(null);
    } else {
      onDrop(posId);
    }
  }

  function handleTokenDragStart(e, player, posId) {
    e.stopPropagation();
    setDraggingPos(posId);
    onDragStart(player);
  }

  function handlePitchDragOver(e) {
    e.preventDefault();
    if (draggingPos && pitchRef.current) {
      const rect = pitchRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onMovePosition(draggingPos, Math.max(5, Math.min(95, x)), Math.max(5, Math.min(95, y)));
    }
  }

  function handlePitchDrop(e) {
    e.preventDefault();
    setDraggingPos(null);
  }

  function getInitials(name) {
    return name.split(" ").map(w => w[0]).slice(0, 2).join("");
  }

  return (
    <div className="pitch-wrapper">
      <div className="pitch" ref={pitchRef} onDragOver={handlePitchDragOver} onDrop={handlePitchDrop}>
        {/* Field markings */}
        <div className="field-center-circle" />
        <div className="field-center-dot" />
        <div className="field-halfway" />
        <div className="field-penalty-top" />
        <div className="field-penalty-bottom" />
        <div className="field-goal-top" />
        <div className="field-goal-bottom" />
        <div className="field-arc-top" />
        <div className="field-arc-bottom" />

        {formation.positions.map(pos => {
          const player = assignments[pos.id];
          const isHov = hovered === pos.id;
          const isDraggingThis = draggingPos === pos.id;
          return (
            <div key={pos.id}
              className={`position-slot ${isHov?"hovered":""} ${player?"filled":""} ${isDraggingThis?"dragging-from":""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onDragOver={e => handleSlotDragOver(e, pos.id)}
              onDragLeave={() => setHovered(null)}
              onDrop={e => handleSlotDrop(e, pos.id)}>
              {player ? (
                <div className="player-token"
                  draggable
                  onDragStart={e => handleTokenDragStart(e, player, pos.id)}
                  onClick={() => onPlayerClick(player)}
                  style={{ "--team-color": teamColor, "--team-accent": teamAccent }}
                  title={`${player.name} · Drag to move`}>
                  <div className="token-shirt" style={{background: teamColor, color: teamAccent}}>
                    <div className="token-number">{player.number}</div>
                  </div>
                  <div className="token-name-tag">
                    <span className="token-name">{player.name.split(" ").slice(-1)[0]}</span>
                    <span className="token-pos-badge">{pos.label}</span>
                  </div>
                  <button className="token-remove" onClick={e => { e.stopPropagation(); onRemove(pos.id); }}>×</button>
                </div>
              ) : (
                <div className="empty-slot">
                  <div className="slot-ring">
                    <div className="slot-label">{pos.label}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
