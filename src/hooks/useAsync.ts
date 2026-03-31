import { useState, useCallback } from "react"

type AsyncState<T> = {
  data: T| null
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

  const execute = useCallback(async (...args: Args) => {
    setState({ data: null, error: null, loading: true })
    try {
      const results = await asyncFn(...args)
      setState(
        { data: results,
          error: null,
          loading: false }
      )
      return results
    } catch (error) {
      setState(
        { data: null,
          error: error as Error,
          loading: false })
      throw error
    }
  }, [asyncFn])

  return {
    ...state,
    execute,
  }
}