export default function LogoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-16 -16 96 96"
      fill="none"
      {...props}
    >
      <g transform="scale(1.3)" transform-origin="32 32">
        <defs>
          {/* === Gradients for New & Updated Elements === */}
          <linearGradient
            id="laurelGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient
            id="redRibbonGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          {/* Gradients for the new detailed platform */}
          <linearGradient
            id="platformGradient"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a1a1aa" />
            <linearGradient
              id="shieldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#738299" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient
              id="symbolGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient
              id="highlightGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <stop offset="100%" stopColor="#52525b" />
          </linearGradient>
          <linearGradient
            id="platformHighlight"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e4e4e7" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>
          <radialGradient id="gemGradient">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          {/* New gradient for the glowing element */}
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
          </linearGradient>

          {/* === Filters for Depth and Effects === */}
          <filter
            id="elementDropShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.5"
              floodColor="#000"
              floodOpacity="0.4"
            />
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          </filter>
          {/* New filter for subtle shield texture */}
          <filter id="shieldTexture" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="2"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="#fff"
              surfaceScale="2"
              result="light"
            >
              <fePointLight x="32" y="32" z="100" />
            </feDiffuseLighting>
            <feComposite
              in="SourceGraphic"
              in2="light"
              operator="arithmetic"
              k1="1"
              k2="0"
              k3="0"
              k4="0"
            />
          </filter>
          {/* Filter for the glowing gem's effect */}
          <filter id="gemGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="glowBlur" />
            <feFlood
              floodColor="#f59e0b"
              floodOpacity="0.8"
              result="floodColor"
            />
            <feComposite
              in="floodColor"
              in2="glowBlur"
              operator="in"
              result="coloredGlow"
            />
            <feMerge>
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* New filter for a stone texture on the platform */}
          <filter id="stoneTexture" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.2"
              numOctaves="3"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="#a1a1aa"
              surfaceScale="1.5"
              result="light"
            >
              <feDistantLight azimuth="235" elevation="60" />
            </feDiffuseLighting>
            <feComposite
              in="SourceGraphic"
              in2="light"
              operator="arithmetic"
              k1="1.5"
              k2="0"
              k3="0"
              k4="0"
            />
          </filter>

          {/* === Core Gradients (Tweaked for Vibrancy) === */}
          <linearGradient
            id="shieldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#738299" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient
            id="highlightGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- Element Rendering Order (Back to Front) --- */}

        {/* === UPDATED: Platform moved up === */}
        <g id="platform" filter="url(#elementDropShadow) url(#stoneTexture)">
          {/* Main body with curved bottom */}
          <path
            d="M6 53 L 58 53 L 52 62 C 45 66, 19 66, 12 62 L 6 53 Z"
            fill="url(#platformGradient)"
          />
          {/* Top surface to give a 3D feel */}
          <path
            d="M6 53 L 11 47 H 53 L 58 53 Z"
            fill="url(#platformHighlight)"
          />
          {/* Top surface highlight line */}
          <path d="M11 47 H 53" stroke="#fafafa" strokeWidth="0.75" />
          {/* Glowing Gem in the center */}
          <g filter="url(#gemGlow)">
            <circle
              cx="32"
              cy="50"
              r="3"
              fill="url(#gemGradient)"
              stroke="#fef08a"
              strokeWidth="0.5"
            />
          </g>
        </g>

        {/* === Crest Elements Group === */}
        <g>
          {/* === UPDATED: Wider, more jagged laurels for visibility === */}
          <g
            id="laurel-wreath"
            fill="url(#laurelGradient)"
            filter="url(#elementDropShadow)"
          >
            {/* Left Laurel Branch */}
            <path d="M30 58 C 5 55, -15 35, 4 15 L 6 20 C -5 38, 15 55, 31 59 Z" />
            <path d="M27 53 C 2 48, -12 32, 8 18 L 10 23 C -3 35, 12 49, 28 54 Z" />
            <path d="M24 47 C 0 42, -8 28, 10 20 L 12 25 C 0 32, 8 43, 25 48 Z" />

            {/* Right Laurel Branch */}
            <path d="M34 58 C 59 55, 79 35, 60 15 L 58 20 C 69 38, 49 55, 33 59 Z" />
            <path d="M37 53 C 62 48, 76 32, 56 18 L 54 23 C 67 35, 52 49, 36 54 Z" />
            <path d="M40 47 C 64 42, 72 28, 54 20 L 52 25 C 64 32, 56 43, 39 48 Z" />
          </g>

          {/* === Shield with Texture === */}
          <g id="shield" filter="url(#elementDropShadow) url(#shieldTexture)">
            <path
              d="M32 4 L 56 16 V 36 C 56 42, 48 48, 32 54 C 16 48, 8 42, 8 36 V 16 Z"
              fill="url(#shieldGradient)"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M32 6 L 54 17 V 36 C 54 41, 47 46, 32 52 C 17 46, 10 41, 10 36 V 17 Z"
              fill="none"
              stroke="url(#highlightGradient)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <path
              d="M32 4 V 54"
              stroke="#1e293b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M32 4 V 54"
              stroke="url(#highlightGradient)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>

          {/* === Crisscrossing Ribbons with Crest-like Ends === */}
          {/* Blue Ribbon (renders underneath) */}
          <g
            id="blue-ribbon"
            fill="url(#cyanGradient)"
            filter="url(#elementDropShadow)"
          >
            <path d="M58 27 L 10 47 L 8 41 L 56 21 Z" />
            <path d="M58 27 C 60 25, 62 23, 62 21 L 56 21 Z" />
            <path d="M10 47 C 8 49, 6 51, 2 51 L 8 41 Z" />
            <path
              d="M56 23 L 10 45"
              fill="none"
              stroke="#bae6fd"
              strokeOpacity="0.8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          {/* Red Ribbon (renders on top) */}
          <g
            id="red-ribbon"
            fill="url(#redRibbonGradient)"
            filter="url(#elementDropShadow)"
          >
            <path d="M6 27 L 54 47 L 56 41 L 8 21 Z" />
            <path d="M6 27 C 4 25, 2 23, 2 21 L 8 21 Z" />
            <path d="M54 47 C 56 49, 58 51, 62 51 L 56 41 Z" />
            <path
              d="M8 23 L 54 45"
              fill="none"
              stroke="#fca5a5"
              strokeOpacity="0.8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          <g id="central-symbol">
            <path
              d="M32 10 V 20 M 24 26 L 32 20 L 40 26"
              fill="none"
              stroke="url(#symbolGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
              filter="url(#softGlow)"
            />
            <path
              d="M32 10 V 20 M 24 26 L 32 20 L 40 26"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
