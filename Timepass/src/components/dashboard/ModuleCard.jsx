import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ModuleCard.css'

function ModuleCard({ module }) {
  const [imgError, setImgError] = useState(false)
  const isHighlighted = module.id === 'exam-form'
  const navigate = useNavigate()

  const handleClick = () => {
    if (module.route) {
      navigate(module.route)
    }
  }

  return (
    <button
      className={`module-card ${isHighlighted ? 'module-card--highlighted' : ''}`}
      id={`module-${module.id}`}
      aria-label={`Open ${module.title} module: ${module.description}`}
      onClick={handleClick}
    >
      {/* Background gradient */}
      <div
        className="module-card__bg-gradient"
        style={{ background: module.gradient }}
      />

      {/* Title at the top */}
      <span className="module-card__title">{module.title}</span>

      {/* Centered icon circle */}
      <div className="module-card__icon-container">
        <div className={`module-card__icon-circle ${isHighlighted ? 'module-card__icon-circle--highlighted' : ''}`}>
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
