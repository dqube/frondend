export function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bag body */}
      <rect x="4" y="14" width="28" height="18" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="4" y="14" width="28" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      {/* Bag handle */}
      <path d="M12 14V11C12 7.686 14.686 5 18 5C21.314 5 24 7.686 24 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Leaf / fresh accent */}
      <path d="M15 24C15 24 16 20 20 19C20 19 19 23 15 24Z" fill="currentColor" />
      <path d="M21 24C21 24 20 20 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
