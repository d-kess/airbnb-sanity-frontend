import test from "node:test"
import assert from "node:assert/strict"
import { filterPropertiesByTitle } from "./utils.js"

const properties = [
  { _id: "1", title: "Cozy Cabin in the Woods" },
  { _id: "2", title: "Beach House" },
  { _id: "3", title: "Downtown LOFT" },
  { _id: "4" },
]

test("matches titles case-insensitively", () => {
  assert.deepEqual(
    filterPropertiesByTitle(properties, "loft").map((p) => p._id),
    ["3"]
  )
  assert.deepEqual(
    filterPropertiesByTitle(properties, "CABIN").map((p) => p._id),
    ["1"]
  )
})

test("matches substrings and ignores surrounding whitespace", () => {
  assert.deepEqual(
    filterPropertiesByTitle(properties, "  house ").map((p) => p._id),
    ["2"]
  )
})

test("blank query returns everything", () => {
  assert.equal(filterPropertiesByTitle(properties, "").length, 4)
  assert.equal(filterPropertiesByTitle(properties, "   ").length, 4)
  assert.equal(filterPropertiesByTitle(properties, undefined).length, 4)
})

test("no match returns an empty list; missing input is safe", () => {
  assert.deepEqual(filterPropertiesByTitle(properties, "castle"), [])
  assert.deepEqual(filterPropertiesByTitle(undefined, "x"), [])
})
