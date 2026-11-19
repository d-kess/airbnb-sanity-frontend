export const isMultiple = (value) => (value === 0 || value > 1 ? "s" : "")

// Case-insensitive title filter. A blank query returns every property.
export const filterPropertiesByTitle = (properties, query) => {
  const list = properties || []
  const needle = (query || "").trim().toLowerCase()
  if (!needle) return list
  return list.filter((property) =>
    (property.title || "").toLowerCase().includes(needle)
  )
}
