import { useState, useEffect } from "react"
import { useAsync } from "@/hooks/useAsync"
import { searchPatients } from "@/api/mockApi"

export function PatientSearch() {
  const [query, setQuery] = useState("")
  const { data, loading, error, execute } = useAsync(searchPatients)

  useEffect(() => {
    void execute("")
  }, [execute])

  return (
    <div className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Search patients..."
        value={query}
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)
          execute(value)
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error.message}</p>}

      <ul>
        {data?.map((p) => (
          <li key={p.id}>
            {p.name} - Room {p.room}
          </li>
        ))}
      </ul>
    </div>
  )
}