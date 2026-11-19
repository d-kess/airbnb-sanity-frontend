import { useState } from "react"
import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple, filterPropertiesByTitle } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ properties }) => {
  const [query, setQuery] = useState("")

  if (!properties) return null

  const filtered = filterPropertiesByTitle(properties, query)
  const trimmed = query.trim()
  const count = filtered.length

  let status = `${count} place${count === 1 ? "" : "s"} to stay`
  if (trimmed) {
    status = count
      ? `${count} place${count === 1 ? "" : "s"} match “${trimmed}”`
      : `No places match “${trimmed}”`
  }

  return (
    <div className="main">
      <div className="feed-container">
        <h1>Places to stay near you</h1>
        <form
          className="search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="property-search" className="search-label">
            Search places by title
          </label>
          <input
            id="property-search"
            className="search-input"
            type="search"
            name="q"
            value={query}
            placeholder="e.g. Cozy cabin"
            autoComplete="off"
            aria-controls="property-feed"
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
        <p className="search-status" role="status" aria-live="polite">
          {status}
        </p>
        <div className="feed" id="property-feed">
          {count === 0 ? (
            <div className="empty-state">
              <p>
                {trimmed
                  ? "Try a different word, or check the spelling."
                  : "There are no places to show yet."}
              </p>
              {trimmed && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setQuery("")}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filtered.map((property) => (
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
            ))
          )}
        </div>
      </div>
      <div className="map">
        <DashboardMap properties={filtered} />
      </div>
    </div>
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
