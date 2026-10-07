/**
 * Faceless line-art pilgrims, drawn in a 120×260 box per figure (ground at y≈241).
 * Rendered as SVG <g> so they can live inside any scene's viewBox.
 *
 * Classes the stylesheet animates:
 *   .leg / .arm / .foot / .hem — swing while the parent scene has `.is-moving`
 *   .draw  — outlines that "draw themselves" in the hero
 *   .o-travel / .o-ihram — the man's two outfits (scenes cross-fade them)
 *   .rida-r — ihram cloth over the right shoulder (hidden for idtiba')
 */

export function Man({ outfit = "travel" }: { outfit?: "travel" | "ihram" | "both" }) {
  return (
    <g className={`uj-pl man outfit-${outfit}`}>
      <g className="bob">
        {/* legs + bare feet (behind the body) */}
        <g className="leg leg-b">
          <path className="shape draw" pathLength={1} d="M47.5 121 L62.5 121 L61.5 182 L60.5 234 L51 234 L49.5 182 Z" />
          <path className="shape skin" d="M50.5 233 L60.5 233 Q63 236 68.5 237.5 Q71 238.5 70.5 241 L50 241 Q49.5 237 50.5 233 Z" />
        </g>
        <g className="leg leg-f">
          <path className="shape draw" pathLength={1} d="M57.5 121 L72.5 121 L71.5 182 L70.5 234 L61 234 L59.5 182 Z" />
          <path className="shape skin" d="M60.5 233 L70.5 233 Q73 236 78.5 237.5 Q81 238.5 80.5 241 L60 241 Q59.5 237 60.5 233 Z" />
        </g>

        {/* back arm */}
        <g className="arm arm-b">
          <path className="shape draw" pathLength={1} d="M41 55 Q47 52 50.5 58 L49 103 Q45 106 41.5 104 Q37.5 80 41 55 Z" />
          <ellipse className="shape" cx="45.5" cy="109" rx="4.6" ry="5.4" />
        </g>

        {/* travel clothes: knee-length kurta over trousers */}
        <g className="o-travel">
          <path
            className="shape draw"
            pathLength={1}
            d="M42 52 Q60 44 78 52 Q81.5 55.5 81.5 62 L83.5 146 Q60 152 36.5 146 L38.5 62 Q38.5 55.5 42 52 Z"
          />
          <path className="thin" d="M54 47.5 Q60 52.5 66 47.5 M60 51 L60 82" />
          <circle className="dot" cx="60" cy="60" r="1.1" />
          <circle className="dot" cx="60" cy="69" r="1.1" />
          <path className="thin" d="M39.5 132 L41 146 M80.5 132 L79 146 M45 118 Q60 121 75 118" />
        </g>

        {/* ihram: rida over the left shoulder + izar at the waist */}
        <g className="o-ihram">
          <path className="shape skin draw" pathLength={1} d="M42 52 Q60 44 78 52 Q81.5 55.5 81.5 62 L81.5 112 L38.5 112 L38.5 62 Q38.5 55.5 42 52 Z" />
          <path className="thin" d="M50 64 Q55 67 60 64" />
          <path className="shape white draw" pathLength={1} d="M38.5 79 L67 48.5 Q77.5 48 81.5 56 L82.5 118 Q60 124 37.5 118 Z" />
          <path className="thin" d="M46 85 L71.5 57 M42 101 L78 66 M58 110 L80 88" />
          <path className="shape white rida-r" d="M37.5 85 Q35.5 61 43.5 52.5 Q55 46.5 67.5 48.5 L38.5 80 Z" />
          <path className="shape white draw" pathLength={1} d="M37 110 L83 110 L85.5 200 Q60 206 34.5 200 Z" />
          <path className="accent" d="M37.5 115 L82.5 115" />
          <path className="thin" d="M64 116 L58 200 M71 118 L68 199 M45 118 L43 199" />
        </g>

        {/* neck, head, beard and cap */}
        <path className="shape skin" d="M55 37 L55 48 Q60 50.5 65 48 L65 37 Z" />
        <ellipse className="shape draw" pathLength={1} cx="60" cy="26" rx="12" ry="14" />
        <path className="shape beard" d="M48.4 28 Q49 41.5 60 44.5 Q71 41.5 71.6 28 Q67 34.5 60 35 Q53 34.5 48.4 28 Z" />
        <path className="shape white o-travel" d="M48 19.5 Q48 9 60 9 Q72 9 72 19.5 Q60 15.5 48 19.5 Z" />

        {/* front arm */}
        <g className="arm arm-f">
          <path className="shape draw" pathLength={1} d="M70 56 Q76 50.5 80.5 55 Q84 80 79.5 104 Q75.5 106 72 103 Z" />
          <ellipse className="shape" cx="76" cy="109" rx="4.6" ry="5.4" />
        </g>
      </g>
    </g>
  );
}

export function Woman() {
  return (
    <g className="uj-pl woman">
      <g className="bob">
        {/* shoes peeking under the abaya */}
        <g className="foot foot-b"><path className="shape dark" d="M46 236 L58 236 Q62.5 237 63.5 241 L46 241 Z" /></g>
        <g className="foot foot-f"><path className="shape dark" d="M61 236 L73 236 Q77.5 237 78.5 241 L61 241 Z" /></g>

        {/* back sleeve */}
        <g className="arm arm-b">
          <path className="shape draw" pathLength={1} d="M39 84 Q34 112 37.5 140 L46 141 Q46.5 113 46.5 88 Z" />
          <ellipse className="shape face" cx="41.8" cy="145.5" rx="4.2" ry="5" />
        </g>

        {/* abaya, flaring gently to the hem */}
        <path className="shape hem draw" pathLength={1} d="M41 70 Q38 73 36.5 82 L27.5 236 Q60 244.5 92.5 236 L83.5 82 Q82 73 79 70 Z" />
        <path className="thin" d="M51 98 L45 236 M69 98 L75 236 M60 100 L60 239" />
        <path className="accent" d="M29.5 229 Q60 236.5 90.5 229" />

        {/* khimar draping over the shoulders and chest, with an open, featureless face */}
        <path
          className="shape draw"
          pathLength={1}
          d="M60 7 C45 7 39 19 40 33 C41 45 41 53 34 66 Q32 80 38 91 Q60 99 82 91 Q88 80 86 66 C79 53 79 45 80 33 C81 19 75 7 60 7 Z"
        />
        <ellipse className="shape face" cx="60" cy="31" rx="9.6" ry="12.6" />
        <path className="thin" d="M47 50 Q60 60 73 50 M43 70 Q60 82 77 70" />

        {/* front sleeve */}
        <g className="arm arm-f">
          <path className="shape draw" pathLength={1} d="M81 84 Q86 112 82.5 140 L74 141 Q73.5 113 73.5 88 Z" />
          <ellipse className="shape face" cx="78.2" cy="145.5" rx="4.2" ry="5" />
        </g>
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
      <g transform={`scale(${s}) translate(-120 -243)`}>
        <g><Man outfit={outfit} /></g>
        <g transform="translate(98 12) scale(.95)"><Woman /></g>
      </g>
    </g>
  );
}
