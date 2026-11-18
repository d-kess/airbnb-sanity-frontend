const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <label htmlFor="property-search" className="search-label">
        Search properties by name
      </label>
      <input
        id="property-search"
        type="search"
        className="search-input"
        placeholder="Search by property name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
