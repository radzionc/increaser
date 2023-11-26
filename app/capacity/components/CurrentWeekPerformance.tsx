import { DayAverage } from 'projects/components/ProjectsAnalytics/DayAverage'
import { ProjectsCurrentWeek } from 'projects/components/ProjectsAnalytics/ProjectsCurrentWeek'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useCurrentWeekSets } from 'sets/hooks/useCurrentWeekSets'
import { TitledSection } from '@increaser/ui/Layout/TitledSection'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { MS_IN_MIN } from '@increaser/utils/time'

import { CurrentWeekDistribution } from './CurrentWeekDistribution'
import { CurrentWeekProgressBar } from './CurrentWeekProgressBar'
import { ProjectsGoals } from './ProjectsGoals'
import { convertDuration } from '@increaser/utils/time/convertDuration'

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
