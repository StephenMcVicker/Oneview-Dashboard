import { patientId, type Patient, type PatientDetails } from "../types/patient"

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms))

const patients: Patient[] = [
  { id: patientId("1"), name: "John Doe", room: "101" },
  { id: patientId("2"), name: "Jane Smith", room: "102" },
  { id: patientId("3"), name: "Michael Brown", room: "103" },
]

export async function searchPatients(query: string): Promise<Patient[]> {
  await delay(Math.random() * 1000)

  if (Math.random() < 0.2) {
    throw new Error("Network error")
  }

  return patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getPatientDetails(
  id: PatientDetails["id"]
): Promise<PatientDetails> {
  await delay(Math.random() * 1000)

  return {
    id,
    meals: ["Breakfast", "Lunch", "Dinner"],
    tasks: ["Medication", "Vitals Check"],
    notes: "Patient recovering well.",
  }
}