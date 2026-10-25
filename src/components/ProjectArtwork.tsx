import { ArrowUpRight } from "lucide-react";

export default function ProjectArtwork({
  type,
}: {
  type: "esports" | "kimpga" | "f1";
}) {
  if (type === "esports")
    return (
      <div className="project-art esports-art" aria-hidden="true">
        <div className="art-topline mono">
          <span>OP.GG / ESPORTS</span>
          <span>01 — PRODUCT</span>
        </div>
        <div className="esports-word">
          Closer to
          <br />
          <span>the game.</span>
          <span className="esports-asterisk">✳</span>
        </div>
        <div className="scoreboard">
          <div className="scoreboard-head">
            <span className="live-dot" />
            LIVE MATCH CENTER<span>LCK</span>
          </div>
          <div className="scoreboard-main">
            <span className="team-symbol">T1</span>
            <span className="match-score">
              2 <em>:</em> 1
            </span>
            <span className="team-symbol gen">G</span>
          </div>
          <div className="scoreboard-footer">
            <span>EVERY MATCH.</span>
            <span>EVERY MOMENT.</span>
          </div>
        </div>
        <div className="art-bottom mono">
          <span>FROM ZERO TO 5M ANNUAL USERS</span>
          <ArrowUpRight size={20} />
        </div>
      </div>
    );
  if (type === "kimpga")
    return (
      <div className="project-art kimpga-art" aria-hidden="true">
        <div className="art-topline mono">
          <span>KIMPGA / FINANCE</span>
          <span>02 — INDEPENDENT</span>
        </div>
        <div className="kimpga-word">
          See the
          <br />
          <span>difference.</span>
        </div>
        <div className="finance-widget">
          <span className="finance-icon">₿</span>
          <div>
            <small>BITCOIN PREMIUM</small>
            <strong>
              +4.28<span>%</span>
            </strong>
          </div>
          <span className="finance-up">↗</span>
          <svg viewBox="0 0 320 70" className="finance-chart">
            <defs>
              <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#507150" stopOpacity=".2" />
                <stop offset="100%" stopColor="#507150" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 65L15 57L26 60L42 39L55 45L72 28L90 36L105 21L120 29L137 39L154 19L168 25L188 10L207 19L225 8L240 16L260 4L275 12L296 3L320 8V70H0Z"
              fill="url(#chart-fill)"
            />
            <path
              d="M0 65L15 57L26 60L42 39L55 45L72 28L90 36L105 21L120 29L137 39L154 19L168 25L188 10L207 19L225 8L240 16L260 4L275 12L296 3L320 8"
              fill="none"
              stroke="#416347"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="art-bottom mono">
          <span>4M MAU → ACQUIRED IN 2022</span>
          <ArrowUpRight size={20} />
        </div>
      </div>
    );
  return (
    <div className="project-art f1-art" aria-hidden="true">
      <div className="art-topline mono">
        <span>F1 BOXBOX / MOTORSPORT</span>
        <span>03 — INDEPENDENT</span>
      </div>
      <div className="f1-word">
        LIGHTS OUT.
        <br />
        <span>LET’S GO.</span>
      </div>
      <svg className="race-track" viewBox="0 0 520 260">
        <path d="M80 200 L65 95 Q65 60 110 65 L240 74 Q265 75 265 100 L265 130 Q265 150 290 150 L420 135 Q470 130 455 85 L445 60 Q435 35 405 45 L355 65 Q335 72 320 50 L310 35 Q300 20 285 30 L240 50 L130 35 Q85 30 65 55 L30 130 Q20 165 45 180 L80 200 L280 220 Q320 225 345 200 L400 165" />
        <circle className="race-dot" cx="265" cy="115" r="6" />
      </svg>
      <div className="art-bottom mono">
        <span>150K MONTHLY ACTIVE FANS</span>
        <ArrowUpRight size={20} />
      </div>
    </div>
  );
}
