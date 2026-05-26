import { useState } from "react";
import { TEAMS, FORMATIONS, TEAM_GROUPS } from "./data/teams";
import { getTeamFlagUrl, getOpponentFlagUrl } from "./data/flags";
import Pitch from "./components/Pitch";
import PlayerList from "./components/PlayerList";
import Substitutes from "./components/Substitutes";
import PlayerModal from "./components/PlayerModal";
import PositionLegend from "./components/PositionLegend";
import "./App.css";

function OpponentFixture({ fixture, index, time = "", date = "" }) {
  const flagUrl = getOpponentFlagUrl(fixture);
  return (
    <div className="fixture-row">
      <span className="fixture-num">MD{index + 1}</span>
      {flagUrl && <img src={flagUrl} alt={fixture} onError={e=>e.target.style.display="none"}
        style={{width:22,height:"auto",borderRadius:3,flexShrink:0}} />}
      <div className="fixture-info">
        <span className="fixture-opp">{fixture}</span>
        {time && <span className="fixture-time">{date} {time}</span>}
      </div>
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
  // Mobile: pending player to place, and which position is being picked
  const [pendingPlayer, setPendingPlayer] = useState(null);

  const team = TEAMS[selectedTeam];
  const formationData = FORMATIONS[formation];
  const groupInfo = TEAM_GROUPS[selectedTeam];
  const assignedPlayerIds = new Set(Object.values(assignments).map(p => p.id));
  const substitutes = team.players.filter(p => !assignedPlayerIds.has(p.id));
  const starters = team.players.filter(p => assignedPlayerIds.has(p.id));

  function handleTeamChange(t) { setSelectedTeam(t); setAssignments({}); setPositionOverrides({}); setPendingPlayer(null); }
  function handleFormationChange(f) { setFormation(f); setAssignments({}); setPositionOverrides({}); setPendingPlayer(null); }

  // Desktop drag-drop
  function handleDrop(positionId) {
    if (!draggedPlayer) return;
    assignPlayerToPosition(draggedPlayer, positionId);
    setDraggedPlayer(null);
  }

  // Mobile tap-to-place
  function handleMobilePlayerTap(player) {
    if (assignedPlayerIds.has(player.id)) {
      // Remove from pitch
      setAssignments(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => { if (next[k]?.id === player.id) delete next[k]; });
        return next;
      });
      setPendingPlayer(null);
    } else {
      // Select player to place
      setPendingPlayer(player);
    }
  }

  function handleMobilePositionTap(positionId) {
    if (!pendingPlayer) return;
    assignPlayerToPosition(pendingPlayer, positionId);
    setPendingPlayer(null);
  }

  function assignPlayerToPosition(player, positionId) {
    setAssignments(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (next[k]?.id === player.id) delete next[k]; });
      next[positionId] = player;
      return next;
    });
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

  function clearAll() { setAssignments({}); setPositionOverrides({}); setPendingPlayer(null); }

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
    setPendingPlayer(null);
  }

  const mergedPositions = formationData.positions.map(pos => ({
    ...pos, ...(positionOverrides[pos.id] || {})
  }));

  const teamFlagUrl = getTeamFlagUrl(selectedTeam);

  const sidebarContent = (
    <>
      <div className="sidebar-header">
        <div className="sidebar-flag-wrap">
          {teamFlagUrl
            ? <img src={teamFlagUrl} alt={team.name} style={{width:"100%",height:"auto",borderRadius:5}} onError={e=>e.target.style.display='none'} />
            : <span style={{fontSize:"1.8rem"}}>{team.flag}</span>}
        </div>
        <div className="team-info">
          <div className="team-name">{team.name}</div>
          <div className="team-meta">Group {groupInfo.group} · {formation} · {starters.length}/11</div>
        </div>
      </div>
      <div className="fixtures-bar">
        <div className="fixtures-title">GROUP STAGE FIXTURES</div>
        {groupInfo.fixtures.map((f,i) => <OpponentFixture key={i} fixture={typeof f === "object" ? f.opponent : f} index={i} time={typeof f === "object" ? f.time : ""} date={typeof f === "object" ? f.date : ""} />)}
      </div>
      <div className="sidebar-actions">
        <button className="btn-autofill" onClick={autoFill}>⚡ Auto Fill</button>
        <button className="btn-clear" onClick={clearAll}>✕ Clear</button>
      </div>
      <PositionLegend />
      <PlayerList players={team.players} assignedIds={assignedPlayerIds}
        onDragStart={setDraggedPlayer}
        onPlayerClick={(p) => handleMobilePlayerTap(p)}
        teamColor={team.color} teamAccent={team.accent}
        pendingPlayer={pendingPlayer} />
    </>
  );

  return (
    <div className="app">
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
                      style={selectedTeam===k?{borderColor:TEAMS[k].color,boxShadow:`0 0 10px ${TEAMS[k].color}55`}:{}}
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

      {/* DESKTOP */}
      <main className="main desktop-only">
        <aside className="sidebar">{sidebarContent}</aside>
        <section className="pitch-section">
          <div className="pitch-tip">💡 Drag squad → pitch · Drag tokens to reposition · Drop on token to swap</div>
          <div className="pitch-and-bench">
            <Pitch formation={{...formationData,positions:mergedPositions}}
              assignments={assignments} teamColor={team.color} teamAccent={team.accent}
              onDrop={handleDrop} onRemove={removeFromPitch}
              onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
              draggedPlayer={draggedPlayer} onSwap={swapPlayers}
              onMovePosition={updatePositionXY} />
            <Substitutes players={substitutes} teamColor={team.color} teamAccent={team.accent}
              onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer} />
          </div>
        </section>
      </main>

      {/* MOBILE — single scrollable page with sections */}
      <div className="mobile-only mobile-page">
        {/* Team + formation bar */}
        <div className="mobile-controls">
          <div className="mobile-formation-row">
            {Object.keys(FORMATIONS).map(f => (
              <button key={f} className={`formation-tab ${formation===f?"active":""}`} onClick={() => handleFormationChange(f)}>{f}</button>
            ))}
          </div>
          <div className="mobile-actions-row">
            <button className="btn-autofill" onClick={autoFill}>⚡ Auto Fill</button>
            <button className="btn-clear" onClick={clearAll}>✕ Clear</button>
          </div>
        </div>

        {/* Pending player banner */}
        {pendingPlayer && (
          <div className="mobile-pending-banner">
            <span>Tap a position to place <strong>{pendingPlayer.name.split(" ").slice(-1)[0]}</strong></span>
            <button onClick={() => setPendingPlayer(null)}>✕</button>
          </div>
        )}

        {/* PITCH — full width */}
        <div className="mobile-pitch-section">
          <Pitch formation={{...formationData,positions:mergedPositions}}
            assignments={assignments} teamColor={team.color} teamAccent={team.accent}
            onDrop={handleDrop} onRemove={removeFromPitch}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
            draggedPlayer={draggedPlayer} onSwap={swapPlayers}
            onMovePosition={updatePositionXY}
            onMobilePositionTap={handleMobilePositionTap}
            pendingPlayer={pendingPlayer} />
        </div>

        {/* SQUAD LIST */}
        <div className="mobile-section-header">👥 SQUAD</div>
        <div className="mobile-squad-section">
          {pendingPlayer && (
            <div className="mobile-squad-hint">Tap a position on the pitch above, or tap a player to change selection</div>
          )}
          <PositionLegend />
      <PlayerList players={team.players} assignedIds={assignedPlayerIds}
            onDragStart={setDraggedPlayer}
            onPlayerClick={handleMobilePlayerTap}
            teamColor={team.color} teamAccent={team.accent}
            pendingPlayer={pendingPlayer} />
        </div>

        {/* BENCH */}
        <div className="mobile-section-header">🪑 BENCH ({substitutes.length})</div>
        <div className="mobile-bench-section">
          <div className="mobile-bench-grid">
            {substitutes.map(p => (
              <div key={p.id} className={`mobile-bench-card ${pendingPlayer?.id===p.id?"pending":""}`}
                onClick={() => handleMobilePlayerTap(p)}>
                <div className="mobile-bench-num" style={{background:team.color,color:team.accent}}>#{p.number}</div>
                <div className="mobile-bench-name">{p.name.split(" ").slice(-1)[0]}</div>
                <div className="mobile-bench-pos" style={{background:team.color}}>{p.position}</div>
                <div className="mobile-bench-age">Age {p.age}</div>
              </div>
            ))}
            {substitutes.length === 0 && <div className="bench-empty" style={{gridColumn:"1/-1"}}>All players on pitch ✓</div>}
          </div>
        </div>

        {/* FIXTURES */}
        <div className="mobile-section-header">📅 GROUP {groupInfo.group} FIXTURES</div>
        <div className="mobile-fixtures-section">
          {groupInfo.fixtures.map((f,i) => <OpponentFixture key={i} fixture={typeof f === "object" ? f.opponent : f} index={i} time={typeof f === "object" ? f.time : ""} date={typeof f === "object" ? f.date : ""} />)}
        </div>
        <div style={{height:20}} />
      </div>

      {modalPlayer && (
        <PlayerModal player={modalPlayer} teamColor={team.color} teamAccent={team.accent}
          teamFlag={selectedTeam} teamName={team.name}
          fixtures={groupInfo.fixtures} onClose={() => setModalPlayer(null)} />
      )}
    </div>
  );
}
