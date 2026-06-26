import './NotificationBadge.css'

function NotificationBadge({ count = 0 }) {
  if (count < 0) return null

  const displayCount = count > 99 ? '99+' : count

  return (
    <span className="notif-badge" aria-label={`${count} notifications`}>
      {displayCount}
    </span>
  )
}

export default NotificationBadge
