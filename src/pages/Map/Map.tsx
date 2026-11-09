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
}

/* ───────────── Palette ───────────── */
const BRICK = "#9c3b2b";
const BRICK_LIGHT = "#b5523b";
const BLUE = "#1f4e8c";
const BLUE_UPPER = "#4f7fc2";
const GRAY = "#6b7480";

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
  ["sec", "Secrétariat général", "الكتابة العامة", 215, 262, 95, 24, BRICK_LIGHT, "OS", "Administration"],
  ["adm", "Administration", "الإدارة", 235, 325, 80, 24, BRICK_LIGHT, "OA", "Administration"],
  ["scol", "Service de scolarité", "مصلحة شؤون الطلبة", 255, 388, 100, 24, BRICK_LIGHT, "O1", "Administration"],
  ["hall", "Hall", "البهو", 275, 412, 200, 100, "#4a5461", "HC", "Études"],
  ["dir", "Direction des études et stages", "مصالح الدراسات", 285, 416, 100, 34, BRICK, "HC", "Administration"],
  ["acc", "Accueil / Forum", "الاستقبال", 285, 453, 100, 14, BRICK, "F", "Administration"],
  ["aud", "Auditorium", "القاعة الكبرى", 392, 418, 70, 70, BRICK, "AU", "Études"],
  ["bib", "Bibliothèque", "المكتبة", 282, 515, 95, 40, BRICK, "G", "Études"],
  ["conf", "Salles de conférences", "قاعات المحاضرات", 378, 515, 82, 40, BRICK, "E", "Études"],
  ["resto", "Restaurant universitaire", "المطعم الجامعي", 427, 255, 100, 62, GRAY, "R", "Restauration"],
  ["cafe", "Cafétéria", "مشرب", 392, 254, 30, 28, GRAY, "V2", "Restauration"],
  ["ing", "Ingénierat et recherche", "الهندسة والبحث", 100, 432, 170, 58, GRAY, "H", "Études"],
  ["labg", "Laboratoires (ouest)", "المخابر", 76, 508, 192, 44, BLUE, "H", "Laboratoires"],
  ["cyc", "Formation de premier cycle", "دراسات المرحلة الأولى", 477, 440, 378, 58, BLUE, "D", "Études"],
  ["amph", "Amphithéâtres", "المدرجات", 473, 522, 125, 38, BLUE, "D", "Études"],
  ["td", "Salles de travaux dirigés", "الدروس الموجهة", 598, 522, 118, 38, BLUE, "C", "Études"],
  ["labd", "Laboratoires (est)", "المخابر", 750, 533, 88, 36, BLUE, "B", "Laboratoires"],
];

// [id, nom, précision, x, y, w, h, couleur, nœud, étiquette]
type U = [string, string, string, number, number, number, number, string, string, string];
const UPPER_DATA: U[] = [
  ["f1td", "Salles TD 101 à 173", "Amphithéâtres + salles de TD", 473, 522, 243, 38, BLUE_UPPER, "D", "Salles TD 101–173"],
  ["f1tp", "Salles TP", "Formation de premier cycle", 477, 440, 378, 58, BLUE_UPPER, "D", "Salles TP"],
  ["f1bib", "Bibliothèque", "", 282, 515, 95, 40, BRICK, "G", "Bibliothèque"],
  ["f1prof", "Départements des professeurs", "Ingénierat et recherche", 100, 432, 170, 58, BLUE_UPPER, "H", "Départements profs"],
  ["f1labg", "Salles TP et mousalla", "Laboratoires ouest", 76, 508, 192, 44, BLUE_UPPER, "H", "TP · Mousalla"],
  ["f1labd", "Salles TP et mousalla", "Laboratoires est", 750, 533, 88, 36, BLUE_UPPER, "B", "TP · Mousalla"],
  ["f1sec", "Secrétariat général", "Bureaux administratifs", 215, 262, 95, 24, BRICK_LIGHT, "OS", "Administration"],
  ["f1adm", "Administration", "Bureaux administratifs", 235, 325, 80, 24, BRICK_LIGHT, "OA", "Administration"],
  ["f1scol", "Service de scolarité", "Bureaux administratifs", 255, 388, 100, 24, BRICK_LIGHT, "O1", "Administration"],
  ["f1dir", "Direction des études et stages", "Bureaux administratifs", 285, 416, 100, 34, BRICK, "HC", "Administration"],
];

const GROUND: Place[] = GROUND_DATA.map(([id, n, ar, x, y, w, h, c, node, cat]) => ({ id, n, ar, x, y, w, h, c, node, cat }));
const UPPER: Place[] = UPPER_DATA.map(([id, n, sub, x, y, w, h, c, node, label]) => ({
  id, n, ar: "", sub, label, x, y, w, h, c, node, upper: true,
}));
const PLACES: Record<string, Place> = {};
[...GROUND, ...UPPER].forEach((p) => (PLACES[p.id] = p));

const CATEGORIES = ["Tous", ...Array.from(new Set(GROUND.map((p) => p.cat as string)))];
const FLOORS = ["1er étage", "2e étage", "3e étage"];
const DEFAULT_MSG = "Touchez un bâtiment sur la carte ou choisissez une destination.";

const center = (p: Place): Pt => [p.x + p.w / 2, p.y + p.h / 2];

function mapLabel(p: Place, floor: Floor): string {
  if (p.upper) return floor === 2 ? (p.label ?? "").replace(/\s101.173/, "") : p.label ?? "";
  if (p.w < 45) return "";
  return p.w < 60 ? p.n.split(" ")[0] : p.n;
}

