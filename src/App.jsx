import { useState } from "react";
import { TEAMS, FORMATIONS, TEAM_GROUPS } from "./data/teams";
import { FLAG_CDN_URLS } from "./data/flags";
import Pitch from "./components/Pitch";
import PlayerList from "./components/PlayerList";
import Substitutes from "./components/Substitutes";
import PlayerModal from "./components/PlayerModal";
import "./App.css";

function FlagImage({ teamId, teamName, fallbackEmoji, size = 40 }) {
  const [error, setError] = useState(false);
  const url = FLAG_CDN_URLS[teamId];
  if (error || !url) return <span style={{ fontSize: size * 0.6 }}>{fallbackEmoji}</span>;
  return (
    <img src={url} alt={teamName} onError={() => setError(true)}
      style={{ width: size, height: "auto", borderRadius: 4, objectFit: "cover", display: "block" }} />
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
                    style={selectedTeam===k ? { borderColor: TEAMS[k].color, boxShadow: `0 0 10px ${TEAMS[k].color}66` } : {}}
                    onClick={() => handleTeamChange(k)} title={TEAMS[k].name}>
                    <FlagImage teamId={k} teamName={TEAMS[k].name} fallbackEmoji={TEAMS[k].flag} size={28} />
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
        {/* Left sidebar - squad list */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="team-badge-flag">
              <FlagImage teamId={selectedTeam} teamName={team.name} fallbackEmoji={team.flag} size={44} />
            </div>
            <div className="team-info">
              <div className="team-name">{team.name}</div>
              <div className="team-meta">Group {groupInfo.group} · {formation} · {starters.length}/11 selected</div>
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

        {/* Centre - pitch */}
        <section className="pitch-section">
          <div className="pitch-tip">💡 Drag players onto pitch · Drag tokens to reposition · Drop onto another to swap</div>
          <Pitch
            formation={{ ...formationData, positions: mergedPositions }}
            assignments={assignments} teamColor={team.color} teamAccent={team.accent}
            onDrop={handleDrop} onRemove={removeFromPitch}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer}
            draggedPlayer={draggedPlayer} onSwap={swapPlayers}
            onMovePosition={updatePositionXY} />
        </section>

        {/* Right - substitutes bench */}
        <aside className="bench-panel">
          <Substitutes
            players={substitutes} teamColor={team.color}
            onDragStart={setDraggedPlayer} onPlayerClick={setModalPlayer} />
        </aside>
      </main>

      {modalPlayer && (
        <PlayerModal player={modalPlayer} teamColor={team.color}
          teamFlag={selectedTeam} teamName={team.name}
          fixtures={groupInfo.fixtures} onClose={() => setModalPlayer(null)} />
      )}
    </div>
  );
}
