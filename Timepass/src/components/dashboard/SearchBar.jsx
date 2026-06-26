import { Search } from 'lucide-react'
import './SearchBar.css'

function SearchBar({ value, onChange, placeholder = 'Search Module' }) {
  return (
    <div className="search-bar" role="search" aria-label="Search modules">
      <div className="search-bar__wrapper">
        <input
          id="module-search"
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        <span className="search-bar__icon">
          <Search size={18} strokeWidth={1.8} />
        </span>
      </div>
    </div>
  )
}

export default SearchBar
