import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAsync } from './useAsync'

describe('useAsync', () => {
  it('exposes loading then data after a successful call', async () => {
    const asyncFn = vi.fn().mockResolvedValue({ ok: true })
    const { result } = renderHook(() => useAsync(asyncFn))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()

    let executePromise: Promise<unknown>
    act(() => {
      executePromise = result.current.execute()
    })

    expect(result.current.loading).toBe(true)
    await act(async () => {
      await executePromise!
    })

    expect(asyncFn).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.data).toEqual({ ok: true })
    expect(result.current.error).toBeNull()
  })

  it('sets error when the async function rejects', async () => {
    const err = new Error('failed')
    const asyncFn = vi.fn().mockRejectedValue(err)
    const { result } = renderHook(() => useAsync(asyncFn))

    await act(async () => {
      await expect(result.current.execute()).rejects.toThrow('failed')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    expect(result.current.data).toBeNull()
    expect(result.current.error?.message).toBe('failed')
  })

  it('ignores an older request when a newer one finishes first', async () => {
    let finishSlow!: (value: string) => void
    let finishFast!: (value: string) => void
    const slow = new Promise<string>((r) => {
      finishSlow = r
    })
    const fast = new Promise<string>((r) => {
      finishFast = r
    })
    const asyncFn = vi
      .fn()
      .mockImplementationOnce(() => slow)
      .mockImplementationOnce(() => fast)

    const { result } = renderHook(() => useAsync(asyncFn))

    act(() => {
      void result.current.execute()
    })
    act(() => {
      void result.current.execute()
    })

    await act(async () => {
      finishFast('newer')
    })
    await act(async () => {
      finishSlow('older')
    })

    expect(result.current.data).toBe('newer')
  })
})
