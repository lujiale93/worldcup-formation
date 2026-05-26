import { makeShirtSvg, getClubFlagUrl } from "./PlayerImage";
import { CLUB_HISTORY } from "../data/playerIds";
import { RECENT_FORM } from "../data/recentForm";
import { getTeamFlagUrl, getOpponentFlagUrl } from "../data/flags";

function FlagImg({ src, size = 20 }) {
  if (!src) return null;
  return <img src={src} alt="" style={{ width: size, height: "auto", borderRadius: 2, flexShrink: 0 }}
    onError={e => e.target.style.display = 'none'} />;
}

export default function PlayerModal({ player, teamColor, teamAccent = "#ffffff", teamFlag, fixtures, onClose }) {
  const formColor = { W: "#22c55e", D: "#f59e0b", L: "#ef4444" };
  const winRate = player.form.filter(f => f === "W").length * 20;
  const clubHistory = CLUB_HISTORY[player.id];
  const richForm = RECENT_FORM[player.id];
  const teamFlagUrl = getTeamFlagUrl(teamFlag);
  const clubFlagUrl = getClubFlagUrl(player.club);
  const shirtSrc = makeShirtSvg(player.number, teamColor, teamAccent, 80, player.position);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${teamColor}ee, ${teamColor}88)` }}>
          <div className="modal-avatar-wrap">
            <img src={shirtSrc} alt={player.name} style={{ width: 76, height: 76 }} />
            {teamFlagUrl && (
              <div className="modal-flag-badge">
                <img src={teamFlagUrl} alt={teamFlag} style={{ width: 26, height: "auto", borderRadius: 3 }}
                  onError={e => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
          <div className="modal-header-info">
            <div className="modal-number">#{player.number}</div>
            <div className="modal-name">{player.name}</div>
            <div className="modal-pos-club">
              <span className="modal-pos-badge">{player.position}</span>
              <div className="modal-club-row">
                {clubFlagUrl && <FlagImg src={clubFlagUrl} size={18} />}
                <span className="modal-club-text">{player.club}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          {/* Stats — now includes intl goals */}
          <div className="modal-stats-grid">
            <div className="stat-box"><div className="stat-val">{player.age}</div><div className="stat-lbl">Age</div></div>
            <div className="stat-box"><div className="stat-val">{player.caps}</div><div className="stat-lbl">Caps</div></div>
            <div className="stat-box"><div className="stat-val">{player.intlGoals ?? player.goals}</div><div className="stat-lbl">Intl Goals</div></div>
            <div className="stat-box"><div className="stat-val">{player.assists}</div><div className="stat-lbl">Assists</div></div>
          </div>

          {/* Recent form */}
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
                {player.form.map((r, i) => <div key={i} className="form-result" style={{ background: formColor[r] }}>{r}</div>)}
                <div className="form-winrate">{winRate}% wins</div>
              </div>
            )}
          </div>

          {/* Club Career */}
          <div className="modal-section">
            <div className="modal-section-title">Club Career</div>
            {clubHistory && clubHistory.length > 0 ? (
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
                {clubFlagUrl && <FlagImg src={clubFlagUrl} size={24} />}
                <span style={{ fontSize: "1.3rem" }}>🏟️</span>
                <div>
                  <div className="modal-club-name-big">{player.club}</div>
                  <div className="modal-club-sub">Current Club · 2025/26</div>
                </div>
              </div>
            )}
          </div>

          {/* Fixtures with date, time SGT, venue */}
          {fixtures && (
            <div className="modal-section">
              <div className="modal-section-title">World Cup 2026 Fixtures (SGT)</div>
              <div className="modal-fixtures">
                {fixtures.map((f, i) => {
                  const flagUrl = getOpponentFlagUrl(f.opponent || f);
                  const isObj = typeof f === "object";
                  return (
                    <div key={i} className="modal-fixture-row fixture-detailed">
                      <span className="fixture-md">MD{i + 1}</span>
                      {flagUrl && <FlagImg src={flagUrl} size={22} />}
                      <div className="fixture-detail">
                        <div className="fixture-opponent">{isObj ? f.opponent : f}</div>
                        {isObj && <div className="fixture-datetime">{f.date} · {f.time}</div>}
                        {isObj && <div className="fixture-venue">{f.venue}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
