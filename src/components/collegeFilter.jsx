"use client"

import { useState } from "react"
import colleges from "@/data/colleges.json" 
export default function CollegeFilter({ onSelect }) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(null)

  const filtered = colleges.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (college) => {
    setSelected(college)
    onSelect(college)
  }

  return (
    <div className="max-w-md mb-6">
      <input
        type="text"
        placeholder="Search college..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
      />

      <ul className="max-h-48 overflow-y-auto border rounded-lg divide-y mt-2">
        {filtered.map((c) => (
          <li
            key={c.id}
            onClick={() => handleSelect(c.name)}
            className={`px-3 py-2 cursor-pointer hover:bg-purple-100 ${
              selected === c.name ? "bg-purple-200 font-medium" : ""
            }`}
          >
            {c.name}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-3 py-2 text-gray-500">No results</li>
        )}
      </ul>
    </div>
  )
}
