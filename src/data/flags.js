// flagcdn.com - works in browser (CORS-friendly), free, no key needed
export const FLAG_CDN = (code) => `https://flagcdn.com/w80/${code}.png`;

export const TEAM_FLAG_CODES = {
  brazil: "br", france: "fr", england: "gb-eng", germany: "de",
  spain: "es", argentina: "ar", portugal: "pt", netherlands: "nl",
  japan: "jp", southkorea: "kr",
};

// All opponent country flags for fixtures
export const OPPONENT_FLAG_CODES = {
  "Morocco": "ma", "Haiti": "ht", "Scotland": "gb-sct",
  "Senegal": "sn", "Iraq": "iq", "Norway": "no",
  "Croatia": "hr", "Ghana": "gh", "Panama": "pa",
  "Ivory Coast": "ci", "Ecuador": "ec", "Curacao": "cw",
  "Saudi Arabia": "sa", "Uruguay": "uy", "Cape Verde": "cv",
  "Algeria": "dz", "Austria": "at", "Jordan": "jo",
  "DR Congo": "cd", "Uzbekistan": "uz", "Colombia": "co",
  "Sweden": "se", "Tunisia": "tn", "Japan": "jp",
  "Netherlands": "nl", "Mexico": "mx", "Czechia": "cz",
  "South Africa": "za", "Brazil": "br", "France": "fr",
  "England": "gb-eng", "Germany": "de", "Spain": "es",
  "Argentina": "ar", "Portugal": "pt", "South Korea": "kr",
};

// SofaScore player images - these work in browser via CORS
// Format: https://api.sofascore.app/api/v1/player/{id}/image
export const SOFASCORE_PLAYER_IDS = {
  "f12": 826643,  // Mbappe
  "a12": 15825,   // Messi
  "p12": 3765,    // Ronaldo
  "e12": 17682,   // Kane
  "b9":  868812,  // Vinicius
  "k12": 111505,  // Son
  "e11": 934235,  // Saka
  "s11": 1182467, // Lamine Yamal
  "g10": 939041,  // Musiala
  "e9":  906520,  // Bellingham
  "s8":  694765,  // Rodri
  "g9":  933978,  // Wirtz
  "j11": 942203,  // Mitoma
  "n6":  39472,   // Van Dijk
  "f10": 89547,   // Griezmann
  "a13": 882655,  // Julian Alvarez
  "a14": 813497,  // Lautaro
  "b12": 868812,  // (Vinicius alias)
  "p13": 697381,  // Bernardo Silva
  "n8":  279484,  // De Jong
  "e8":  895876,  // Rice
  "e4":  673085,  // TAA
  "f8":  939501,  // Tchouameni
  "f6":  948459,  // Saliba
  "f16": 938917,  // Camavinga
  "g4":  200455,  // Kimmich
  "g5":  295657,  // Rudiger
  "b10": 951985,  // Rodrygo
  "b15": 832892,  // Raphinha
  "s9":  856059,  // Pedri
  "s13": 1044991, // Nico Williams
  "s14": 858971,  // Dani Olmo
  "p10": 532468,  // Bruno Fernandes
  "p11": 862093,  // Leao
  "n11": 856983,  // Gakpo
  "n15": 1040916, // Xavi Simons
  "n4":  694735,  // Dumfries
  "j9":  836651,  // Ao Tanaka
  "j10": 836512,  // Ritsu Doan
  "k5":  795615,  // Kim Min-jae
  "k13": 951698,  // Lee Kang-in
  "k9":  806942,  // Hwang Hee-chan
};

export function getPlayerImage(playerId) {
  const sofaId = SOFASCORE_PLAYER_IDS[playerId];
  if (!sofaId) return null;
  return `https://api.sofascore.app/api/v1/player/${sofaId}/image`;
}

export function getTeamFlagUrl(teamId) {
  const code = TEAM_FLAG_CODES[teamId];
  return code ? FLAG_CDN(code) : null;
}

export function getOpponentFlagUrl(opponentName) {
  // Extract team name from strings like "vs Morocco" or "Morocco"
  const name = opponentName.replace(/^vs\s+/i, "").trim();
  const code = OPPONENT_FLAG_CODES[name];
  return code ? FLAG_CDN(code) : null;
}
