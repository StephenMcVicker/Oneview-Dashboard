import { PatientDirectory } from "@/components/PatientDirectory"

export default function App() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>

      <PatientDirectory />
    </div>
  )
}