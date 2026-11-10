import { useMemo, useState } from "react";

/* ───────────── Types ───────────── */
type Floor = 0 | 1 | 2;
type Pt = [number, number];

interface Place {
  id: string;
  n: string; // nom
  ar: string; // nom arabe (rez-de-chaussée)
  sub?: string; // précision (étages)
  label?: string; // étiquette sur la carte (étages)
  x: number;
  y: number;
  w: number;
  h: number;
  c: string; // couleur
  node: string; // nœud du graphe d'allées
  cat?: string;
  upper?: boolean;
  fl: Floor; // 0 = 1er étage (rez-de-chaussée), 1 = 2e, 2 = 3e
}

/* ───────────── Palette ───────────── */
const BRICK = "#9c3b2b";
const BRICK_LIGHT = "#b5523b";
const BLUE = "#1f4e8c";
const BLUE_UPPER = "#4f7fc2";
const GRAY = "#6b7480";
const violet="#651661";

/* ───────────── Graphe des allées ───────────── */
const N: Record<string, Pt> = {
  ES: [45, 178], T1: [110, 175], V4: [365, 175], V3: [365, 260], V2: [365, 352], V1: [365, 430], HC: [365, 470], AU: [427, 470],
  F: [365, 505], G: [270, 505], H: [170, 505], I: [60, 505], E: [440, 505], D: [540, 505],
  C: [700, 505], B: [850, 505], A: [880, 520], R: [470, 352], M: [190, 258], O1: [325, 447],
  OA: [275, 340], OS: [266, 285], OC: [250, 232], S: [365, 585], S2: [560, 585], S3: [780, 585],
  P: [380, 592], S0: [200, 585],
};

const EDGES: [string, string][] = [
  ["ES", "T1"], ["T1", "V4"], ["V4", "V3"], ["V3", "V2"], ["V2", "V1"], ["V1", "HC"], ["HC", "F"], ["HC", "AU"], ["F", "G"],
  ["G", "H"], ["H", "I"], ["F", "E"], ["E", "D"], ["D", "C"], ["C", "B"], ["B", "A"], ["V2", "R"],
  ["V3", "M"], ["V1", "O1"], ["O1", "OA"], ["OA", "OS"], ["OS", "OC"], ["F", "S"], ["S", "P"],
  ["S", "S2"], ["S2", "S3"], ["S", "S0"], ["S3", "B"],
];

const ADJ: Record<string, [string, number][]> = {};
Object.keys(N).forEach((k) => (ADJ[k] = []));
EDGES.forEach(([a, b]) => {
  const d = Math.hypot(N[a][0] - N[b][0], N[a][1] - N[b][1]);
  ADJ[a].push([b, d]);
  ADJ[b].push([a, d]);
});

function shortestPath(from: string, to: string): string[] {
  const dist: Record<string, number> = {};
  const prev: Record<string, string> = {};
  const queue = new Set(Object.keys(N));
  queue.forEach((k) => (dist[k] = Infinity));
  dist[from] = 0;
  while (queue.size) {
    let u = "";
    for (const k of queue) {
      if (u === "" || dist[k] < dist[u]) u = k;
    }
    if (u === "") break;
    queue.delete(u);
    if (u === to) break;
    for (const [v, w] of ADJ[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }
    }
  }
  const out = [to];
  while (out[0] !== from) out.unshift(prev[out[0]]);
  return out;
}

