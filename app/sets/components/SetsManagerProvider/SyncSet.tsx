import { graphql } from '@increaser/api-interface/client'
import { useApi } from 'api/useApi'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Set } from 'sets/Set'

interface Props {
  set: Set
  onSuccess: () => void
}

const createSetMutationDocument = graphql(`
  mutation addSet($set: SetInput!) {
    addSet(set: $set)
  }
`)

export const SyncSet = ({ set, onSuccess }: Props) => {
  const { query } = useApi()

  const { mutate: syncSet } = useMutation(
    async () => {
      await query(createSetMutationDocument, {
        set,
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
