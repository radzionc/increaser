import { useEffect } from 'react'
import { useUserQuery } from './queries/useUserQuery'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { UserTracker } from './UserTracker'

export const UserManager = () => {
  const { dataUpdatedAt, refetch } = useUserQuery()

  const dayStartedAt = useStartOfDay()

  useEffect(() => {
    if (dataUpdatedAt && dataUpdatedAt < dayStartedAt) {
      refetch()
    }
  }, [dataUpdatedAt, dayStartedAt, refetch])

  useEffect(() => {
    refetch()
  }, [refetch])

  return <UserTracker />
}