/* ───────────── Lieux ───────────── */
// [id, nom, arabe, x, y, w, h, couleur, nœud, catégorie]
type G = [string, string, string, number, number, number, number, string, string, string];
const GROUND_DATA: G[] = [
  ["ent", "Entrée des étudiants", "مدخل الطلبة", 862, 512, 36, 26, GRAY, "A", "Entrées"],
  ["gard", "Poste de garde", "", 840, 538, 18, 30, BRICK, "B", "Entrées"],
  ["main", "Entrée principale", "المدخل الرئيسي", 350, 588, 60, 18, GRAY, "P", "Entrées"],
  ["serv", "Entrée de service", "مدخل الخدمات", 30, 168, 30, 20, GRAY, "ES", "Entrées"],
  ["inno", "Centre d’innovation", "مركز الابتكار", 190, 205, 165, 40, GRAY, "OC", "Administration"],
  ["maint", "Maintenance", "الصيانة", 55, 245, 130, 32, GRAY, "M", "Administration"],
  ["hall", "Hall", "البهو", 275, 400, 200, 100, "#4a5461", "HC", "Études"],
  ["dir", "accés administration", "", 285, 400, 60, 20, BRICK, "HC", "Administration"],
  ["acc", "Accueil / Forum", "الاستقبال", 285, 422, 60, 20, BRICK, "F", "Administration"],
  ["aud", "Auditorium", "القاعة الكبرى", 392, 410, 50, 50, BRICK, "AU", "Études"],
  ["bib", "Bibliothèque", "المكتبة", 282, 540, 95, 40, BRICK, "G", "Études"],
  ["resto", "Restaurant universitaire", "المطعم الجامعي", 427, 255, 100, 62, GRAY, "R", "Restauration"],
  ["cafe", "Cafétéria", "مشرب", 392, 254, 30, 28, GRAY, "V2", "Restauration"],
  ["ing", "Ingénierat et recherche", "الهندسة والبحث", 100, 440, 170, 58, GRAY, "H", "Études"],
  ["labg", "Laboratoires (ouest)", "المخابر", 76, 520, 192, 44, BLUE, "H", "Laboratoires"],
  ["cyc", "Formation de premier cycle", "دراسات المرحلة الأولى", 477, 440, 378, 58, BLUE, "D", "Études"],
  ["amph", "Amphithéâtres", "المدرجات", 473, 520, 270, 44, BLUE, "D", "Études"],
  ["toilettes", "Toilettes", "الحمامات", 600, 520, 45, 38, GRAY, "HC", "Services"],
  ["labd", "Laboratoires (est)", "المخابر", 750, 520, 88,44, BLUE, "B", "Laboratoires"],
];

// [id, nom, précision, x, y, w, h, couleur, nœud, étiquette]
type U = [string, string, string, number, number, number, number, string, string, string];
const UPPER2_DATA: U[] = [
  ["f1td", "Salles TD 101 à 173", "Amphithéâtres + salles de TD", 473, 522, 382, 38, BLUE_UPPER, "D", "Salles TD 101–173"],
  ["f1tp", "Salles de travaux pratiques", "", 477, 440, 378, 58, BLUE_UPPER, "D", "Salles de travaux pratiques"],
  ["f1bib", "Bibliothèque", "", 282, 538, 95, 40, BRICK, "G", "Bibliothèque"],
  ["f1prof", "Départements des professeurs", "Ingénierat et recherche", 100, 432, 170, 58, BLUE_UPPER, "H", "Départements profs"],
  ["f1labg", "Salles TP et mousalla", "Laboratoires ouest", 76, 508, 192, 44, BLUE_UPPER, "H", "TP · Mousalla"],
  ["f1sec", "Service et scolarité", "Secrétariat général", 215, 262, 95, 24, BRICK_LIGHT, "OS", "Service et scolarité"],
  ["conf", "Salles de conférences", "قاعات المحاضرات", 378, 515, 82, 40, BRICK, "E", "Salles de conférences"],
  ["f1adm", "Service et scolarité", "Administration", 235, 325, 80, 24, BRICK_LIGHT, "OA", "Service et scolarité"],
  ["f1scol", "Service et scolarité", "Scolarité", 255, 388, 100, 24, BRICK_LIGHT, "O1", "Service et scolarité"],
  ["f1dir", "Direction des études et stages", "Bureaux administratifs", 285, 416, 100, 34, BRICK, "HC", "Administration"],
  ["f1aud", "Accès auditorium", "Hall", 392, 440, 80, 60, BRICK, "AU", "Accès auditorium"],
  ["f1toilettes", "Toilettes", "", 140, 510, 30, 38, GRAY, "HC", "Toilettes"],
  ["f1toilettes2", "Toilettes", "", 565, 522, 30, 38, GRAY, "HC", "Toilettes"],
  ["f1toilettes3", "Toilettes", "", 780, 522, 30, 38, GRAY, "HC", "Toilettes"],
  ["f1Moussala", "Mousalla", "", 175 , 510, 30, 38, BLUE, "H", "Mousalla"],
];

