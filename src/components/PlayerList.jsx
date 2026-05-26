import PlayerImage from "./PlayerImage";

export default function PlayerList({ players, assignedIds, onDragStart, onPlayerClick, teamColor, teamAccent, pendingPlayer }) {
  const posOrder = ["GK","RB","CB","LB","DM","CM","AM","RW","LW","ST"];
  const grouped = {};
  posOrder.forEach(p => { grouped[p] = players.filter(pl => pl.position === p); });
  const others = players.filter(pl => !posOrder.includes(pl.position));
  if (others.length) grouped["Other"] = others;

  return (
    <div className="player-list">
      <div className="player-list-header">SQUAD · {players.length} PLAYERS</div>
      {Object.entries(grouped).filter(([,v]) => v.length > 0).map(([pos, pls]) => (
        <div key={pos} className="position-group">
          <div className="position-group-label">{pos}</div>
          {pls.map(p => {
            const isAssigned = assignedIds.has(p.id);
            const isPending = pendingPlayer?.id === p.id;
            return (
              <div key={p.id}
                className={`player-card ${isAssigned?"assigned":""} ${isPending?"selected-pending":""}`}
                draggable={!isAssigned}
                onDragStart={() => !isAssigned && onDragStart(p)}
                onClick={() => onPlayerClick(p)}>
                <PlayerImage player={p} teamColor={isAssigned?"#555":teamColor} teamAccent={teamAccent||"#fff"} size={36} />
                <div className="player-card-info">
                  <div className="player-card-name">{p.name}</div>
                  <div className="player-card-meta">
                    <span className="player-card-club">{p.club}</span>
                    <span className="player-card-age">Age {p.age}</span>
                  </div>
                </div>
                <div className="player-card-right">
                  <div className="player-card-form">
                    {p.form.slice(-3).map((r,i) => <span key={i} className={`form-dot form-${r}`}>{r}</span>)}
                  </div>
                  <div className="player-card-num">#{p.number}</div>
                </div>
                {isAssigned && <div className="assigned-badge">✓</div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
