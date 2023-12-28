import { DayAverage } from '@increaser/app/projects/components/ProjectsAnalytics/DayAverage'
import { ProjectsCurrentWeek } from '@increaser/app/projects/components/ProjectsAnalytics/ProjectsCurrentWeek'
import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'
import { useCurrentWeekSets } from '@increaser/app/sets/hooks/useCurrentWeekSets'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { MS_IN_MIN } from '@lib/utils/time'

import { CurrentWeekDistribution } from './CurrentWeekDistribution'
import { CurrentWeekProgressBar } from './CurrentWeekProgressBar'
import { ProjectsGoals } from './ProjectsGoals'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const CurrentWeekPerformance = () => {
  const sets = useCurrentWeekSets()

  const doneMinutes = Math.round(getSetsSum(sets) / MS_IN_MIN)

  return (
    <Panel kind="secondary">
      <TitledSection
        title={
          <VStack gap={8}>
            <HStack alignItems="center" gap={4}>
              <Text>This week:</Text>
              <Text color="regular" as="span">
                {Math.round(convertDuration(doneMinutes, 'min', 'h'))}h
              </Text>
            </HStack>
            <CurrentWeekProgressBar />
          </VStack>
        }
      >
        <ProjectsGoals />
        <VStack gap={12}>
          <DayAverage />
          <ProjectsCurrentWeek />
        </VStack>
        <CurrentWeekDistribution />
      </TitledSection>
    </Panel>
  )
}
