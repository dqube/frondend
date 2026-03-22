export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded square background */}
      <rect x="2" y="2" width="36" height="36" rx="10" fill="currentColor" opacity="0.12" />

      {/* Shopping bag body */}
      <path
        d="M10 16C10 14.8954 10.8954 14 12 14H28C29.1046 14 30 14.8954 30 16V30C30 32.2091 28.2091 34 26 34H14C11.7909 34 10 32.2091 10 30V16Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M10 16C10 14.8954 10.8954 14 12 14H28C29.1046 14 30 14.8954 30 16V30C30 32.2091 28.2091 34 26 34H14C11.7909 34 10 32.2091 10 30V16Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      {/* Bag handle */}
      <path
        d="M15 14V11C15 8.23858 17.2386 6 20 6C22.7614 6 25 8.23858 25 11V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Leaf accent — organic / fresh feel */}
      <path
        d="M17 27C17 27 18.5 21.5 23 20C23 20 22 26 17 27Z"
        fill="currentColor"
      />
      <path
        d="M17 27C18.5 24.5 21 22 23 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Small second leaf */}
      <path
        d="M21 25C21 25 19 22 20.5 19.5C20.5 19.5 22.5 22 21 25Z"
        fill="currentColor"
        opacity="0.5"
      />
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
      <rect x="2" y="2" width="36" height="36" rx="10" fill="currentColor" />
      <path
        d="M12 18C12 16.8954 12.8954 16 14 16H26C27.1046 16 28 16.8954 28 18V28C28 30.2091 26.2091 32 24 32H16C13.7909 32 12 30.2091 12 28V18Z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M16 16V13C16 10.7909 17.7909 9 20 9C22.2091 9 24 10.7909 24 13V16"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M18 26C18 26 19 22 22 21C22 21 21.5 25.5 18 26Z"
        fill="white"
        opacity="0.7"
      />
    </svg>
  );
}
