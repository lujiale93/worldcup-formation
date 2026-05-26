export default function PlayerList({ players, assignedIds, onDragStart, onPlayerClick, teamColor }) {
  const positions = ["GK","RB","CB","LB","DM","CM","AM","RW","LW","ST"];
  const grouped = {};
  positions.forEach(p => { grouped[p] = players.filter(pl => pl.position === p); });
  const others = players.filter(pl => !positions.includes(pl.position));
  if (others.length) grouped["Other"] = others;

  return (
    <div className="player-list">
      {Object.entries(grouped).filter(([,v])=>v.length>0).map(([pos, pls]) => (
        <div key={pos} className="position-group">
          <div className="position-group-label">{pos}</div>
          {pls.map(p => (
            <div key={p.id}
              className={`player-card ${assignedIds.has(p.id)?"assigned":""}`}
              draggable={!assignedIds.has(p.id)}
              onDragStart={() => !assignedIds.has(p.id) && onDragStart(p)}
              onClick={() => onPlayerClick(p)}>
              <div className="player-card-avatar" style={{background: assignedIds.has(p.id)?"#ccc":teamColor}}>
                {p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
              </div>
              <div className="player-card-info">
                <div className="player-card-name">{p.name}</div>
                <div className="player-card-club">{p.club}</div>
              </div>
              <div className="player-card-form">
                {p.form.map((r,i) => <span key={i} className={`form-dot form-${r}`}>{r}</span>)}
              </div>
              {assignedIds.has(p.id) && <div className="assigned-badge">✓</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
