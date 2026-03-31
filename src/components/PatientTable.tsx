import type { Patient, PatientId } from "@/types/patient"

type PatientTableProps = {
  patients: Patient[]
  selectedPatientId: PatientId | null
  onSelectPatient: (id: PatientId) => void
}

export function PatientTable({
  patients,
  selectedPatientId,
  onSelectPatient,
}: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <p className="text-sm text-neutral-600 py-4 text-center border rounded">
        No patients match your search.
      </p>
    )
  }

  return (
    <div className="border rounded overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-100 border-b">
          <tr>
            <th className="p-3 font-medium" scope="col">
              Name
            </th>
            <th className="p-3 font-medium" scope="col">
              Room
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => {
            const selected = p.id === selectedPatientId
            return (
              <tr
                key={p.id}
                onClick={() => onSelectPatient(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSelectPatient(p.id)
                  }
                }}
                tabIndex={0}
                className={[
                  "cursor-pointer border-b last:border-b-0 outline-none",
                  selected
                    ? "bg-blue-50 ring-2 ring-inset ring-blue-300"
                    : "hover:bg-neutral-50",
                ].join(" ")}
              >
                <td className="p-3">{p.name}</td>
                <td className="p-3 tabular-nums">{p.room}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
