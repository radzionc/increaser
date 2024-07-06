import { useTrackTime } from './state/TrackTimeContext'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

import { useMemo } from 'react'

export const TrackTimeTitle = () => {
  const { currentSet } = useTrackTime()
  const title = useMemo(() => {
    if (!currentSet) {
      return 'Manage sessions'
    }
    if (currentSet.index !== undefined) {
      return 'Edit session'
    }

    return 'Add a session'
  }, [currentSet])

  return <SectionTitle>{title}</SectionTitle>
}
