import { useState, useMemo } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Breadcrumb from '../../components/dashboard/Breadcrumb'
import SearchBar from '../../components/dashboard/SearchBar'
import ModuleGrid from '../../components/dashboard/ModuleGrid'
import { EXAMINATION_MODULES } from '../../constants/examination'

function Examination() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return EXAMINATION_MODULES

    return EXAMINATION_MODULES.filter((mod) =>
      mod.title.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <DashboardLayout>
      <Breadcrumb items={[{ label: 'Examination' }]} />
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Link"
      />
      <ModuleGrid modules={filteredModules} />
    </DashboardLayout>
  )
}

export default Examination
