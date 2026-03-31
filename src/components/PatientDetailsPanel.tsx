import { useEffect } from "react"
import { useAsync } from "@/hooks/useAsync"
import { getPatientDetails } from "@/api/mockApi"
import { usePatientStore } from "@/store/usePatientStore"

export function PatientDetailsPanel() {
  const selectedPatientId = usePatientStore((s) => s.selectedPatientId)
  const { data, loading, error, execute } = useAsync(getPatientDetails)

  useEffect(() => {
    if (!selectedPatientId) return
    void execute(selectedPatientId)
  }, [selectedPatientId, execute])

  if (!selectedPatientId) {
    return (
      <div className="border rounded p-6 text-sm text-neutral-600 text-center">
        Select a patient from the table to view details.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="border rounded p-6 text-sm text-neutral-600">
        Loading details...
      </div>
    )
  }

  if (error) {
    return (
      <div className="border rounded p-6 text-sm text-red-600">
        {error.message}
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="border rounded p-4 space-y-4 text-sm">
      <h2 className="font-semibold text-base">Patient details</h2>
      <div>
        <h3 className="font-medium text-neutral-700 mb-1">Meals</h3>
        <ul className="list-disc list-inside text-neutral-800">
          {data.meals.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium text-neutral-700 mb-1">Tasks</h3>
        <ul className="list-disc list-inside text-neutral-800">
          {data.tasks.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium text-neutral-700 mb-1">Notes</h3>
        <p className="text-neutral-800 whitespace-pre-wrap">{data.notes}</p>
      </div>
    </div>
  )
}
