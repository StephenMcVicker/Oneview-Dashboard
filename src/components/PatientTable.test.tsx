import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PatientTable } from './PatientTable'
import { patientId } from '@/types/patient'

const samplePatients = [
  { id: patientId('1'), name: 'John Doe', room: '101' },
  { id: patientId('2'), name: 'Jane Smith', room: '102' },
]

describe('PatientTable', () => {
  it('shows an empty state when there are no patients', () => {
    render(
      <PatientTable
        patients={[]}
        selectedPatientId={null}
        onSelectPatient={vi.fn()}
      />
    )
    expect(
      screen.getByText('No patients match your search.')
    ).toBeInTheDocument()
  })

  it('renders patient rows and notifies on row click', async () => {
    const user = userEvent.setup()
    const onSelectPatient = vi.fn()
    render(
      <PatientTable
        patients={samplePatients}
        selectedPatientId={null}
        onSelectPatient={onSelectPatient}
      />
    )

    expect(screen.getByRole('cell', { name: 'John Doe' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '102' })).toBeInTheDocument()

    await user.click(screen.getByRole('row', { name: /John Doe/ }))
    expect(onSelectPatient).toHaveBeenCalledWith(samplePatients[0].id)
  })

  it('selects a row with Enter when focused', async () => {
    const user = userEvent.setup()
    const onSelectPatient = vi.fn()
    render(
      <PatientTable
        patients={samplePatients}
        selectedPatientId={null}
        onSelectPatient={onSelectPatient}
      />
    )

    const row = screen.getByRole('row', { name: /Jane Smith/ })
    row.focus()
    await user.keyboard('{Enter}')
    expect(onSelectPatient).toHaveBeenCalledWith(samplePatients[1].id)
  })
})
