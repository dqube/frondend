export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Primary colour solid background */}
      <rect width="40" height="40" rx="10" fill="currentColor" />

      {/* Letter M — bold, centred, white */}
      <text
        x="20"
        y="28"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="white"
        letterSpacing="-1"
      >
        M
      </text>
    </svg>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Primary colour solid background */}
      <rect width="40" height="40" rx="10" fill="currentColor" />

      {/* Letter M — slightly smaller for compact mark */}
      <text
        x="20"
        y="28"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="white"
        letterSpacing="-1"
      >
        M
      </text>
    </svg>
  );
}