const UPPER3_DATA: U[] = [
  ["f3td", "Salles TD 201 à 247", "Amphithéâtres + salles de TD", 473, 522, 382, 38, BLUE_UPPER, "D", "Salles TD 201–247"],
  ["f3tp", "Salles TP", "Formation de premier cycle", 477, 440, 378, 58, BLUE_UPPER, "D", "Salles TP"],
  ["f3bib", "Bibliothèque", "", 282, 538, 95, 40, BRICK, "G", "Bibliothèque"],
  ["f3lec", "Salle de lecture", "", 378, 515, 82, 40, BRICK, "E", "Salle de lecture"],
  ["f3labg", "Salles de travaux pratiques", "Laboratoires ouest", 76, 508, 192, 44, BLUE_UPPER, "H", "Salles de travaux pratiques"],
  ["f3sec", "Secrétariat général", "", 215, 262, 95, 24, BRICK_LIGHT, "OS", "Secrétariat général"],
  ["f3adm", "Direction des études et stages", "Partie 1", 235, 325, 80, 24, BRICK_LIGHT, "OA", "Direction des études et stages"],
  ["f3scol", "Direction des études et stages", "Partie 2", 255, 388, 100, 24, BRICK_LIGHT, "O1", "Direction des études et stages"],
  ["f3toilettes1", "Toilettes", "", 510, 522, 30, 38, violet, "HC", "Toilettes"],
  ["f3toilettes2", "Toilettes", "", 780, 522, 30, 38, violet, "HC", "Toilettes"],  
  ["f3info", "Salle TP informatique", "", 285, 435, 177, 58, BLUE, "HC", "Salle TP informatique"],
];

const GROUND: Place[] = GROUND_DATA.map(([id, n, ar, x, y, w, h, c, node, cat]) => ({ id, n, ar, x, y, w, h, c, node, cat, fl: 0 as Floor }));
const toUpper = (d: U[], fl: Floor): Place[] =>
  d.map(([id, n, sub, x, y, w, h, c, node, label]) => ({
    id, n, ar: "", sub, label, x, y, w, h, c, node, upper: true, fl,
  }));
const UPPER_FLOORS: Record<number, Place[]> = { 1: toUpper(UPPER2_DATA, 1), 2: toUpper(UPPER3_DATA, 2) };
const PLACES: Record<string, Place> = {};
[...GROUND, ...UPPER_FLOORS[1], ...UPPER_FLOORS[2]].forEach((p) => (PLACES[p.id] = p));

const CATEGORIES = ["Tous", ...Array.from(new Set(GROUND.map((p) => p.cat as string)))];
const FLOORS = ["1er étage", "2e étage", "3e étage"];
const DEFAULT_MSG = "Touchez un bâtiment sur la carte ou choisissez une destination.";

const center = (p: Place): Pt => [p.x + p.w / 2, p.y + p.h / 2];

function mapLabel(p: Place, floor: Floor): string {
  if (p.upper) return p.label ?? "";
  if (p.w < 45) return "";
  return p.w < 60 ? p.n.split(" ")[0] : p.n;
}

/* Ajuste le texte au bloc : retour à la ligne + taille réduite si besoin (le texte ne dépasse jamais) */
function fitText(text: string, w: number, h: number): { lines: string[]; fs: number } {
  const words = text.replace(/\n/g, " ").split(/\s+/).filter(Boolean);
  const maxW = w - 8;
  for (let fs = 10; fs >= 5; fs -= 0.5) {
    const cw = fs * 0.6;
    const lines: string[] = [];
    let cur = "";
    let ok = true;
    for (const word of words) {
      if (word.length * cw > maxW) {
        ok = false;
        break;
      }
      const t = cur ? cur + " " + word : word;
      if (t.length * cw <= maxW) cur = t;
      else {
        lines.push(cur);
        cur = word;
      }
    }
    if (!ok) continue;
    lines.push(cur);
    if (lines.length * fs * 1.15 <= h - 2) return { lines, fs };
  }
  return { lines: words, fs: 5 };
}

