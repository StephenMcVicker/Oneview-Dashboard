import { PatientSearch } from "@/components/PatientSearch"

export default function App() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Patient Dashboard
      </h1>

      <PatientSearch />
    </div>
  )
}