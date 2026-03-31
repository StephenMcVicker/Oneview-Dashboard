/** Branded id so selection/API boundaries do not accept arbitrary strings. */
export type PatientId = string & { readonly __brand: "PatientId" }

export function patientId(value: string): PatientId {
  return value as PatientId
}

export type Patient = {
  id: PatientId
  name: string
  room: string
}

export type PatientDetails = {
  id: PatientId
  meals: string[]
  tasks: string[]
  notes: string
}