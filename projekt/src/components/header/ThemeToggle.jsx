import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
      className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      style={{
        backgroundColor: isDark ? 'var(--accent)' : 'var(--border)',
        focusRingOffsetColor: 'var(--bg-page)',
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-transform duration-300"
        style={{
          backgroundColor: 'var(--bg-page)',
          transform: isDark ? 'translateX(24px)' : 'translateX(0)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
