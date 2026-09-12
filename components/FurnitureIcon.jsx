// Simple line-art illustrations for each furniture category.
// Keeps the catalog visually consistent without depending on external photos.

export default function FurnitureIcon({ type, className }) {
  const common = {
    viewBox: '0 0 200 160',
    className,
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (type === 'bed') {
    return (
      <svg {...common}>
        <rect x="20" y="70" width="160" height="50" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="20" y="50" width="30" height="20" rx="4" fill="currentColor" opacity="0.15" />
        <line x1="20" y1="70" x2="20" y2="50" stroke="currentColor" strokeWidth="4" />
        <line x1="50" y1="70" x2="50" y2="50" stroke="currentColor" strokeWidth="4" />
        <rect x="20" y="50" width="30" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="26" y1="120" x2="26" y2="135" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <line x1="174" y1="120" x2="174" y2="135" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M20 90 Q55 78 90 90 T160 90" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.5" />
      </svg>
    )
  }

  if (type === 'almirah') {
    return (
      <svg {...common}>
        <rect x="45" y="20" width="110" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="100" y1="20" x2="100" y2="140" stroke="currentColor" strokeWidth="4" />
        <circle cx="90" cy="80" r="3" fill="currentColor" />
        <circle cx="110" cy="80" r="3" fill="currentColor" />
        <rect x="55" y="30" width="35" height="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <rect x="110" y="30" width="35" height="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      </svg>
    )
  }

  // dressing-table
  return (
    <svg {...common}>
      <rect x="70" y="15" width="60" height="70" rx="30" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="100" y1="85" x2="100" y2="100" stroke="currentColor" strokeWidth="4" />
      <rect x="40" y="100" width="120" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="90" y1="100" x2="90" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="110" y1="100" x2="110" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="48" y1="130" x2="48" y2="145" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="152" y1="130" x2="152" y2="145" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