/* ───────────── Composant ───────────── */
function CampusMap() {
  const [floor, setFloor] = useState<Floor>(0);
  const [from, setFrom] = useState("main");
  const [to, setTo] = useState("");
  const [cat, setCat] = useState("Tous");
  const [room, setRoom] = useState("");
  const [roomNote, setRoomNote] = useState<number | null>(null);

  const list = floor > 0 ? UPPER : GROUND;
  const toList = floor > 0 ? UPPER : GROUND.filter((p) => cat === "Tous" || p.cat === cat);

  const changeFloor = (f: Floor) => {
    setFloor(f);
    setTo("");
    setFrom(f ? "" : "main");
    setRoomNote(null);
  };

  const onRoom = (v: string) => {
    setRoom(v);
    const n = Number(v);
    if (n >= 101 && n <= 173) {
      if (floor !== 1) {
        setFloor(1);
        setFrom("");
      }
      setTo("f1td");
      setRoomNote(n);
    }
  };

  const pick = (id: string) => {
    setTo(id);
    setRoomNote(null);
  };

  const route = useMemo(() => {
    const a = PLACES[from];
    const b = PLACES[to];
    if (!a || !b) return null;
    if (a === b) return { same: true as const };
    const ids = shortestPath(a.node, b.node);
    const pts: Pt[] = [center(a), ...ids.map((i) => N[i]), center(b)];
    let len = 0;
    for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const meters = Math.round(len * 0.45);
    const minutes = Math.max(1, Math.round(meters / 75));
    const near = GROUND.filter((p) => p !== a && p !== b && ids.includes(p.node))
      .slice(0, 5)
      .map((p) => p.n);
    return { same: false as const, a, b, pts, meters, minutes, near };
  }, [from, to]);

  const idleMsg =
    floor > 0
      ? `${floor + 1}e étage : choisissez d’abord où vous êtes (Départ), puis votre destination.`
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
                {floor > 0 && <option value="">— Choisir —</option>}
                {list.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.n + (p.upper ? (p.sub ? "  " + p.sub : "") : p.ar ? "  " + p.ar : "")}
                  </option>
                ))}
              </select>
            </div>
            <div className="f">
              <label htmlFor="to">Destination</label>
              <select id="to" value={to} onChange={(e) => pick(e.target.value)}>
                <option value="">— Choisir —</option>
                {toList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.n + (p.upper ? (p.sub ? "  " + p.sub : "") : p.ar ? "  " + p.ar : "")}
                  </option>
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
            {[[120, 138, 230, 28], [428, 200, 100, 50], [110, 600, 170, 22], [485, 598, 230, 22], [878, 290, 18, 135]].map(([x, y, w, h], i) => (
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

            {/* Rez-de-chaussée (atténué aux étages) */}
            <g style={{ opacity: floor ? 0.25 : 1, pointerEvents: floor ? "none" : undefined }}>
              {GROUND.map((p) => (
                <g key={p.id} className="pl" onClick={() => pick(p.id)}>
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4} fill={p.c} opacity={0.95} />
                  <text x={p.x + p.w / 2} y={p.id === "hall" ? p.y + 11 : p.y + p.h / 2 + 3} className="lb">{mapLabel(p, floor)}</text>
                  <title>{p.n}</title>
                </g>
              ))}
            </g>

            {/* Étages supérieurs */}
            {floor > 0 && (
              <g>
                {UPPER.map((p) => (
                  <g key={p.id} className="pl" onClick={() => pick(p.id)}>
                    <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4} fill={p.c} />
                    <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 3} className="lb">{mapLabel(p, floor)}</text>
                    <title>{p.n + " – " + p.sub}</title>
                  </g>
                ))}
              </g>
            )}

            {/* Itinéraire */}
            {route && !route.same && (
              <g>
                <polyline
                  points={route.pts.map((p) => p.join(",")).join(" ")}
                  fill="none"
                  stroke="var(--route)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="route"
                />
                <circle cx={route.pts[0][0]} cy={route.pts[0][1]} r={8} fill={BLUE} stroke="#fff" strokeWidth={3} />
                <circle cx={route.pts[route.pts.length - 1][0]} cy={route.pts[route.pts.length - 1][1]} r={9} fill={BRICK} stroke="#fff" strokeWidth={3} />
              </g>
            )}

            {/* Vous êtes ici (entrée principale) */}
            {floor === 0 && (
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
          ) : route.same ? (
            "Vous êtes déjà ici 🙂"
          ) : (
            <>
              <b>{route.a.n} → {route.b.n}</b>
              <br />
              ≈ {route.meters} m · ~{route.minutes} min à pied
              <ol>
                <li>Partez de <b>{route.a.n}</b></li>
                {route.near.map((n) => (
                  <li key={n}>Passez près de {n}</li>
                ))}
                {route.b.upper && !route.a.upper && (
                  <li>Montez au <b>{floor + 1}e étage</b> (emplacement des escaliers à confirmer)</li>
                )}
                <li>
                  Arrivez à <b>{route.b.n}</b>
                  {route.b.sub ? ` (${route.b.sub})` : ""} {route.b.ar}
                </li>
              </ol>
              {roomNote !== null && (
                <>
                  Salle TD <b>{roomNote}</b> : 2e étage, bloc Amphithéâtres + TD.
                </>
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
            <h2 className="about-title mb-3 ms-3">              Choisissez votre point de départ et votre destination, ou scannez un code QR sur place.
</h2>
            
            <CampusMap />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MAP;