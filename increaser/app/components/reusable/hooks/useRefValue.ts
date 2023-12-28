import { RefObject, useEffect, useState } from 'react'

export function useRefValue<T>(ref: RefObject<T>) {
  const value = ref.current
  const [state, setState] = useState(value)

  useEffect(() => {
    setState(value)
  }, [value])

  return state
}
