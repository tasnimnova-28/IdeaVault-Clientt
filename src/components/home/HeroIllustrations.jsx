// Three hand-built SVG visuals for the hero slides.
// They use theme colors (fill-primary, fill-accent...) so they follow light and dark mode.

export function IdeaSparkIllustration() {
  return (
    <svg viewBox="0 0 480 400" role="img" aria-label="An idea card with a glowing lightbulb above it" className="h-full w-full">
      <circle cx="240" cy="205" r="170" className="fill-primary/10" />

      {/* Card behind */}
      <g transform="rotate(-7 230 215)">
        <rect x="104" y="130" width="250" height="170" rx="24" className="fill-base-100 stroke-base-300" strokeWidth="2" />
      </g>

      {/* Main idea card */}
      <rect x="130" y="150" width="260" height="180" rx="26" className="fill-base-100 stroke-primary" strokeWidth="3" />
      <rect x="158" y="180" width="130" height="14" rx="7" className="fill-primary" />
      <rect x="158" y="210" width="200" height="9" rx="4.5" className="fill-base-300" />
      <rect x="158" y="230" width="170" height="9" rx="4.5" className="fill-base-300" />
      <rect x="158" y="274" width="82" height="28" rx="14" className="fill-accent/30" />
      <rect x="250" y="274" width="82" height="28" rx="14" className="fill-primary/15" />
      <text x="199" y="293" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-base-content">
        Problem
      </text>
      <text x="291" y="293" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-base-content">
        Solution
      </text>

      {/* Lightbulb */}
      <circle cx="372" cy="108" r="42" className="fill-accent" />
      <path d="M356 108a16 16 0 0 1 14-16" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-accent-content/40" />
      <rect x="358" y="146" width="28" height="16" rx="5" className="fill-primary" />
      <g strokeWidth="5" strokeLinecap="round" className="stroke-accent">
        <line x1="372" y1="56" x2="372" y2="44" />
        <line x1="409" y1="71" x2="417" y2="63" />
        <line x1="335" y1="71" x2="327" y2="63" />
        <line x1="424" y1="108" x2="436" y2="108" />
        <line x1="320" y1="108" x2="308" y2="108" />
      </g>

      {/* Sparkle */}
      <path d="M92 90 97 105 112 110 97 115 92 130 87 115 72 110 87 105Z" className="fill-secondary/40" />
    </svg>
  )
}

export function InnovationIllustration() {
  return (
    <svg viewBox="0 0 480 400" role="img" aria-label="Rising bars and a growth line showing an idea gaining momentum" className="h-full w-full">
      <rect x="60" y="50" width="360" height="300" rx="36" className="fill-primary/10" />

      {/* Bars */}
      <rect x="110" y="230" width="56" height="82" rx="12" className="fill-primary/40" />
      <rect x="196" y="180" width="56" height="132" rx="12" className="fill-primary/70" />
      <rect x="282" y="120" width="56" height="192" rx="12" className="fill-primary" />
      <line x1="90" y1="314" x2="390" y2="314" strokeWidth="3" strokeLinecap="round" className="stroke-base-300" />

      {/* Growth line */}
      <polyline
        points="138,208 224,158 310,98 366,78"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
      <g strokeWidth="5" className="fill-base-100 stroke-accent">
        <circle cx="138" cy="208" r="9" />
        <circle cx="224" cy="158" r="9" />
        <circle cx="310" cy="98" r="9" />
        <circle cx="366" cy="78" r="9" />
      </g>

      {/* Status chip */}
      <rect x="86" y="80" width="150" height="38" rx="19" className="fill-base-100 stroke-base-300" strokeWidth="2" />
      <circle cx="108" cy="99" r="6" className="fill-primary" />
      <text x="122" y="104" fontSize="13" fontWeight="600" className="fill-base-content">
        Prototype ready
      </text>
    </svg>
  )
}

function Avatar({ cx, cy, colorClass }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="38" className={colorClass} />
      <circle cx={cx} cy={cy - 8} r="13" className="fill-base-100" />
      <path d={`M${cx - 22} ${cy + 28}Q${cx} ${cy + 4} ${cx + 22} ${cy + 28}Z`} className="fill-base-100" />
    </g>
  )
}

export function CollaborationIllustration() {
  return (
    <svg viewBox="0 0 480 400" role="img" aria-label="Three people connected around a shared idea card" className="h-full w-full">
      <circle cx="240" cy="205" r="170" className="fill-primary/10" />

      {/* Connections */}
      <g strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" className="stroke-primary/50">
        <line x1="240" y1="200" x2="96" y2="250" />
        <line x1="240" y1="200" x2="384" y2="130" />
        <line x1="240" y1="200" x2="384" y2="310" />
      </g>

      {/* Shared idea card */}
      <rect x="180" y="160" width="120" height="84" rx="20" className="fill-base-100 stroke-primary" strokeWidth="3" />
      <rect x="198" y="182" width="64" height="10" rx="5" className="fill-primary" />
      <rect x="198" y="202" width="84" height="8" rx="4" className="fill-base-300" />
      <rect x="198" y="218" width="52" height="8" rx="4" className="fill-base-300" />

      {/* People */}
      <Avatar cx={96} cy={250} colorClass="fill-secondary" />
      <Avatar cx={384} cy={130} colorClass="fill-accent" />
      <Avatar cx={384} cy={310} colorClass="fill-primary" />

      {/* Comment bubbles */}
      <rect x="52" y="140" width="112" height="44" rx="16" className="fill-base-100 stroke-base-300" strokeWidth="2" />
      <rect x="68" y="154" width="62" height="8" rx="4" className="fill-base-300" />
      <rect x="68" y="168" width="40" height="8" rx="4" className="fill-base-300" />
      <rect x="284" y="52" width="112" height="44" rx="16" className="fill-base-100 stroke-base-300" strokeWidth="2" />
      <rect x="300" y="66" width="62" height="8" rx="4" className="fill-base-300" />
      <rect x="300" y="80" width="40" height="8" rx="4" className="fill-base-300" />
    </svg>
  )
}
