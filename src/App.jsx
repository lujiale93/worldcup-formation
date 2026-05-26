import { useState } from "react";
import { TEAMS, FORMATIONS } from "./data/teams";
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

  const team = TEAMS[selectedTeam];
  const formationData = FORMATIONS[formation];
  const assignedPlayerIds = new Set(Object.values(assignments).map(p => p.id));

  function handleTeamChange(teamId) { setSelectedTeam(teamId); setAssignments({}); }
  function handleFormationChange(f) { setFormation(f); setAssignments({}); }

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

  function removeFromPitch(positionId) {
    setAssignments(prev => { const n = { ...prev }; delete n[positionId]; return n; });
  }

  function clearAll() { setAssignments({}); }

  function autoFill() {
    const players = [...team.players];
    const positions = formationData.positions;
    const posMap = {};
    const posToType = {
      GK:"GK",CB:"CB",CB1:"CB",CB2:"CB",CB3:"CB",RB:"RB",LB:"LB",RWB:"LB",LWB:"LB",
      DM:"DM",DM1:"DM",DM2:"DM",CM:"CM",CM1:"CM",CM2:"CM",CM3:"CM",
      RM:"CM",LM:"CM",AM:"AM",RW:"RW",LW:"LW",ST:"ST",ST1:"ST",ST2:"ST"
    };
    const used = new Set();
    positions.forEach(pos => {
      const type = posToType[pos.id] || "CM";
      const match = players.find(p => !used.has(p.id) && p.position === type);
      const fallback = players.find(p => !used.has(p.id));
      const chosen = match || fallback;
      if (chosen) { posMap[pos.id] = chosen; used.add(chosen.id); }
    });
    setAssignments(posMap);
  }

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
              <div className="team-formation">{formation} Formation</div>
            </div>
          </div>
          <div className="sidebar-actions">
            <button className="btn-autofill" onClick={autoFill}>⚡ Auto Fill</button>
            <button className="btn-clear" onClick={clearAll}>✕ Clear</button>
          </div>
          <PlayerList players={team.players} assignedIds={assignedPlayerIds}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer} teamColor={team.color} />
        </aside>
        <section className="pitch-section">
          <Pitch formation={formationData} assignments={assignments}
            teamColor={team.color} teamAccent={team.accent}
            onDrop={handleDrop} onRemove={removeFromPitch}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
            draggedPlayer={draggedPlayer} />
        </section>
      </main>

      {modalPlayer && <PlayerModal player={modalPlayer} teamColor={TEAMS[selectedTeam].color} onClose={() => setModalPlayer(null)} />}
    </div>
  );
}
