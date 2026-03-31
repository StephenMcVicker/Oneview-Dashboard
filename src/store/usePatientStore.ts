import { create } from "zustand"

import type { PatientId } from "@/types/patient"

type PatientStore = {
  selectedPatientId: PatientId | null
  setSelectedPatientId: (id: PatientId | null) => void
}

export const usePatientStore = create<PatientStore>((set) => ({
  selectedPatientId: null,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
}))