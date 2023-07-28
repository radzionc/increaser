import { useProjects } from 'projects/hooks/useProjects'
import { DayProjects } from 'sets/components/DailyReport/DayProjects'
import { MinimalisticTimeline } from 'sets/components/MinimalisticTimeline'
import { getDaySets } from 'sets/helpers/getDaySets'
import { getYesterday } from 'shared/utils/getYesterday'
import { VStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'

import { DayVolumeAnalytics } from './DayVolumeAnalytics'

export const YesterdayPerformance = () => {
  const yesterday = getYesterday()
  const { sets } = useAssertUserState()
  const { projectsRecord } = useProjects()

  const yesterdaySets = getDaySets(sets, yesterday.getTime())

  if (!yesterdaySets.length) {
    return null
  }

  return (
    <VStack gap={12}>
      <DayVolumeAnalytics sets={yesterdaySets} />
      <MinimalisticTimeline sets={yesterdaySets} />
      <VStack gap={8}>
        <DayProjects sets={yesterdaySets} projectsRecord={projectsRecord} />
      </VStack>
    </VStack>
  )
}
