// SofaScore player IDs — extracted from sofascore.com/football/player/{name}/{id}
export const SOFASCORE_IDS = {
  // Brazil
  "b1": 17081,   // Alisson
  "b2": 43434,   // Danilo
  "b3": 93566,   // Marquinhos
  "b4": 876592,  // Gabriel Magalhães
  "b5": 819189,  // Guilherme Arana
  "b6": 222490,  // Casemiro
  "b7": 886626,  // Bruno Guimarães
  "b8": 815678,  // Lucas Paquetá
  "b9": 868812,  // Vinicius Jr
  "b10": 951985, // Rodrygo
  "b11": 1181514,// Endrick
  "b15": 832892, // Raphinha
  "b16": 855768, // Martinelli

  // France
  "f1": 714946,  // Maignan
  "f4": 697292,  // Pavard
  "f5": 853076,  // Upamecano
  "f6": 948459,  // Saliba
  "f7": 869601,  // Theo Hernandez
  "f8": 939501,  // Tchouameni
  "f9": 152800,  // Rabiot
  "f10": 89547,  // Griezmann
  "f11": 555506, // Dembele
  "f12": 826643, // Mbappe
  "f13": 935716, // Thuram
  "f15": 1113616,// Barcola
  "f16": 938917, // Camavinga
  "f21": 1072437,// Olise

  // England
  "e1": 91554,   // Pickford
  "e4": 673085,  // TAA
  "e5": 138337,  // Maguire
  "e6": 178406,  // Stones
  "e7": 359713,  // Shaw
  "e8": 895876,  // Rice
  "e9": 906520,  // Bellingham
  "e10": 209096, // Foden
  "e11": 934235, // Saka
  "e12": 17682,  // Kane
  "e13": 377048, // Rashford
  "e15": 1151982,// Cole Palmer

  // Germany
  "g1": 12669,   // Neuer
  "g4": 200455,  // Kimmich
  "g5": 295657,  // Rudiger
  "g6": 880991,  // Schlotterbeck
  "g7": 805503,  // Raum
  "g9": 933978,  // Wirtz
  "g10": 939041, // Musiala
  "g11": 144078, // Sane
  "g12": 635752, // Havertz
  "g15": 12673,  // Muller

  // Spain
  "s1": 694397,  // Unai Simon
  "s4": 77636,   // Carvajal
  "s6": 926832,  // Le Normand
  "s7": 857602,  // Cucurella
  "s8": 694765,  // Rodri
  "s9": 856059,  // Pedri
  "s11": 1182467,// Lamine Yamal
  "s12": 81809,  // Morata
  "s13": 1044991,// Nico Williams
  "s14": 858971, // Dani Olmo

  // Argentina
  "a1": 192128,  // Emi Martinez
  "a4": 831564,  // Molina
  "a5": 835699,  // Romero
  "a6": 875771,  // Lisandro
  "a8": 196985,  // De Paul
  "a9": 906074,  // Enzo Fernandez
  "a10": 839070, // Mac Allister
  "a12": 15825,  // Messi
  "a13": 882655, // Julian Alvarez
  "a14": 813497, // Lautaro

  // Portugal
  "p1": 905571,  // Diogo Costa
  "p4": 167990,  // Cancelo
  "p5": 848892,  // Ruben Dias
  "p7": 841456,  // Nuno Mendes
  "p10": 532468, // Bruno Fernandes
  "p11": 862093, // Leao
  "p12": 3765,   // Ronaldo
  "p13": 697381, // Bernardo
  "p16": 953151, // Goncalo Ramos

  // Netherlands
  "n1": 1002702, // Verbruggen
  "n4": 694735,  // Dumfries
  "n5": 46033,   // De Vrij
  "n6": 39472,   // Van Dijk
  "n7": 302843,  // Ake
  "n8": 279484,  // De Jong
  "n9": 873726,  // Reijnders
  "n11": 856983, // Gakpo
  "n12": 162767, // Memphis
  "n15": 1040916,// Xavi Simons

  // Japan
  "j2": 983822,  // Zion Suzuki
  "j8": 699975,  // Endo
  "j9": 836651,  // Ao Tanaka
  "j10": 836512, // Ritsu Doan
  "j11": 942203, // Mitoma
  "j12": 741570, // Kamada
  "j13": 862977, // Tomiyasu

  // South Korea
  "k5": 795615,  // Kim Min-jae
  "k9": 806942,  // Hwang Hee-chan
  "k12": 111505, // Son Heung-min
  "k13": 951698, // Lee Kang-in
};

export function getPlayerImageUrl(playerId) {
  const sofaId = SOFASCORE_IDS[playerId];
  if (!sofaId) return null;
  return `https://api.sofascore.app/api/v1/player/${sofaId}/image`;
}

