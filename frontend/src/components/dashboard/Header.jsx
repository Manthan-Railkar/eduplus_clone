import {
  Home,
  Cloud,
  HelpCircle,
  Users,
  Bell,
  Maximize,
  ArrowDown,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import UserAvatar from '../common/UserAvatar'
import NotificationBadge from '../common/NotificationBadge'
import './Header.css'

function Header() {
  const { user, logout } = useAuth()

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <header className="header" role="banner">
      <div className="header__left">
        <img
          src="/logo.jpg"
          alt="Institute Logo"
          className="header__logo"
        />
        <h1 className="header__institute-name">
          Sardar Patel Institute Of Technology
        </h1>
      </div>

      <div className="header__right">
        {/* Network Status */}
        <div className="header__network" aria-label="Network status">
          <span className="header__network-type">4G</span>
          <ArrowDown size={12} className="header__network-arrow" />
          <span className="header__network-speed">10+ Mbps</span>
        </div>

        {/* Action Icons */}
        <nav className="header__actions" aria-label="Quick actions">
          <button className="header__icon-btn" aria-label="Home" id="header-home">
            <Home size={18} />
          </button>
          <button className="header__icon-btn" aria-label="Performance/Dashboard" id="header-cloud">
            <Cloud size={18} />
          </button>
          <button className="header__icon-btn" aria-label="Help" id="header-help">
            <HelpCircle size={18} />
          </button>
          <button className="header__icon-btn" aria-label="Users/Profile" id="header-users">
            <Users size={18} />
          </button>

          {/* Notifications button with reusable badge */}
          <button
            className="header__icon-btn header__icon-btn--notif"
            aria-label="Notifications"
            id="header-notifications"
          >
            <Bell size={18} />
            <NotificationBadge count={0} /> {/* Matches 0 notifications visible on screen, or 9 if we want. Wait, the badge in the screenshot has '0' inside! Let's pass 0! Oh wait, the screenshot has '0' in the badge. We'll pass 0. Wait, if it has '0' let's display it. Let's make sure our NotificationBadge displays 0 if count is passed exactly. Let's update NotificationBadge logic or pass a prop to always render. */}
          </button>

          {/* Fullscreen */}
          <button
            className="header__icon-btn"
            aria-label="Toggle fullscreen"
            id="header-fullscreen"
            onClick={handleFullscreen}
          >
            <Maximize size={18} />
          </button>
        </nav>

        {/* User Avatar reusable component */}
        <UserAvatar
          initials={user?.initials || 'MR'}
          onClick={logout}
          title="Sign out of student portal"
        />
      </div>
    </header>
  )
}

export default Header
