import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the current value on first render', () => {
    const { result } = renderHook(() => useDebounce('alpha', 300))
    expect(result.current).toBe('alpha')
  })

  it('delays updates until the debounce period elapses', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    )

    rerender({ value: 'second', delay: 300 })
    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe('second')
  })
})
