// Position-based shirt color accent rings
const POS_RING = {
  GK:  "#f59e0b", // amber
  RB:  "#3b82f6", // blue
  LB:  "#3b82f6",
  CB:  "#3b82f6",
  DM:  "#8b5cf6", // purple
  CM:  "#8b5cf6",
  AM:  "#8b5cf6",
  RW:  "#10b981", // green
  LW:  "#10b981",
  ST:  "#ef4444", // red
};

function getRingColor(position) {
  if (!position) return "#ffffff55";
  const key = Object.keys(POS_RING).find(k => position.startsWith(k));
  return key ? POS_RING[key] : "#ffffff55";
}

// Club flag via flagcdn using country codes
const CLUB_COUNTRY_CODES = {
  // England
  "Arsenal":"gb-eng","Chelsea":"gb-eng","Liverpool":"gb-eng","Man City":"gb-eng",
  "Man United":"gb-eng","Tottenham":"gb-eng","Newcastle":"gb-eng","Aston Villa":"gb-eng",
  "Everton":"gb-eng","Wolves":"gb-eng","West Ham":"gb-eng","Brentford":"gb-eng",
  "Brighton":"gb-eng","Crystal Palace":"gb-eng","Nottm Forest":"gb-eng","Fulham":"gb-eng",
  "Southampton":"gb-eng","Bayer Leverkusen":"de","Bayern Munich":"de","Dortmund":"de",
  // Spain
  "Real Madrid":"es","Barcelona":"es","Atletico Madrid":"es","Athletic Bilbao":"es",
  "Real Sociedad":"es","Villarreal":"es","Sevilla":"es","Betis":"es","Girona":"es",
  // Italy
  "AC Milan":"it","Inter Milan":"it","Juventus":"it","Roma":"it","Fiorentina":"it",
  "Atalanta":"it","Napoli":"it","Como":"it",
  // France
  "PSG":"fr","Marseille":"fr","Lyon":"fr","Monaco":"fr","Lens":"fr",
  "Nice":"fr","Toulouse":"fr","Reims":"fr",
  // Germany
  "RB Leipzig":"de","VfB Stuttgart":"de","Hoffenheim":"de","Mönchengladbach":"de",
  "SC Freiburg":"de","Wolfsburg":"de","VfL Bochum":"de","Mainz":"de",
  // Netherlands
  "Ajax":"nl","PSV":"nl","Feyenoord":"nl","AZ Alkmaar":"nl",
  // Portugal
  "Porto":"pt","Sporting CP":"pt","Benfica":"pt",
  // Saudi
  "Al-Nassr":"sa","Al-Ahli":"sa","Al-Hilal":"sa","Al-Qadsiah":"sa",
  // Belgium
  "Club Brugge":"be","Gent":"be",
  // USA
  "Inter Miami":"us","LA FC":"us","Vancouver Whitecaps":"ca",
  // Brazil
  "Flamengo":"br","Palmeiras":"br","Atletico Mineiro":"br","Fluminense":"br",
  "Botafogo":"br","Corinthians":"br","Kawasaki":"jp",
  // Scotland
  "Celtic":"gb-sct","Rangers":"gb-sct",
  // Others
  "Ajax":"nl","Urawa Reds":"jp","Vissel Kobe":"jp","FC Tokyo":"jp",
  "Sint-Truiden":"be","Getafe":"es",
};

export function getClubFlagUrl(club) {
  const code = CLUB_COUNTRY_CODES[club];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}

export function makeShirtSvg(number, color, accent, size = 40, position = "") {
  const ring = getRingColor(position);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40">
  <circle cx="20" cy="20" r="19" fill="${ring}" opacity="0.9"/>
  <circle cx="20" cy="20" r="16" fill="${color}"/>
  <path d="M10,12 L15,10 C15,10 17,14 20,14 C23,14 25,10 25,10 L30,12 L33,19 L28,21 L28,34 L12,34 L12,21 L7,19 Z"
    fill="${color}" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
  <text x="20" y="28" text-anchor="middle" fill="${accent}"
    font-family="Arial Black,sans-serif" font-weight="900"
    font-size="${number > 9 ? "11" : "13"}">${number}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

export default function PlayerImage({ player, teamColor, teamAccent = "#ffffff", size = 36, style = {} }) {
  const src = makeShirtSvg(player.number, teamColor, teamAccent, size, player.position);
  return (
    <img src={src} alt={player.name}
      style={{ width: size, height: size, flexShrink: 0, borderRadius: "50%", ...style }} />
  );
}
