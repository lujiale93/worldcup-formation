export default function PlayerModal({ player, teamColor, teamFlag, fixtures, onClose }) {
  const formColor = { W: "#22c55e", D: "#f59e0b", L: "#ef4444" };
  const initials = player.name.split(" ").map(w => w[0]).slice(0, 2).join("");
  const winRate = player.form.filter(f => f === "W").length * 20;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header" style={{background: `linear-gradient(135deg, ${teamColor}dd, ${teamColor}99)`}}>
          <div className="modal-avatar-wrap">
            <div className="modal-avatar" style={{background: teamColor, border: "3px solid rgba(255,255,255,0.4)"}}>
              {initials}
            </div>
            <div className="modal-flag">{teamFlag}</div>
          </div>
          <div className="modal-header-info">
            <div className="modal-number">#{player.number}</div>
            <div className="modal-name">{player.name}</div>
            <div className="modal-pos-club">
              <span className="modal-pos-badge">{player.position}</span>
              <span className="modal-club-name">{player.club}</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-stats-grid">
            <div className="stat-box">
              <div className="stat-val">{player.age}</div>
              <div className="stat-lbl">Age</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{player.caps}</div>
              <div className="stat-lbl">Caps</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{player.goals}</div>
              <div className="stat-lbl">Goals</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{player.assists}</div>
              <div className="stat-lbl">Assists</div>
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Recent Form</div>
            <div className="modal-form-row">
              {player.form.map((r, i) => (
                <div key={i} className="form-result" style={{background: formColor[r]}}>{r}</div>
              ))}
              <div className="form-winrate">{winRate}% wins</div>
            </div>
          </div>

          {fixtures && (
            <div className="modal-section">
              <div className="modal-section-title">World Cup Fixtures</div>
              <div className="modal-fixtures">
                {fixtures.map((f, i) => (
                  <div key={i} className="modal-fixture-row">
                    <span className="fixture-md">MD{i+1}</span>
                    <span className="fixture-match">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-section">
            <div className="modal-section-title">Current Club</div>
            <div className="modal-club-card">
              <div className="modal-club-icon">🏟️</div>
              <div className="modal-club-details">
                <div className="modal-club-name-big">{player.club}</div>
                <div className="modal-club-sub">2025/26 Season</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
