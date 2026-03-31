import { useEffect, useState } from "react"
import { useAsync } from "@/hooks/useAsync"
import { useDebounce } from "@/hooks/useDebounce"
import { searchPatients } from "@/api/mockApi"
import { usePatientStore } from "@/store/usePatientStore"
import { PatientSearch } from "@/components/PatientSearch"
import { PatientTable } from "@/components/PatientTable"
import { PatientDetailsPanel } from "@/components/PatientDetailsPanel"

const SEARCH_DEBOUNCE_MS = 300

export function PatientDirectory() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS)
  const { data, loading, error, execute } = useAsync(searchPatients)
  const selectedPatientId = usePatientStore((s) => s.selectedPatientId)
  const setSelectedPatientId = usePatientStore((s) => s.setSelectedPatientId)

  useEffect(() => {
    void execute(debouncedQuery)
  }, [debouncedQuery, execute])

  return (
    <div className="space-y-6">
      <PatientSearch
        query={query}
        onQueryChange={setQuery}
        loading={loading}
        error={error}
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-700">Patients</h2>
          <PatientTable
            patients={data ?? []}
            selectedPatientId={selectedPatientId}
            onSelectPatient={setSelectedPatientId}
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-700">Details</h2>
          <PatientDetailsPanel />
        </div>
      </div>
    </div>
  )
}