/* Partie libre (non recouverte par un bloc dessiné après) la plus large du bloc, à la hauteur du texte */
function freeSpan(p: Place, later: Place[], top?: boolean): [number, number] {
  const y1 = top ? p.y : p.y + p.h / 2 - 9;
  const y2 = top ? p.y + 14 : p.y + p.h / 2 + 9;
  const cov = later
    .filter((q) => q.x < p.x + p.w && q.x + q.w > p.x && q.y < y2 && q.y + q.h > y1)
    .map((q) => [Math.max(q.x, p.x), Math.min(q.x + q.w, p.x + p.w)] as [number, number])
    .sort((u, v) => u[0] - v[0]);
  const full: [number, number] = [p.x, p.x + p.w];
  if (!cov.length) return full;
  const segs: [number, number][] = [];
  let cur = p.x;
  for (const [u, v] of cov) {
    if (u > cur) segs.push([cur, u]);
    cur = Math.max(cur, v);
  }
  if (cur < p.x + p.w) segs.push([cur, p.x + p.w]);
  if (!segs.length) return full;
  return segs.reduce((best, sg) => (sg[1] - sg[0] > best[1] - best[0] ? sg : best));
}

function BlockLabel({ p, later, text, top }: { p: Place; later: Place[]; text: string; top?: boolean }) {
  if (!text) return null;
  const [x0, x1] = freeSpan(p, later, top);
  const w = x1 - x0;
  const { lines, fs } = fitText(text, w, p.h);
  const lh = fs * 1.15;
  const cx = x0 + w / 2;
  const y0 = top ? p.y + fs + 2 : p.y + p.h / 2 - ((lines.length - 1) * lh) / 2 + fs * 0.35;
  return (
    <text className="lb" style={{ fontSize: fs }}>
      {lines.map((l, i) => (
        <tspan key={i} x={cx} y={y0 + i * lh}>{l}</tspan>
      ))}
    </text>
  );
}

/* ───────────── Navigation entre étages ───────────── */
// Lieu où l'on arrive (escaliers) à chaque étage, et position de départ quand on appuie sur un étage
const STAIRS: Record<number, string> = { 0: "hall", 1: "f1aud", 2: "f3lec" };
const START: Record<number, string> = { 0: "main", 1: "f1aud", 2: "f3lec" };
// Point sur l'allée, devant le lieu (utilisé quand le lieu sert de départ ou d'escaliers)
const FRONT: Record<string, string> = { f1aud: "E", f3lec: "E" };
const PX_TO_M = 0.45;

interface Leg {
  floor: Floor;
  a: Place;
  b: Place;
  pts: Pt[];
  meters: number;
  near: string[];
  startStairs?: boolean;
  endStairs?: boolean;
}

type Route =
  | null
  | { kind: "same" }
  | { kind: "single"; a: Place; b: Place; legs: Leg[]; meters: number; minutes: number }
  | { kind: "multi"; a: Place; b: Place; sa: Place; sb: Place; legs: Leg[]; meters: number; minutes: number };

const floorPlaces = (f: Floor): Place[] => (f ? UPPER_FLOORS[f] : GROUND);

// startOnPath / endOnPath : le point est placé sur l'allée, devant le lieu, et non au centre du bloc
function makeLeg(a: Place, b: Place, floor: Floor, startOnPath = false, endOnPath = false): Leg {
  const sNode = startOnPath ? FRONT[a.id] ?? a.node : a.node;
  const eNode = endOnPath ? FRONT[b.id] ?? b.node : b.node;
  const ids = shortestPath(sNode, eNode);
  const pts: Pt[] = [startOnPath ? N[sNode] : center(a), ...ids.map((i) => N[i]), endOnPath ? N[eNode] : center(b)];
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const near = Array.from(
    new Set(floorPlaces(floor).filter((p) => p !== a && p !== b && ids.includes(p.node)).map((p) => p.n))
  ).slice(0, 4);
  return { floor, a, b, pts, meters: Math.max(1, Math.round(len * PX_TO_M)), near };
}

// Le haut de la carte est supposé être le nord (flèche du plan d'origine)
const DIRS = ["l’est", "le nord-est", "le nord", "le nord-ouest", "l’ouest", "le sud-ouest", "le sud", "le sud-est"];

