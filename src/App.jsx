import { useState } from "react";
import { TEAMS, FORMATIONS, TEAM_GROUPS } from "./data/teams";
import { getTeamFlagUrl, getOpponentFlagUrl } from "./data/flags";
import Pitch from "./components/Pitch";
import PlayerList from "./components/PlayerList";
import Substitutes from "./components/Substitutes";
import PlayerModal from "./components/PlayerModal";
import "./App.css";

function FlagImg({ src, alt, size = 32, radius = 4 }) {
  const [err, setErr] = useState(false);
  if (!src || err) return null;
  return <img src={src} alt={alt} onError={() => setErr(true)}
    style={{ width: size, height: "auto", maxHeight: size * 0.75, borderRadius: radius, display: "block", objectFit: "cover" }} />;
}

function OpponentFixture({ fixture, index }) {
  const flagUrl = getOpponentFlagUrl(fixture);
  return (
    <div className="fixture-row">
      <span className="fixture-num">MD{index + 1}</span>
      {flagUrl && <FlagImg src={flagUrl} alt={fixture} size={22} radius={3} />}
      <span className="fixture-opp">{fixture}</span>
    </div>
  );
}

export default function App() {
  const teamKeys = Object.keys(TEAMS);
  const [selectedTeam, setSelectedTeam] = useState("brazil");
  const [formation, setFormation] = useState("4-3-3");
  const [assignments, setAssignments] = useState({});
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);
  const [positionOverrides, setPositionOverrides] = useState({});
  // Mobile tab state: "pitch" | "squad" | "bench"
  const [mobileTab, setMobileTab] = useState("pitch");

  const team = TEAMS[selectedTeam];
  const formationData = FORMATIONS[formation];
  const groupInfo = TEAM_GROUPS[selectedTeam];
  const assignedPlayerIds = new Set(Object.values(assignments).map(p => p.id));
  const substitutes = team.players.filter(p => !assignedPlayerIds.has(p.id));
  const starters = team.players.filter(p => assignedPlayerIds.has(p.id));

  function handleTeamChange(t) { setSelectedTeam(t); setAssignments({}); setPositionOverrides({}); }
  function handleFormationChange(f) { setFormation(f); setAssignments({}); setPositionOverrides({}); }

  function handleDrop(positionId) {
    if (!draggedPlayer) return;
    setAssignments(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (next[k]?.id === draggedPlayer.id) delete next[k]; });
      next[positionId] = draggedPlayer;
      return next;
    });
    setDraggedPlayer(null);
  }

  function swapPlayers(fromPosId, toPosId) {
    setAssignments(prev => {
      const next = { ...prev };
      const temp = next[fromPosId];
      next[fromPosId] = next[toPosId];
      next[toPosId] = temp;
      if (!next[fromPosId]) delete next[fromPosId];
      if (!next[toPosId]) delete next[toPosId];
      return next;
    });
  }

  function updatePositionXY(posId, x, y) {
    setPositionOverrides(prev => ({ ...prev, [posId]: { x, y } }));
  }

  function removeFromPitch(positionId) {
    setAssignments(prev => { const n = { ...prev }; delete n[positionId]; return n; });
  }

  function clearAll() { setAssignments({}); setPositionOverrides({}); }

  function autoFill() {
    const players = [...team.players];
    const positions = formationData.positions;
    const posToType = {
      GK:"GK",CB:"CB",CB1:"CB",CB2:"CB",CB3:"CB",RB:"RB",LB:"LB",RWB:"LB",LWB:"LB",
      DM:"DM",DM1:"DM",DM2:"DM",CM:"CM",CM1:"CM",CM2:"CM",CM3:"CM",
      RM:"CM",LM:"CM",AM:"AM",RW:"RW",LW:"LW",ST:"ST",ST1:"ST",ST2:"ST"
    };
    const used = new Set();
    const posMap = {};
    positions.forEach(pos => {
      const type = posToType[pos.id] || "CM";
      const match = players.find(p => !used.has(p.id) && p.position === type);
      const fallback = players.find(p => !used.has(p.id));
      const chosen = match || fallback;
      if (chosen) { posMap[pos.id] = chosen; used.add(chosen.id); }
    });
    setAssignments(posMap);
  }

  const mergedPositions = formationData.positions.map(pos => ({
    ...pos, ...(positionOverrides[pos.id] || {})
  }));

  const teamFlagUrl = getTeamFlagUrl(selectedTeam);

  const sharedProps = {
    assignments, assignedPlayerIds, substitutes, starters,
    team, groupInfo, formation, teamFlagUrl,
    mergedPositions, formationData,
    draggedPlayer, modalPlayer,
    handleTeamChange, handleFormationChange,
    handleDrop, swapPlayers, updatePositionXY,
    removeFromPitch, clearAll, autoFill,
    setDraggedPlayer, setModalPlayer,
  };

  return (
    <div className="app">
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-ball">⚽</span>
            <div>
              <div className="logo-title">FORMATION LAB</div>
              <div className="logo-sub">FIFA World Cup 2026</div>
            </div>
          </div>
          <div className="header-controls">
            <div className="control-group">
              <label>TEAM</label>
              <div className="team-tabs">
                {teamKeys.map(k => {
                  const flagUrl = getTeamFlagUrl(k);
                  return (
                    <button key={k} className={`team-tab ${selectedTeam===k?"active":""}`}
                      style={selectedTeam===k ? { borderColor: TEAMS[k].color, boxShadow: `0 0 10px ${TEAMS[k].color}55` } : {}}
                      onClick={() => handleTeamChange(k)} title={TEAMS[k].name}>
                      {flagUrl
                        ? <img src={flagUrl} alt={TEAMS[k].name} onError={e=>e.target.style.display='none'} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:2}} />
                        : <span style={{fontSize:"1rem"}}>{TEAMS[k].flag}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="control-group">
              <label>FORMATION</label>
              <div className="formation-tabs">
                {Object.keys(FORMATIONS).map(f => (
                  <button key={f} className={`formation-tab ${formation===f?"active":""}`} onClick={() => handleFormationChange(f)}>{f}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── DESKTOP LAYOUT ── */}
      <main className="main desktop-only">
        <aside className="sidebar">
          <SidebarContent team={team} groupInfo={groupInfo} formation={formation} starters={starters}
            teamFlagUrl={teamFlagUrl} assignedPlayerIds={assignedPlayerIds}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
            onAutoFill={autoFill} onClear={clearAll} />
        </aside>
        <section className="pitch-section">
          <div className="pitch-tip">💡 Drag squad → pitch · Drag tokens to move · Drop on token to swap</div>
          <div className="pitch-and-bench">
            <Pitch formation={{...formationData, positions: mergedPositions}}
              assignments={assignments} teamColor={team.color} teamAccent={team.accent}
              onDrop={handleDrop} onRemove={removeFromPitch}
              onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
              draggedPlayer={draggedPlayer} onSwap={swapPlayers}
              onMovePosition={updatePositionXY} />
            <Substitutes players={substitutes} teamColor={team.color}
              onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer} />
          </div>
        </section>
      </main>

      {/* ── MOBILE LAYOUT ── */}
      <div className="mobile-only mobile-layout">
        {/* Mobile tab bar */}
        <div className="mobile-tabs">
          <button className={`mobile-tab ${mobileTab==="squad"?"active":""}`} onClick={() => setMobileTab("squad")}>
            👥 Squad
          </button>
          <button className={`mobile-tab ${mobileTab==="pitch"?"active":""}`} onClick={() => setMobileTab("pitch")}>
            ⚽ Pitch
          </button>
          <button className={`mobile-tab ${mobileTab==="bench"?"active":""}`} onClick={() => setMobileTab("bench")}>
            🪑 Bench ({substitutes.length})
          </button>
        </div>

        {/* Mobile content */}
        <div className="mobile-content">
          {mobileTab === "squad" && (
            <div className="mobile-squad-panel">
              <SidebarContent team={team} groupInfo={groupInfo} formation={formation} starters={starters}
                teamFlagUrl={teamFlagUrl} assignedPlayerIds={assignedPlayerIds}
                onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
                onAutoFill={autoFill} onClear={clearAll} />
            </div>
          )}

          {mobileTab === "pitch" && (
            <div className="mobile-pitch-panel">
              <div className="mobile-formation-row">
                {Object.keys(FORMATIONS).map(f => (
                  <button key={f} className={`formation-tab ${formation===f?"active":""}`} onClick={() => handleFormationChange(f)}>{f}</button>
                ))}
              </div>
              <div className="mobile-pitch-wrap">
                <Pitch formation={{...formationData, positions: mergedPositions}}
                  assignments={assignments} teamColor={team.color} teamAccent={team.accent}
                  onDrop={handleDrop} onRemove={removeFromPitch}
                  onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
                  draggedPlayer={draggedPlayer} onSwap={swapPlayers}
                  onMovePosition={updatePositionXY} />
              </div>
              <div className="mobile-pitch-actions">
                <button className="btn-autofill" onClick={autoFill}>⚡ Auto Fill</button>
                <button className="btn-clear" onClick={clearAll}>✕ Clear</button>
              </div>
            </div>
          )}

          {mobileTab === "bench" && (
            <div className="mobile-bench-panel">
              <div className="mobile-bench-grid">
                {substitutes.map(p => (
                  <div key={p.id} className="mobile-bench-card" onClick={() => setModalPlayer(p)}>
                    <div className="mobile-bench-num" style={{background: team.color}}>#{p.number}</div>
                    <div className="mobile-bench-name">{p.name.split(" ").slice(-1)[0]}</div>
                    <div className="mobile-bench-pos" style={{background: team.color}}>{p.position}</div>
                    <div className="mobile-bench-age">Age {p.age}</div>
                  </div>
                ))}
                {substitutes.length === 0 && <div className="bench-empty">All players on pitch ✓</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {modalPlayer && (
        <PlayerModal player={modalPlayer} teamColor={team.color}
          teamFlag={selectedTeam} teamName={team.name}
          fixtures={groupInfo.fixtures} onClose={() => setModalPlayer(null)} />
      )}
    </div>
  );
}

// Shared sidebar content component
function SidebarContent({ team, groupInfo, formation, starters, teamFlagUrl, assignedPlayerIds, onDragStart, onPlayerClick, onAutoFill, onClear }) {
  return (
    <>
      <div className="sidebar-header">
        <div className="sidebar-flag-wrap">
          {teamFlagUrl
            ? <img src={teamFlagUrl} alt={team.name} style={{width:"100%",height:"auto",borderRadius:5,objectFit:"cover"}} />
            : <span style={{fontSize:"1.8rem"}}>{team.flag}</span>}
        </div>
        <div className="team-info">
          <div className="team-name">{team.name}</div>
          <div className="team-meta">Group {groupInfo.group} · {formation} · {starters.length}/11</div>
        </div>
      </div>
      <div className="fixtures-bar">
        <div className="fixtures-title">GROUP STAGE FIXTURES</div>
        {groupInfo.fixtures.map((f, i) => {
          const flagUrl = getOpponentFlagUrl(f);
          return (
            <div key={i} className="fixture-row">
              <span className="fixture-num">MD{i+1}</span>
              {flagUrl && <img src={flagUrl} alt={f} onError={e=>e.target.style.display='none'} style={{width:22,height:"auto",borderRadius:3,flexShrink:0}} />}
              <span className="fixture-opp">{f}</span>
            </div>
          );
        })}
      </div>
      <div className="sidebar-actions">
        <button className="btn-autofill" onClick={onAutoFill}>⚡ Auto Fill</button>
        <button className="btn-clear" onClick={onClear}>✕ Clear</button>
      </div>
      <PlayerList players={team.players} assignedIds={assignedPlayerIds}
        onDragStart={onDragStart} onPlayerClick={onPlayerClick} teamColor={team.color} />
    </>
  );
}
