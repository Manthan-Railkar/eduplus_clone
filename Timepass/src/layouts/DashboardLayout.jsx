import Header from '../components/dashboard/Header'
import ProfileBar from '../components/dashboard/ProfileBar'
import './DashboardLayout.css'

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {/* Fixed Header */}
      <Header />

      {/* Fixed Profile Bar */}
      <ProfileBar />

      {/* Main Content Area */}
      <main className="dashboard-layout__content" role="main">
        <div className="dashboard-layout__inner">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
