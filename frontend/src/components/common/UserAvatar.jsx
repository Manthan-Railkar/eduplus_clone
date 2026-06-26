import './UserAvatar.css'

function UserAvatar({ initials = 'U', onClick, title = 'User menu' }) {
  return (
    <button
      className="user-avatar"
      onClick={onClick}
      title={title}
      aria-label={title}
      id="user-avatar-button"
    >
      <span className="user-avatar__initials">{initials}</span>
    </button>
  )
}

export default UserAvatar
