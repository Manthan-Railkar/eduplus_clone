import { useAuth } from '../../context/AuthContext'
import './ProfileBar.css'

function ProfileBar() {
  const { user } = useAuth()

  return (
    <div className="profile-bar" role="complementary" aria-label="Student profile">
      <div className="profile-bar__inner">
        {/* Student Avatar */}
        <div className="profile-bar__avatar-wrap">
          <img
            src={user?.avatar || '/student-profile.png'}
            alt={user?.name || 'Student'}
            className="profile-bar__avatar"
            onError={(e) => {
              /* Fallback to initials if image fails */
              e.target.style.display = 'none'
              e.target.parentElement.classList.add('profile-bar__avatar-wrap--fallback')
            }}
          />
          <span className="profile-bar__avatar-fallback">
            {user?.initials || 'MR'}
          </span>
        </div>

        {/* Student Name in UPPERCASE */}
        <span className="profile-bar__name">
          {user?.name ? user.name.toUpperCase() : 'STUDENT'}
        </span>

        {/* Active Status Pill */}
        <span className="profile-bar__status">
          <span className="profile-bar__status-dot" />
          {user?.status || 'Active'}
        </span>

        {/* Registration Number */}
        <span className="profile-bar__reg">
          Registration No: {user?.registrationNo || '2025800102'}
        </span>

        {/* Course details */}
        <span className="profile-bar__course">
          {user?.course || 'B.Tech. Computer Science And Engineering'}
        </span>
      </div>
    </div>
  )
}

export default ProfileBar
