import { useState, useCallback, useRef } from "react"

type AsyncState<T> = {
  data: T | null
  error: Error | null
  loading: boolean
}

export function useAsync<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  })

  const requestIdRef = useRef(0)

  const execute = useCallback(async (...args: Args) => {
    const requestId = ++requestIdRef.current

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }))

    try {
      const result = await asyncFn(...args)

      if (requestId === requestIdRef.current) {
        setState({
          data: result,
          error: null,
          loading: false,
        })
      }

      return result
    } catch (error) {
      if (requestId === requestIdRef.current) {
        setState({
          data: null,
          error: error as Error,
          loading: false,
        })
      }

      throw error
    }
  }, [asyncFn])

  return {
    ...state,
    execute,
  }
}