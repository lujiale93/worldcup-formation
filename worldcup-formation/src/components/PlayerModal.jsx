import { useState, useEffect } from "react";
import { getPlayerImageUrl, CLUB_HISTORY } from "../data/playerIds";
import { RECENT_FORM } from "../data/recentForm";
import { FLAG_CDN_URLS } from "../data/flags";

function PlayerImage({ playerId, name, teamColor }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("");

  useEffect(() => {
    const url = getPlayerImageUrl(playerId);
    if (url) setImgSrc(url); else setError(true);
  }, [playerId]);

  if (error || !imgSrc) {
    return <div className="modal-avatar fallback" style={{ background: teamColor }}>{initials}</div>;
  }
  return (
    <div className="modal-avatar-img-wrap">
      {!loaded && <div className="modal-avatar fallback" style={{ background: teamColor }}>{initials}</div>}
      <img src={imgSrc} alt={name}
        className={`modal-player-img ${loaded ? "loaded" : "hidden"}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); }} />
    </div>
  );
}

function TeamFlagImg({ teamId, size = 20 }) {
  const [error, setError] = useState(false);
  const url = FLAG_CDN_URLS[teamId];
  if (error || !url) return null;
  return <img src={url} alt={teamId} onError={() => setError(true)}
    style={{ width: size, height: "auto", borderRadius: 2, verticalAlign: "middle", marginRight: 4 }} />;
}

export default function PlayerModal({ player, teamColor, teamFlag, teamName, fixtures, onClose }) {
  const formColor = { W: "#22c55e", D: "#f59e0b", L: "#ef4444" };
  const winRate = player.form.filter(f => f === "W").length * 20;
  const clubHistory = CLUB_HISTORY[player.id];
  const richForm = RECENT_FORM[player.id];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${teamColor}ee, ${teamColor}88)` }}>
          <div className="modal-avatar-wrap">
            <PlayerImage playerId={player.id} name={player.name} teamColor={teamColor} />
            <div className="modal-flag-img">
              <TeamFlagImg teamId={teamFlag} size={22} />
            </div>
          </div>
          <div className="modal-header-info">
            <div className="modal-number">#{player.number}</div>
            <div className="modal-name">{player.name}</div>
            <div className="modal-pos-club">
              <span className="modal-pos-badge">{player.position}</span>
              <span className="modal-club-text">{player.club}</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-stats-grid">
            <div className="stat-box"><div className="stat-val">{player.age}</div><div className="stat-lbl">Age</div></div>
            <div className="stat-box"><div className="stat-val">{player.caps}</div><div className="stat-lbl">Caps</div></div>
            <div className="stat-box"><div className="stat-val">{player.goals}</div><div className="stat-lbl">Goals</div></div>
            <div className="stat-box"><div className="stat-val">{player.assists}</div><div className="stat-lbl">Assists</div></div>
          </div>

          {/* Recent form with opponents */}
          <div className="modal-section">
            <div className="modal-section-title">Recent Form</div>
            {richForm ? (
              <div className="rich-form-list">
                {richForm.map((match, i) => (
                  <div key={i} className="rich-form-row">
                    <div className="rich-form-result" style={{ background: formColor[match.result] }}>{match.result}</div>
                    <div className="rich-form-info">
                      <span className="rich-form-opp">vs {match.opponent}</span>
                      <span className="rich-form-comp">{match.competition}</span>
                    </div>
                    <div className="rich-form-score">{match.score}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="modal-form-row">
                {player.form.map((r, i) => (
                  <div key={i} className="form-result" style={{ background: formColor[r] }}>{r}</div>
                ))}
                <div className="form-winrate">{winRate}% wins</div>
              </div>
            )}
          </div>

          {/* Club history */}
          <div className="modal-section">
            <div className="modal-section-title">Club Career</div>
            {clubHistory ? (
              <div className="club-history-table">
                <div className="club-history-header">
                  <span>Club</span><span>Years</span><span>Apps</span><span>Goals</span>
                </div>
                {clubHistory.map((row, i) => (
                  <div key={i} className={`club-history-row ${i === clubHistory.length - 1 ? "current" : ""}`}>
                    <span className="ch-club">{row.club}</span>
                    <span className="ch-years">{row.years}</span>
                    <span className="ch-apps">{row.apps || "—"}</span>
                    <span className="ch-goals">{row.goals || "—"}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="modal-club-card">
                <div className="modal-club-icon">🏟️</div>
                <div>
                  <div className="modal-club-name-big">{player.club}</div>
                  <div className="modal-club-sub">Current Club · 2025/26</div>
                </div>
              </div>
            )}
          </div>

          {/* Fixtures */}
          {fixtures && (
            <div className="modal-section">
              <div className="modal-section-title">World Cup 2026 Fixtures</div>
              <div className="modal-fixtures">
                {fixtures.map((f, i) => (
                  <div key={i} className="modal-fixture-row">
                    <span className="fixture-md">MD{i + 1}</span>
                    <span className="fixture-match">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