// Club history data (Wikipedia-style)
export const CLUB_HISTORY = {
  "f12": [ // Mbappe
    { club: "Monaco II", years: "2015–2016", apps: 2, goals: 1 },
    { club: "AS Monaco", years: "2015–2018", apps: 60, goals: 27 },
    { club: "PSG (loan)", years: "2017–2018", apps: 44, goals: 13 },
    { club: "Paris Saint-Germain", years: "2018–2024", apps: 308, goals: 256 },
    { club: "Real Madrid", years: "2024–", apps: 60, goals: 42 },
  ],
  "a12": [ // Messi
    { club: "Barcelona B", years: "2003–2005", apps: 22, goals: 6 },
    { club: "Barcelona", years: "2004–2021", apps: 778, goals: 672 },
    { club: "Paris Saint-Germain", years: "2021–2023", apps: 75, goals: 32 },
    { club: "Inter Miami", years: "2023–", apps: 58, goals: 48 },
  ],
  "p12": [ // Ronaldo
    { club: "Sporting CP", years: "2002–2003", apps: 31, goals: 5 },
    { club: "Manchester United", years: "2003–2009", apps: 292, goals: 118 },
    { club: "Real Madrid", years: "2009–2018", apps: 438, goals: 450 },
    { club: "Juventus", years: "2018–2021", apps: 134, goals: 101 },
    { club: "Manchester United", years: "2021–2022", apps: 54, goals: 27 },
    { club: "Al-Nassr", years: "2023–", apps: 96, goals: 79 },
  ],
  "e12": [ // Kane
    { club: "Tottenham (youth→senior)", years: "2004–2023", apps: 435, goals: 280 },
    { club: "Leyton Orient (loan)", years: "2011", apps: 18, goals: 5 },
    { club: "Millwall (loan)", years: "2012", apps: 27, goals: 7 },
    { club: "Norwich (loan)", years: "2012–2013", apps: 5, goals: 0 },
    { club: "Leicester (loan)", years: "2013", apps: 13, goals: 2 },
    { club: "Bayern Munich", years: "2023–", apps: 73, goals: 65 },
  ],
  "b9": [ // Vinicius
    { club: "Flamengo", years: "2017–2018", apps: 39, goals: 7 },
    { club: "Real Madrid", years: "2018–", apps: 280, goals: 120 },
  ],
  "k12": [ // Son
    { club: "Hamburger SV", years: "2010–2013", apps: 78, goals: 20 },
    { club: "Bayer Leverkusen", years: "2013–2015", apps: 87, goals: 29 },
    { club: "Tottenham Hotspur", years: "2015–2025", apps: 378, goals: 164 },
    { club: "Los Angeles FC", years: "2025–", apps: 20, goals: 8 },
  ],
  "e11": [ // Saka
    { club: "Arsenal Academy", years: "2008–2018", apps: 0, goals: 0 },
    { club: "Arsenal", years: "2018–", apps: 240, goals: 76 },
  ],
  "s11": [ // Lamine Yamal
    { club: "Barcelona Academy (La Masia)", years: "2012–2023", apps: 0, goals: 0 },
    { club: "Barcelona", years: "2023–", apps: 82, goals: 28 },
  ],
  "g10": [ // Musiala
    { club: "Chelsea Academy", years: "2011–2019", apps: 0, goals: 0 },
    { club: "Bayern Munich II", years: "2019–2021", apps: 18, goals: 6 },
    { club: "Bayern Munich", years: "2020–", apps: 185, goals: 68 },
  ],
  "n6": [ // Van Dijk
    { club: "Groningen", years: "2010–2013", apps: 87, goals: 7 },
    { club: "Celtic", years: "2013–2015", apps: 80, goals: 12 },
    { club: "Southampton", years: "2015–2018", apps: 89, goals: 8 },
    { club: "Liverpool", years: "2018–", apps: 270, goals: 24 },
  ],
  "f10": [ // Griezmann
    { club: "Real Sociedad", years: "2009–2014", apps: 201, goals: 52 },
    { club: "Atletico Madrid", years: "2014–2019", apps: 257, goals: 133 },
    { club: "Barcelona", years: "2019–2021", apps: 74, goals: 35 },
    { club: "Atletico Madrid (loan)", years: "2021–2023", apps: 95, goals: 52 },
    { club: "Atletico Madrid", years: "2023–", apps: 95, goals: 45 },
  ],
  "p13": [ // Bernardo Silva
    { club: "Benfica", years: "2012–2015", apps: 38, goals: 5 },
    { club: "AS Monaco", years: "2015–2017", apps: 95, goals: 26 },
    { club: "Manchester City", years: "2017–", apps: 345, goals: 60 },
  ],
  "a14": [ // Lautaro
    { club: "Racing Club", years: "2015–2018", apps: 79, goals: 30 },
    { club: "Inter Milan", years: "2018–", apps: 295, goals: 145 },
  ],
};
