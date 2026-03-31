type PatientSearchProps = {
  query: string
  onQueryChange: (query: string) => void
  loading: boolean
  error: Error | null
}

export function PatientSearch({
  query,
  onQueryChange,
  loading,
  error,
}: PatientSearchProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="patient-search" className="sr-only">
        Search patients
      </label>
      <input
        id="patient-search"
        className="border p-2 w-full rounded"
        placeholder="Search patients..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        autoComplete="off"
      />
      {loading && <p className="text-sm text-neutral-600">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
