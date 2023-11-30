import { useApi } from 'api/hooks/useApi'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Set } from 'sets/Set'

interface Props {
  set: Set
  onSuccess: () => void
}

export const SyncSet = ({ set, onSuccess }: Props) => {
  const api = useApi()

  const { mutate: syncSet } = useMutation(
    async () => {
      await api.call('addSet', set)
    },
    {
      onSuccess,
      retry: true,
    },
  )

  useEffect(() => {
    syncSet()
  }, [syncSet])

  return null
}
