import { useState } from "react"
import SearchBar from "../components/SearchBar"
import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ properties }) => {
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()
  const filteredProperties = properties
    ? properties.filter((property) =>
        (property.title || "").toLowerCase().includes(normalizedQuery)
      )
    : []

  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <SearchBar value={query} onChange={setQuery} />
            <div className="feed">
              {filteredProperties.length === 0 && (
                <p className="no-results">No properties found</p>
              )}
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
            <DashboardMap
              properties={
                filteredProperties.length ? filteredProperties : properties
              }
            />
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
