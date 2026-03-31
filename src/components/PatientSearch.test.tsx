import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PatientSearch } from './PatientSearch'

function PatientSearchHarness() {
  const [query, setQuery] = useState('')
  return (
    <PatientSearch
      query={query}
      onQueryChange={setQuery}
      loading={false}
      error={null}
    />
  )
}

describe('PatientSearch', () => {
  it('reflects the controlled query value', () => {
    render(
      <PatientSearch
        query="ada"
        onQueryChange={vi.fn()}
        loading={false}
        error={null}
      />
    )
    expect(screen.getByRole('textbox')).toHaveValue('ada')
  })

  it('updates the query as the user types (controlled)', async () => {
    const user = userEvent.setup()
    render(<PatientSearchHarness />)

    await user.type(screen.getByRole('textbox'), 'jo')
    expect(screen.getByRole('textbox')).toHaveValue('jo')
  })

  it('shows loading and error feedback', () => {
    const { rerender } = render(
      <PatientSearch
        query=""
        onQueryChange={vi.fn()}
        loading={true}
        error={null}
      />
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    rerender(
      <PatientSearch
        query=""
        onQueryChange={vi.fn()}
        loading={false}
        error={new Error('Network down')}
      />
    )
    expect(screen.getByText('Network down')).toBeInTheDocument()
  })
})
