/**
 * Faceless line-art pilgrims, drawn in a 120×260 box per figure (ground at y≈244).
 * Rendered as SVG <g> so they can live inside any scene's viewBox.
 *
 * Classes the stylesheet animates:
 *   .walk  — limbs swing while the parent scene has `.is-moving`
 *   .draw  — outlines that "draw themselves" in the hero
 *   .o-travel / .o-ihram — the man's two outfits (scenes cross-fade them)
 */

type LimbProps = { d: string; w: number; cls?: string };

// Outlined limb: a wide stroke in the line colour under a narrower one in the fill colour.
function Limb({ d, w, cls = "" }: LimbProps) {
  return (
    <g className={`limb ${cls}`}>
      <path d={d} className="lo draw" pathLength={1} style={{ strokeWidth: w + 5 }} />
      <path d={d} className="li" style={{ strokeWidth: w }} />
    </g>
  );
}

export function Man({ outfit = "travel" }: { outfit?: "travel" | "ihram" | "both" }) {
  return (
    <g className={`uj-pl man outfit-${outfit}`}>
      <g className="bob">
        {/* legs (behind body) */}
        <Limb cls="leg leg-b" d="M55 126 L53 234 L62 238" w={11} />
        <Limb cls="leg leg-f" d="M65 126 L66 234 L76 238" w={11} />
        {/* back arm */}
        <Limb cls="arm arm-b" d="M47 62 Q42 92 45 122" w={9} />

        {/* travel clothes: shirt over trousers + kufi */}
        <g className="o-travel">
          <path className="shape draw" pathLength={1} d="M43 56 Q60 48 77 56 L80 134 Q60 139 40 134 Z" />
          <path className="thin" d="M60 52 L60 134 M52 52 L60 64 L68 52" />
        </g>

        {/* ihram: izar (waist wrap) + rida over the left shoulder, right shoulder bare */}
        <g className="o-ihram">
          <path className="shape skin draw" pathLength={1} d="M43 56 Q60 48 77 56 L79 112 L41 112 Z" />
          <path className="shape white draw" pathLength={1} d="M41 76 L66 52 Q76 52 78 60 L80 116 Q60 121 41 116 Z" />
          <path className="thin" d="M47 80 L71 58 M44 98 L76 70" />
          {/* covers the right shoulder; scenes hide it for idtiba' during tawaf */}
          <path className="shape white rida-r" d="M37 82 Q35 62 44 55 Q54 49 66 52 L41 78 Z" />
          <path className="shape white draw" pathLength={1} d="M40 110 L80 110 L83 196 Q60 201 37 196 Z" />
          <path className="thin" d="M63 110 L57 196" />
        </g>

        {/* neck + head */}
        <Limb d="M60 40 L60 52" w={8} />
        <circle className="shape draw" pathLength={1} cx="60" cy="27" r="14" />
        <path className="shape o-travel draw" pathLength={1} d="M46.5 23 Q47 10 60 10 Q73 10 73.5 23 Z" />

        {/* front arm */}
        <Limb cls="arm arm-f" d="M73 62 Q78 92 75 122" w={9} />
      </g>
    </g>
  );
}

export function Woman() {
  return (
    <g className="uj-pl woman">
      <g className="bob">
        {/* feet peeking under the abaya */}
        <Limb cls="foot foot-b" d="M50 240 L57 240" w={5} />
        <Limb cls="foot foot-f" d="M64 240 L72 240" w={5} />
        <Limb cls="arm arm-b" d="M46 72 Q40 104 44 136" w={10} />
        {/* abaya */}
        <path className="shape hem draw" pathLength={1} d="M44 64 Q60 56 76 64 L89 236 Q60 243 31 236 Z" />
        <path className="thin" d="M60 70 L60 236" />
        {/* hijab with an open, featureless face */}
        <path
          className="shape draw"
          pathLength={1}
          d="M60 9 C46 9 41 21 42 34 C43 46 45 53 37 64 Q60 77 83 64 C75 53 77 46 78 34 C79 21 74 9 60 9 Z"
        />
        <ellipse className="shape face" cx="60" cy="32" rx="9" ry="12" />
        <Limb cls="arm arm-f" d="M74 72 Q80 104 76 136" w={10} />
      </g>
    </g>
  );
}

/** The couple side by side; `x`,`y` place the ground-centre point, `s` scales. */
export function Couple({
  x = 0, y = 0, s = 1, outfit = "travel", className = "",
}: { x?: number; y?: number; s?: number; outfit?: "travel" | "ihram" | "both"; className?: string }) {
  return (
    <g className={`couple ${className}`} transform={`translate(${x} ${y})`}>
      <g transform={`scale(${s}) translate(-120 -246)`}>
        <g transform="translate(0 0)"><Man outfit={outfit} /></g>
        <g transform="translate(98 14) scale(.94)"><Woman /></g>
      </g>
    </g>
  );
}
