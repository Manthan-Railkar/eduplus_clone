import ModuleCard from './ModuleCard'
import './ModuleGrid.css'

function ModuleGrid({ modules = [] }) {
  if (modules.length === 0) {
    return (
      <div className="module-grid-empty" role="status">
        <p className="module-grid-empty__text">No modules match your search query.</p>
      </div>
    )
  }

  return (
    <div className="module-grid" role="list" aria-label="Student Portal Modules">
      {modules.map((module) => (
        <div key={module.id} className="module-grid__item" role="listitem">
          <ModuleCard module={module} />
        </div>
      ))}
    </div>
  )
}

export default ModuleGrid
