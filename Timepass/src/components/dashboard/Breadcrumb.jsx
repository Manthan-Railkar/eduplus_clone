import { Home } from 'lucide-react'
import './Breadcrumb.css'

function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <a href="/dashboard" className="breadcrumb__link breadcrumb__link--home">
            <Home size={14} strokeWidth={2.2} />
            <span>Home</span>
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb__item">
            <span className="breadcrumb__separator">/</span>
            {item.href ? (
              <a href={item.href} className="breadcrumb__link">
                {item.label}
              </a>
            ) : (
              <span className="breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
