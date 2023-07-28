import { useMainApi } from 'api/hooks/useMainApi'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Set } from 'sets/Set'

interface Props {
  set: Set
  onSuccess: () => void
}

const createSetMutation = `
mutation addSet($set: SetInput!) {
  addSet(set: $set)
}
`

export const SyncSet = ({ set, onSuccess }: Props) => {
  const { query } = useMainApi()

  const { mutate: syncSet } = useMutation(
    async () => {
      await query({
        query: createSetMutation,
        variables: {
          set,
        },
      })
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
