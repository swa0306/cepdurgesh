import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  ArrowUpRight, BookOpenText, ChartNoAxesCombined, House, Info, Leaf, Menu,
  Moon, Recycle, Sun, TriangleAlert, UsersRound,
} from 'lucide-react'
import { StateSwitcher } from './StateSwitcher'
import { cn } from './ui/utils'

const routes = [
  { to: '/', label: 'Overview', icon: House, end: true },
  { to: '/classify', label: 'Classify waste', icon: Recycle },
  { to: '/dashboard', label: 'Community', icon: ChartNoAxesCombined },
  { to: '/survey', label: 'Survey', icon: UsersRound },
  { to: '/report', label: 'Report an issue', icon: TriangleAlert },
  { to: '/awareness', label: 'Sorting guide', icon: BookOpenText },
  { to: '/about', label: 'About project', icon: Info },
]

type ThemeMode = 'light' | 'dark' | 'system'

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  return mode
}

export function AppShell() {
  const location = useLocation()
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = window.localStorage.getItem('app-theme')
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system'
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const applyTheme = () => document.documentElement.dataset.theme = resolveTheme(themeMode)
    applyTheme()
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [themeMode])

  useEffect(() => setMobileOpen(false), [location.pathname])

  function cycleTheme() {
    const next: ThemeMode = themeMode === 'system' ? 'light' : themeMode === 'light' ? 'dark' : 'system'
    setThemeMode(next)
    window.localStorage.setItem('app-theme', next)
  }

  const activeTheme = resolveTheme(themeMode)

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className={cn('sidebar', mobileOpen && 'sidebar-mobile-open')}>
        <NavLink className="brand-lockup" to="/" aria-label="Campus Circularity home">
          <span className="brand-mark"><Leaf size={19} strokeWidth={2.2} /></span>
          <span><strong>Campus</strong><small>CIRCULARITY</small></span>
        </NavLink>
        <div className="campus-label">DYPCOEI · VARALE-TALEGAON</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {routes.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => cn('nav-link', isActive && 'nav-link-active')}>
              <Icon size={18} strokeWidth={1.8} /> <span>{label}</span>
              {to === '/classify' && <ArrowUpRight className="nav-trailing" size={14} />}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><span className="live-dot" /> Service status <strong>Not connected</strong></div>
          <p>AI &amp; Data Science<br />Academic year 2026–2027</p>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button className="mobile-menu button-icon" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMobileOpen((open) => !open)}>
            <Menu size={19} />
          </button>
          <div className="breadcrumb"><span>Campus workspace</span><span className="breadcrumb-divider">/</span><strong>{routes.find((route) => route.to === location.pathname)?.label ?? 'Overview'}</strong></div>
          <div className="topbar-actions">
            <span className="service-pill"><span className="status-dot" /> Offline mode</span>
            <button className="theme-toggle button-icon" type="button" onClick={cycleTheme} title={`Theme: ${themeMode}. Activate to change.`} aria-label={`Theme is ${themeMode}; switch theme`}>
              {activeTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>
        {mobileOpen && <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)} />}
        <main id="main-content" className="main-content" key={location.pathname}>
          <Outlet />
        </main>
        <footer className="site-footer">
          <span>Dr. D.Y. Patil College of Engineering &amp; Innovation</span>
          <span>Varale-Talegaon, Pune <span className="footer-separator">·</span> 2026–2027</span>
        </footer>
      </div>
      <StateSwitcher />
    </div>
  )
}