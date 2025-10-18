export default function HelpMateLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Hand */}
      <path
        d="M25 55 L25 45 L30 40 L35 40 L38 43 L40 45 L42 48 L45 50"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Left Fingers */}
      <path
        d="M30 40 L30 35 M35 40 L35 33 M38 43 L38 37"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Right Hand */}
      <path
        d="M75 55 L75 45 L70 40 L65 40 L62 43 L60 45 L58 48 L55 50"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right Fingers */}
      <path
        d="M70 40 L70 35 M65 40 L65 33 M62 43 L62 37"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Connecting Hands -握手部分 */}
      <ellipse
        cx="50"
        cy="50"
        rx="8"
        ry="6"
        fill="white"
        opacity="0.9"
      />

      {/* Heart Symbol */}
      <path
        d="M50 65 L45 60 Q42 57 42 54 Q42 51 44 49 Q46 47 48 49 L50 51 L52 49 Q54 47 56 49 Q58 51 58 54 Q58 57 55 60 Z"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}