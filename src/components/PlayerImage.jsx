// Position color rings - visible outer border on shirt
export const POS_COLORS = {
  GK:  { ring: "#f59e0b", label: "GK",  name: "Goalkeeper" },
  RB:  { ring: "#3b82f6", label: "DEF", name: "Defender" },
  LB:  { ring: "#3b82f6", label: "DEF", name: "Defender" },
  CB:  { ring: "#3b82f6", label: "DEF", name: "Defender" },
  DM:  { ring: "#a855f7", label: "MID", name: "Midfielder" },
  CM:  { ring: "#a855f7", label: "MID", name: "Midfielder" },
  AM:  { ring: "#a855f7", label: "MID", name: "Midfielder" },
  RW:  { ring: "#10b981", label: "ATT", name: "Attacker" },
  LW:  { ring: "#10b981", label: "ATT", name: "Attacker" },
  ST:  { ring: "#ef4444", label: "ATT", name: "Attacker" },
};

export function getRingColor(position) {
  if (!position) return "#888";
  const key = Object.keys(POS_COLORS).find(k => position.startsWith(k) || position === k);
  return key ? POS_COLORS[key].ring : "#888";
}

// DiceBear - generates illustrated face avatars from a name seed
// Works in browsers, CORS open, free, no API key
export function getPlayerAvatarUrl(playerName) {
  const seed = encodeURIComponent(playerName);
  return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=transparent&size=80`;
}

// Club colors for logo badges on pitch
export const CLUB_DATA = {
  // England PL
  "Arsenal":         { color: "#EF0107", accent: "#ffffff", initials: "AFC" },
  "Chelsea":         { color: "#034694", accent: "#ffffff", initials: "CFC" },
  "Liverpool":       { color: "#C8102E", accent: "#ffffff", initials: "LFC" },
  "Man City":        { color: "#6CABDD", accent: "#1C2C5B", initials: "MCI" },
  "Man United":      { color: "#DA291C", accent: "#FBE122", initials: "MUN" },
  "Tottenham":       { color: "#132257", accent: "#ffffff", initials: "TOT" },
  "Newcastle":       { color: "#241F20", accent: "#ffffff", initials: "NEW" },
  "Aston Villa":     { color: "#95BFE5", accent: "#670E36", initials: "AVL" },
  "Everton":         { color: "#003399", accent: "#ffffff", initials: "EVE" },
  "Wolves":          { color: "#FDB913", accent: "#231F20", initials: "WOL" },
  "West Ham":        { color: "#7A263A", accent: "#1BB1E7", initials: "WHU" },
  "Brentford":       { color: "#E30613", accent: "#ffffff", initials: "BRE" },
  "Brighton":        { color: "#0057B8", accent: "#ffffff", initials: "BHA" },
  "Crystal Palace":  { color: "#1B458F", accent: "#C4122E", initials: "CPL" },
  "Nottm Forest":    { color: "#DD0000", accent: "#ffffff", initials: "NFO" },
  "Fulham":          { color: "#000000", accent: "#ffffff", initials: "FUL" },
  // Spain
  "Real Madrid":     { color: "#FEBE10", accent: "#00529F", initials: "RMA" },
  "Barcelona":       { color: "#A50044", accent: "#004D98", initials: "BAR" },
  "Atletico Madrid": { color: "#CE3524", accent: "#272E61", initials: "ATM" },
  "Athletic Bilbao": { color: "#EE2523", accent: "#ffffff", initials: "ATH" },
  "Real Sociedad":   { color: "#0067B1", accent: "#ffffff", initials: "RSO" },
  "Villarreal":      { color: "#FFE135", accent: "#001E62", initials: "VIL" },
  "Girona":          { color: "#9B1818", accent: "#ffffff", initials: "GIR" },
  // Italy
  "AC Milan":        { color: "#FB090B", accent: "#000000", initials: "ACM" },
  "Inter Milan":     { color: "#010E80", accent: "#000000", initials: "INT" },
  "Juventus":        { color: "#000000", accent: "#ffffff", initials: "JUV" },
  "Roma":            { color: "#8E1F2F", accent: "#F5C518", initials: "ROM" },
  "Fiorentina":      { color: "#4B2D87", accent: "#ffffff", initials: "FIO" },
  "Atalanta":        { color: "#1C4996", accent: "#000000", initials: "ATA" },
  // Germany
  "Bayern Munich":   { color: "#DC052D", accent: "#ffffff", initials: "BAY" },
  "Dortmund":        { color: "#FDE100", accent: "#000000", initials: "BVB" },
  "Bayer Leverkusen":{ color: "#E32221", accent: "#000000", initials: "B04" },
  "RB Leipzig":      { color: "#DD0741", accent: "#ffffff", initials: "RBL" },
  "VfB Stuttgart":   { color: "#E32221", accent: "#ffffff", initials: "VFB" },
  "SC Freiburg":     { color: "#CC0000", accent: "#000000", initials: "SCF" },
  "Mönchengladbach": { color: "#000000", accent: "#ffffff", initials: "BMG" },
  "Hoffenheim":      { color: "#1961AB", accent: "#ffffff", initials: "TSG" },
  // France
  "PSG":             { color: "#004170", accent: "#DA291C", initials: "PSG" },
  "Marseille":       { color: "#2FAEE0", accent: "#ffffff", initials: "OM" },
  "Monaco":          { color: "#E4001A", accent: "#ffffff", initials: "ASM" },
  "Lyon":            { color: "#0040A0", accent: "#ffffff", initials: "OL" },
  "Nice":            { color: "#000000", accent: "#CD0000", initials: "OGC" },
  "Toulouse":        { color: "#5F2D8C", accent: "#ffffff", initials: "TFC" },
  "Lens":            { color: "#ED8C07", accent: "#ffffff", initials: "RCL" },
  "Reims":           { color: "#CF0921", accent: "#ffffff", initials: "SDR" },
  // Netherlands
  "Ajax":            { color: "#D2122E", accent: "#ffffff", initials: "AJX" },
  "PSV":             { color: "#E4001A", accent: "#ffffff", initials: "PSV" },
  "Feyenoord":       { color: "#C8001A", accent: "#000000", initials: "FEY" },
  // Portugal
  "Porto":           { color: "#013CA6", accent: "#FFF200", initials: "FCP" },
  "Benfica":         { color: "#CC0000", accent: "#ffffff", initials: "SLB" },
  "Sporting CP":     { color: "#007B40", accent: "#FFD700", initials: "SCP" },
  // Saudi
  "Al-Nassr":        { color: "#FFD700", accent: "#003087", initials: "ANS" },
  "Al-Ahli":         { color: "#006400", accent: "#FFD700", initials: "AAH" },
  "Al-Hilal":        { color: "#005B9E", accent: "#ffffff", initials: "HIL" },
  "Al-Qadsiah":      { color: "#1B5E20", accent: "#FFD700", initials: "QAD" },
  // USA/Others
  "Inter Miami":     { color: "#F7B5CD", accent: "#231F20", initials: "IMC" },
  "LA FC":           { color: "#C39E6D", accent: "#000000", initials: "LAF" },
  "Vancouver Whitecaps": { color: "#009BC9", accent: "#ffffff", initials: "VAN" },
  "Brentford":       { color: "#E30613", accent: "#ffffff", initials: "BRE" },
  // Brazil
  "Flamengo":        { color: "#E4001A", accent: "#000000", initials: "FLA" },
  "Palmeiras":       { color: "#006437", accent: "#ffffff", initials: "PAL" },
  "Atlético Mineiro":{ color: "#000000", accent: "#ffffff", initials: "CAM" },
};

export function getClubData(clubName) {
  return CLUB_DATA[clubName] || { color: "#444", accent: "#fff", initials: clubName?.slice(0,3).toUpperCase() || "CLB" };
}

export function makeClubBadgeSvg(clubName, size = 24) {
  const { color, accent, initials } = getClubData(clubName);
  const fontSize = size < 20 ? 5 : size < 30 ? 6 : 8;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <path d="M12,2 L20,5 L20,13 C20,18 12,22 12,22 C12,22 4,18 4,13 L4,5 Z" fill="${color}" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
  <text x="12" y="${14}" text-anchor="middle" fill="${accent}"
    font-family="Arial Black,sans-serif" font-weight="900" font-size="${fontSize}">${initials}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

// Country flag codes for club's country
const CLUB_COUNTRY = {
  "Arsenal":"gb-eng","Chelsea":"gb-eng","Liverpool":"gb-eng","Man City":"gb-eng",
  "Man United":"gb-eng","Tottenham":"gb-eng","Newcastle":"gb-eng","Aston Villa":"gb-eng",
  "Everton":"gb-eng","Wolves":"gb-eng","West Ham":"gb-eng","Brentford":"gb-eng",
  "Brighton":"gb-eng","Crystal Palace":"gb-eng","Nottm Forest":"gb-eng","Fulham":"gb-eng",
  "Real Madrid":"es","Barcelona":"es","Atletico Madrid":"es","Athletic Bilbao":"es",
  "Real Sociedad":"es","Villarreal":"es","Sevilla":"es","Betis":"es","Girona":"es",
  "AC Milan":"it","Inter Milan":"it","Juventus":"it","Roma":"it","Fiorentina":"it",
  "Atalanta":"it","Como":"it",
  "Bayern Munich":"de","Dortmund":"de","Bayer Leverkusen":"de","RB Leipzig":"de",
  "VfB Stuttgart":"de","SC Freiburg":"de","Mönchengladbach":"de","Hoffenheim":"de",
  "Wolfsburg":"de","Mainz":"de","VfL Bochum":"de",
  "PSG":"fr","Marseille":"fr","Lyon":"fr","Monaco":"fr","Nice":"fr",
  "Toulouse":"fr","Lens":"fr","Reims":"fr",
  "Ajax":"nl","PSV":"nl","Feyenoord":"nl","AZ Alkmaar":"nl",
  "Porto":"pt","Benfica":"pt","Sporting CP":"pt",
  "Al-Nassr":"sa","Al-Ahli":"sa","Al-Hilal":"sa","Al-Qadsiah":"sa",
  "Inter Miami":"us","LA FC":"us","Vancouver Whitecaps":"ca",
  "Flamengo":"br","Palmeiras":"br","Atlético Mineiro":"br","Botafogo":"br","Corinthians":"br",
  "Celtic":"gb-sct","Rangers":"gb-sct",
  "Vissel Kobe":"jp","FC Tokyo":"jp","Kawasaki":"jp","Urawa Reds":"jp",
};

export function getClubFlagUrl(club) {
  const code = CLUB_COUNTRY[club];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

// Main PlayerImage: shows DiceBear avatar with position ring
export default function PlayerImage({ player, teamColor, teamAccent = "#ffffff", size = 36, style = {} }) {
  const ring = getRingColor(player.position);
  const avatarUrl = getPlayerAvatarUrl(player.name);

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      border: `3px solid ${ring}`, overflow: "hidden",
      background: teamColor, display: "flex", alignItems: "center",
      justifyContent: "center", ...style
    }}>
      <img
        src={avatarUrl}
        alt={player.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={e => {
          e.target.style.display = "none";
          e.target.parentNode.innerHTML = `<span style="color:white;font-size:${size*0.3}px;font-weight:700">${player.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>`;
        }}
      />
    </div>
  );
}
