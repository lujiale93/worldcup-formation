export default function PlayerModal({ player, teamColor, onClose }) {
  const formColor = { W: "#22c55e", D: "#f59e0b", L: "#ef4444" };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header" style={{background: teamColor}}>
          <div className="modal-avatar">{player.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
          <div>
            <div className="modal-name">{player.name}</div>
            <div className="modal-pos-club">{player.position} · {player.club}</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-stats">
            <div className="stat-box"><div className="stat-val">{player.age}</div><div className="stat-lbl">Age</div></div>
            <div className="stat-box"><div className="stat-val">{player.caps}</div><div className="stat-lbl">Caps</div></div>
            <div className="stat-box"><div className="stat-val">{player.goals}</div><div className="stat-lbl">Goals</div></div>
            <div className="stat-box"><div className="stat-val">{player.assists}</div><div className="stat-lbl">Assists</div></div>
          </div>
          <div className="modal-form-section">
            <div className="modal-section-title">Recent Form (last 5)</div>
            <div className="modal-form">
              {player.form.map((r,i) => (
                <div key={i} className="form-result" style={{background: formColor[r]}}>
                  {r}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-section-title">Club</div>
          <div className="modal-club">{player.club}</div>
        </div>
      </div>
    </div>
  );
}
