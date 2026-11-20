import { useState } from "react"
import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ properties }) => {
  const [query, setQuery] = useState("")
  const trimmedQuery = query.trim()
  const normalizedQuery = trimmedQuery.toLowerCase()
  const filteredProperties = properties
    ? properties.filter((property) =>
        (property.title || "").toLowerCase().includes(normalizedQuery)
      )
    : []
  const hasNoResults = trimmedQuery !== "" && filteredProperties.length === 0

  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="search">
              <label htmlFor="property-search" className="sr-only">
                Search places by title
              </label>
              <input
                id="property-search"
                type="search"
                className="search-input"
                placeholder="Search places by title"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="search-status" aria-live="polite" role="status">
              {hasNoResults && (
                <p className="no-results">
                  No places match “{trimmedQuery}”. Try a different title or
                  clear the search.
                </p>
              )}
            </div>
            <div className="feed">
              {filteredProperties.map((property) => (
                <Link
                  key={property._id}
                  href={`property/${property.slug.current}`}
                >
                  <div className="card">
                    <img src={urlFor(property.mainImage)} />
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>£{property.pricePerNight}/per Night</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default Home
