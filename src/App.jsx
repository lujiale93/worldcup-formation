import { useState } from "react";
import { TEAMS, FORMATIONS, TEAM_GROUPS } from "./data/teams";
import Pitch from "./components/Pitch";
import PlayerList from "./components/PlayerList";
import PlayerModal from "./components/PlayerModal";
import "./App.css";

export default function App() {
  const teamKeys = Object.keys(TEAMS);
  const [selectedTeam, setSelectedTeam] = useState("brazil");
  const [formation, setFormation] = useState("4-3-3");
  const [assignments, setAssignments] = useState({});
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);
  const [positionOverrides, setPositionOverrides] = useState({});

  const team = TEAMS[selectedTeam];
  const formationData = FORMATIONS[formation];
  const groupInfo = TEAM_GROUPS[selectedTeam];
  const assignedPlayerIds = new Set(Object.values(assignments).map(p => p.id));

  function handleTeamChange(teamId) { setSelectedTeam(teamId); setAssignments({}); setPositionOverrides({}); }
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
    ...pos,
    ...(positionOverrides[pos.id] || {})
  }));

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
                {teamKeys.map(k => (
                  <button key={k} className={`team-tab ${selectedTeam===k?"active":""}`}
                    style={selectedTeam===k?{background:TEAMS[k].color,color:TEAMS[k].accent}:{}}
                    onClick={() => handleTeamChange(k)} title={TEAMS[k].name}>
                    {TEAMS[k].flag}
                  </button>
                ))}
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

      <main className="main">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="team-badge" style={{background:team.color}}>
              <span className="team-flag-big">{team.flag}</span>
            </div>
            <div className="team-info">
              <div className="team-name">{team.name}</div>
              <div className="team-meta">Group {groupInfo.group} · {formation}</div>
            </div>
          </div>

          <div className="fixtures-bar">
            <div className="fixtures-title">GROUP STAGE FIXTURES</div>
            {groupInfo.fixtures.map((f, i) => (
              <div key={i} className="fixture-row">
                <span className="fixture-num">MD{i+1}</span>
                <span className="fixture-opp">{f}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-actions">
            <button className="btn-autofill" onClick={autoFill}>⚡ Auto Fill</button>
            <button className="btn-clear" onClick={clearAll}>✕ Clear</button>
          </div>
          <PlayerList players={team.players} assignedIds={assignedPlayerIds}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer} teamColor={team.color} />
        </aside>

        <section className="pitch-section">
          <div className="pitch-tip">💡 Drag players onto positions · Drag tokens to reposition · Click token to swap</div>
          <Pitch formation={{...formationData, positions: mergedPositions}}
            assignments={assignments} teamColor={team.color} teamAccent={team.accent}
            onDrop={handleDrop} onRemove={removeFromPitch}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
            draggedPlayer={draggedPlayer} onSwap={swapPlayers}
            onMovePosition={updatePositionXY} />
        </section>
      </main>

      {modalPlayer && <PlayerModal player={modalPlayer} teamColor={TEAMS[selectedTeam].color}
        teamFlag={team.flag} fixtures={groupInfo.fixtures} onClose={() => setModalPlayer(null)} />}
    </div>
  );
}
