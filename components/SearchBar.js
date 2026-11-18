const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <label htmlFor="property-search" className="search-label">
      Search properties by name
    </label>
    <input
      id="property-search"
      className="search-input"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by property name"
      autoComplete="off"
    />
  </div>
)

export default SearchBar
