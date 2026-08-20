interface Props {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

/** Hand-drawn "A" monogram in a ring, crossed by a tilted gold orbit. */
export default function Logo({ size = 44, withWordmark = false, className }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
        {/* outer ring */}
        <circle cx="24" cy="24" r="21.5" stroke="#C9A45F" strokeOpacity="0.55" strokeWidth="1" />
        {/* inner ring */}
        <circle cx="24" cy="24" r="17.5" stroke="#ECE9E2" strokeOpacity="0.1" strokeWidth="0.75" />
        {/* orbit */}
        <ellipse
          cx="24"
          cy="24"
          rx="21.5"
          ry="7.5"
          transform="rotate(-24 24 24)"
          stroke="#C9A45F"
          strokeOpacity="0.35"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />
        {/* satellite dot on the orbit */}
        <circle cx="42.4" cy="14.2" r="2" fill="#C9A45F">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        {/* monogram */}
        <text
          x="24"
          y="33.5"
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontWeight="700"
          fontSize="27"
          fill="#ECE9E2"
        >
          A
        </text>
      </svg>
      {withWordmark && (
        <span className="font-display text-2xl font-semibold leading-none text-bone">
          Artist<span className="text-gold">.</span>
        </span>
      )}
    </span>
  );
}