function directions(pts: Pt[]): string[] {
  const segs: { dx: number; dy: number; len: number }[] = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    const len = Math.hypot(dx, dy);
    if (len < 8) continue;
    const last = segs[segs.length - 1];
    if (last && (last.dx * dx + last.dy * dy) / (last.len * len) > 0.94) {
      last.dx += dx;
      last.dy += dy;
      last.len += len;
      continue;
    }
    segs.push({ dx, dy, len });
  }
  return segs.map((s, i) => {
    const m = Math.max(1, Math.round(s.len * PX_TO_M));
    if (i === 0) {
      const ang = (Math.atan2(-s.dy, s.dx) * 180) / Math.PI;
      const k = ((Math.round(ang / 45) % 8) + 8) % 8;
      return `Dirigez-vous vers ${DIRS[k]}, sur environ ${m} m`;
    }
    const p = segs[i - 1];
    const cross = p.dx * s.dy - p.dy * s.dx;
    const cos = (p.dx * s.dx + p.dy * s.dy) / (Math.hypot(p.dx, p.dy) * Math.hypot(s.dx, s.dy));
    const side = cross > 0 ? "à droite" : "à gauche";
    const turn = cos < -0.5 ? `Faites presque demi-tour ${side}` : cos > 0.5 ? `Tournez légèrement ${side}` : `Tournez ${side}`;
    return `${turn}, puis continuez sur environ ${m} m`;
  });
}

