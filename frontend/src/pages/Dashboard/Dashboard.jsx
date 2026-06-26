import { useState, useMemo } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import SearchBar from '../../components/dashboard/SearchBar'
import ModuleGrid from '../../components/dashboard/ModuleGrid'
import { MODULES_CONFIG } from '../../constants/modules'

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  // Real-time client-side filter
  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return MODULES_CONFIG

    return MODULES_CONFIG.filter((mod) =>
      mod.title.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <DashboardLayout>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <ModuleGrid modules={filteredModules} />
    </DashboardLayout>
  )
}

export default Dashboard
