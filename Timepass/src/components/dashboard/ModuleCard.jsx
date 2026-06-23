import { useState } from 'react'
import './ModuleCard.css'

function ModuleCard({ module }) {
  const [imgError, setImgError] = useState(false)
  const isPtg = module.id === 'ptg'

  return (
    <button
      className={`module-card ${isPtg ? 'module-card--ptg' : ''}`}
      id={`module-${module.id}`}
      aria-label={`Open ${module.title} module: ${module.description}`}
    >
      {/* Background gradient at the top, leaving white curves at bottom */}
      <div
        className="module-card__bg-gradient"
        style={{ background: module.gradient }}
      />

      {/* Title at the top */}
      <span className="module-card__title">{module.title}</span>

      {/* Centered icon circle on the boundary line */}
      <div className="module-card__icon-container">
        <div className={`module-card__icon-circle ${isPtg ? 'module-card__icon-circle--ptg' : ''}`}>
          <div className="module-card__icon-inner">
            {!imgError ? (
              <img
                src={module.icon}
                alt={`${module.title} icon`}
                className="module-card__icon-img"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="module-card__icon-fallback">
                {module.title.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ModuleCard