function LegSteps({ leg }: { leg: Leg }) {
  const steps = directions(leg.pts);
  return (
    <ol>
      <li>Départ : <b>{leg.a.n}</b></li>
      {steps.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
      {leg.near.length > 0 && <li>Repères sur le trajet : {leg.near.join(", ")}</li>}
      <li>Arrivée : <b>{leg.b.n}</b></li>
    </ol>
  );
}

/* ───────────── Composant ───────────── */
function CampusMap() {
  const [floor, setFloor] = useState<Floor>(0); // étage affiché sur la carte
  const [from, setFrom] = useState("main");
  const [to, setTo] = useState("");
  const [cat, setCat] = useState("Tous");
  const [room, setRoom] = useState("");
  const [roomNote, setRoomNote] = useState<number | null>(null);

  const optText = (p: Place) => p.n + (p.upper ? (p.sub ? "  " + p.sub : "") : p.ar ? "  " + p.ar : "");
  const fromGroups: [Floor, Place[]][] = [[0, GROUND], [1, UPPER_FLOORS[1]], [2, UPPER_FLOORS[2]]];
  const toGroups: [Floor, Place[]][] = fromGroups.map(([f, l]) => [
    f,
    f === 0 ? l.filter((p) => cat === "Tous" || p.cat === cat) : l,
  ]);

  // Appuyer sur un étage : on y arrive, donc le départ devient l'arrivée des escaliers de cet étage
  const changeFloor = (f: Floor) => {
    setFloor(f);
    setFrom(START[f]);
    setRoomNote(null);
  };

  const onRoom = (v: string) => {
    setRoom(v);
    const n = Number(v);
    const target: [Floor, string] | null = n >= 101 && n <= 173 ? [1, "f1td"] : n >= 201 && n <= 247 ? [2, "f3td"] : null;
    if (target) {
      if (floor !== target[0]) {
        setFloor(target[0]);
        setFrom(START[target[0]]);
      }
      setTo(target[1]);
      setRoomNote(n);
    }
  };

  const pick = (id: string) => {
    setTo(id);
    setRoomNote(null);
    const p = PLACES[id];
    if (p) setFloor(p.fl === PLACES[from]?.fl ? p.fl : floor);
  };

  const route = useMemo<Route>(() => {
    const a = PLACES[from];
    const b = PLACES[to];
    if (!a || !b) return null;
    if (a === b) return { kind: "same" };
    if (a.fl === b.fl) {
      const leg = makeLeg(a, b, a.fl, START[a.fl] === a.id || STAIRS[a.fl] === a.id);
      return { kind: "single", a, b, legs: [leg], meters: leg.meters, minutes: Math.max(1, Math.round(leg.meters / 75)) };
    }
    const sa = PLACES[STAIRS[a.fl]];
    const sb = PLACES[STAIRS[b.fl]];
    const legs: Leg[] = [];
    if (a !== sa) legs.push({ ...makeLeg(a, sa, a.fl, START[a.fl] === a.id, true), endStairs: true });
    if (b !== sb) legs.push({ ...makeLeg(sb, b, b.fl, true), startStairs: true });
    const meters = legs.reduce((t, l) => t + l.meters, 0);
    return { kind: "multi", a, b, sa, sb, legs, meters, minutes: Math.max(1, Math.round(meters / 75)) + 1 };
  }, [from, to]);

  const viewLeg = route && route.kind !== "same" ? route.legs.find((l) => l.floor === floor) : undefined;
  const startPlace = PLACES[from];
  const idleMsg =
    floor === 0 && from === "main"
      ? DEFAULT_MSG
      : startPlace
      ? `Vous êtes devant « ${startPlace.n} » (${FLOORS[startPlace.fl]}). Choisissez votre destination.`
      : DEFAULT_MSG;

  return (
    <div className="campus">
      <style>{CSS}</style>
      <div className="wrap">
        <div className="panel">
          <div className="crow">
            <div className="f">
              <label htmlFor="from">Je suis ici / Départ</label>
              <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
                {fromGroups.map(([f, l]) => (
                  <optgroup key={f} label={FLOORS[f]}>
                    {l.map((p) => (
                      <option key={p.id} value={p.id}>{optText(p)}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="f">
              <label htmlFor="to">Destination</label>
              <select id="to" value={to} onChange={(e) => pick(e.target.value)}>
                <option value="">— Choisir —</option>
                {toGroups.map(([f, l]) => (
                  <optgroup key={f} label={FLOORS[f]}>
                    {l.map((p) => (
                      <option key={p.id} value={p.id}>{optText(p)}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {floor === 0 && (
            <>
              <div className="chips">
                {CATEGORIES.map((c) => (
                  <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="crow" style={{ marginTop: 8 }}>
                <button className="cbtn" onClick={() => setFrom("main")}>
                  📍 Je suis à l’entrée principale
                </button>
              </div>
            </>
          )}
        </div>

        <div className="maprow">
        <div className="floors" role="group" aria-label="Choix de l’étage">
          <span className="fl-t">Étage</span>
          {([2, 1, 0] as Floor[]).map((i) => (
            <button
              key={i}
              className={"chip" + (floor === i ? " on" : "")}
              onClick={() => changeFloor(i)}
              aria-label={FLOORS[i]}
              aria-pressed={floor === i}
            >
              {i === 0 ? "1er" : `${i + 1}e`}
            </button>
          ))}
        </div>
        <div className="mapbox">
          <svg viewBox="0 130 960 540" role="img" aria-label="Plan du campus">
            <rect x={0} y={130} width={960} height={540} fill="var(--g)" />
            {[[355, 172, 530, 60], [190, 200, 165, 50], [45, 250, 310, 235], [385, 262, 490, 220], [375, 172, 510, 40]].map((r, i) => (
              <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill="var(--green)" opacity={0.9} />
            ))}
            {EDGES.map(([a, b]) => (
              <line key={a + b} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke="#fff" opacity={0.35} strokeWidth={8} strokeLinecap="round" />
            ))}
            {floor === 0 && [[120, 138, 230, 28], [428, 200, 100, 50], [110, 600, 170, 22], [485, 598, 230, 22], [878, 290, 18, 135]].map(([x, y, w, h], i) => (
              <g key={i}>
                <rect x={x} y={y} width={w} height={h} rx={3} fill="#3a4452" stroke="#566170" />
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 3}
                  fontSize={9}
                  fill="#e8edf2"
                  fontWeight={600}
                  textAnchor="middle"
                  transform={h > w ? `rotate(90 ${x + w / 2} ${y + h / 2})` : undefined}
                >
                  PARKING
                </text>
              </g>
            ))}

            {/* Rez-de-chaussée */}
            <g style={{ display: floor ? "none" : undefined }}>
              {GROUND.map((p, i) => (
                <g key={p.id} className="pl" onClick={() => pick(p.id)}>
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4} fill={p.c} opacity={0.95} />
                  <BlockLabel p={p} later={GROUND.slice(i + 1)} text={mapLabel(p, floor)} top={p.id === "hall"} />
                  <title>{p.n}</title>
                </g>
              ))}
            </g>

            {/* Étages supérieurs */}
            {floor > 0 && (
              <g>
                {UPPER_FLOORS[floor].map((p, i) => (
                  <g key={p.id} className="pl" onClick={() => pick(p.id)}>
                    <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4} fill={p.c} />
                    <BlockLabel p={p} later={UPPER_FLOORS[floor].slice(i + 1)} text={mapLabel(p, floor)} />
                    <title>{p.n + " – " + p.sub}</title>
                  </g>
                ))}
              </g>
            )}

            {/* Itinéraire de l'étage affiché */}
            {viewLeg && (
              <g>
                <polyline
                  points={viewLeg.pts.map((p) => p.join(",")).join(" ")}
                  fill="none"
                  stroke="var(--route)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="route"
                />
                <circle cx={viewLeg.pts[0][0]} cy={viewLeg.pts[0][1]} r={8} fill={viewLeg.startStairs ? "#f3b81c" : BLUE} stroke="#fff" strokeWidth={3} />
                <circle
                  cx={viewLeg.pts[viewLeg.pts.length - 1][0]}
                  cy={viewLeg.pts[viewLeg.pts.length - 1][1]}
                  r={9}
                  fill={viewLeg.endStairs ? "#f3b81c" : BRICK}
                  stroke="#fff"
                  strokeWidth={3}
                />
              </g>
            )}

            {/* Vous êtes ici (entrée principale) */}
            {floor === 0 && from === "main" && (
              <g>
                <circle cx={380} cy={597} r={7} fill={BLUE} stroke="#fff" strokeWidth={3} />
                <text x={380} y={620} fontSize={9} fill={BLUE} textAnchor="middle" fontWeight={700}>Vous êtes ici</text>
              </g>
            )}
          </svg>
        </div>
        </div>

        <div className="panel info" style={{ marginTop: 10 }} id="info" aria-live="polite">
          {!route ? (
            idleMsg
          ) : route.kind === "same" ? (
            "Vous êtes déjà ici 🙂"
          ) : (
            <>
              <b>{route.a.n} → {route.b.n}</b>
              <br />
              ≈ {route.meters} m · ~{route.minutes} min à pied
              {route.kind === "single" ? (
                <>
                  <div className="leg">{FLOORS[route.a.fl]}</div>
                  <LegSteps leg={route.legs[0]} />
                </>
              ) : (
                <>
                  <div className="leg">① {FLOORS[route.a.fl]}</div>
                  {route.legs.find((l) => l.endStairs) ? (
                    <LegSteps leg={route.legs.find((l) => l.endStairs) as Leg} />
                  ) : (
                    <p className="note">Vous êtes déjà devant <b>{route.sa.n}</b>.</p>
                  )}
                  <div className="swap">
                    <b>② Changez d’étage</b> : {route.b.fl > route.a.fl ? "montez" : "descendez"} du <b>{FLOORS[route.a.fl]}</b> au{" "}
                    <b>{FLOORS[route.b.fl]}</b> (escaliers, emplacement à confirmer).
                    <div style={{ marginTop: 6 }}>
                      <button className="cbtn" onClick={() => changeFloor(route.b.fl)}>
                        Je suis arrivé au {FLOORS[route.b.fl]}
                      </button>
                    </div>
                  </div>
                  <div className="leg">③ {FLOORS[route.b.fl]}</div>
                  {route.legs.find((l) => l.startStairs) ? (
                    <LegSteps leg={route.legs.find((l) => l.startStairs) as Leg} />
                  ) : (
                    <p className="note">Vous arrivez devant <b>{route.b.n}</b>.</p>
                  )}
                </>
              )}
              {!viewLeg && route.legs.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <button className="cbtn" onClick={() => setFloor(route.legs[0].floor)}>
                    Voir le trajet sur la carte ({FLOORS[route.legs[0].floor]})
                  </button>
                </div>
              )}
              {roomNote !== null && (
                <p className="note">
                  Salle TD <b>{roomNote}</b> : {roomNote >= 200 ? "3e" : "2e"} étage, bloc Amphithéâtres + TD.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Styles ───────────── */
const CSS = `
.campus{--bg:#f4f6fb;--card:#fff;--tx:#0b1a3a;--mu:#5b6785;--bd:#d5dbea;--ac:#ff5a1f;--route:#ff5a1f;--g:#c4c9d0;--green:#2f6f4a;--blue:#0b1a3a;--gold:#f3b81c;
 color:var(--tx);font-family:inherit;font-size:15px;line-height:1.4;text-align:left;min-height:100%;
 padding-bottom:env(safe-area-inset-bottom,0px);box-sizing:border-box}
.campus *{box-sizing:border-box}
.campus .wrap{max-width:1000px;margin:0 auto;padding:12px}
.campus .panel{border:1px solid var(--bd);border-top:3px solid var(--ac);background:var(--card);border-radius:12px;padding:12px;margin-bottom:12px;font-size:14px;box-shadow:0 2px 10px rgba(11,26,58,.06)}
.campus .panel.info{border-top-color:var(--bd);border-left:4px solid var(--gold)}
.campus .panel b{font-size:15px}
.campus .crow{display:flex;gap:8px;flex-wrap:wrap}
.campus select,.campus input{flex:1;min-width:140px;padding:9px 10px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);font:inherit;width:100%}
.campus select:focus,.campus input:focus{outline:2px solid var(--ac);outline-offset:1px}
.campus label{font-size:12px;color:var(--mu);display:block;margin-bottom:2px;font-weight:600}
.campus .f{flex:1;min-width:150px}
.campus .chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.campus .chip{border:1px solid var(--bd);background:#fff;color:var(--tx);border-radius:99px;padding:5px 12px;font:inherit;font-size:13px;cursor:pointer}
.campus .chip:hover{border-color:var(--blue)}
.campus .chip.on{background:var(--blue);color:#fff;border-color:var(--blue)}
.campus .mapbox{background:var(--card);border:1px solid var(--bd);border-radius:12px;overflow:hidden;margin-bottom:12px;box-shadow:0 2px 10px rgba(11,26,58,.06)}
.campus .maprow{display:flex;gap:10px;align-items:stretch;margin-bottom:12px}
.campus .maprow .mapbox{flex:1;min-width:0;margin-bottom:0}
.campus .floors{display:flex;flex-direction:column;gap:6px;justify-content:center;align-items:center}
.campus .floors .chip{width:48px;height:48px;padding:0;border-radius:12px;font-weight:700;font-size:14px}
.campus .fl-t{font-size:11px;color:var(--mu);font-weight:600}
.campus svg{display:block;width:100%;height:auto}
.campus .pl{cursor:pointer}
.campus .pl:hover rect{stroke:var(--ac);stroke-width:2}
.campus .lb{font-size:10px;fill:#fff;text-anchor:middle;pointer-events:none;font-weight:600}
.campus ol{margin:6px 0 0;padding-left:20px}
.campus .leg{margin-top:10px;font-weight:700;color:var(--blue)}
.campus .swap{margin-top:10px;padding:8px 10px;border:1px dashed var(--ac);border-radius:8px;background:#fff6f0}
.campus .note{margin:6px 0 0}
.campus .cbtn{background:var(--ac);color:#fff;border:0;border-radius:8px;padding:9px 16px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;width:auto}
.campus .cbtn:hover{filter:brightness(.92)}
.campus .route{stroke-dasharray:10 7;animation:campus-dash 1s linear infinite}
@keyframes campus-dash{to{stroke-dashoffset:-34}}
@media (prefers-reduced-motion:reduce){.campus .route{animation:none}}
`;

/* ───────────── Page ───────────── */
function MAP() {
  return (
    <section className="flex-grow-1 d-flex align-items-center pt-4" style={{ minHeight: "50vh" }}>
      <div className="container-fluid">
        <div className="row align-items-center g-5 mb-5">
          <div className="text-center">
            <h2 className="about-title mb-3 ms-3">
              Choisissez votre point de départ et votre destination, ou scannez un code QR sur place.
            </h2>
            <CampusMap />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MAP;