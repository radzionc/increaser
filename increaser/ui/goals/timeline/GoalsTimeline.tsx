import { useUser } from '@increaser/ui/user/state/user'
import { GoalsAgeTimelineProvider } from './GoalsAgeTimelineProvider'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { goalsTimelineConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CurrentAge } from './CurrentAge'
import { GroupedGoals } from './GroupedGoals'
import { Match } from '@lib/ui/base/Match'
import { useGoalsTimelineType } from './state/goalsTimelineType'
import { format } from 'date-fns'
import { GoalsAgeTimeLabels } from './GoalsAgeTimeLabels'
import { GoalsDateTimelineProvider } from './GoalsDateTimelineProvider'
import { GoalsDateTimeLabels } from './GoalsDateTimeLabels'
import { Wrap } from '@lib/ui/base/Wrap'
import { GoalsTimelineMarks } from './GoalsTimelineMarks'
import { SetDobPrompt } from '../dob/SetDobPrompt'
import { Text } from '@lib/ui/text'
import { UIComponentProps } from '@lib/ui/props'

const LabelsContainer = styled.div`
  width: 100%;
  position: relative;
  height: ${toSizeUnit(goalsTimelineConfig.timeLabelHeight)};
`

type GoalsTimelineProps = UIComponentProps & {
  controls?: React.ReactNode
}

export const GoalsTimeline = ({ controls, ...rest }: GoalsTimelineProps) => {
  const { dob } = useUser()

  const [type] = useGoalsTimelineType()

  return (
    <VStack gap={8} {...rest}>
      <HStack
        fullWidth
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
        gap={20}
      >
        <Match
          value={type}
          date={() => (
            <Text color="primary">{format(Date.now(), 'd MMMM yyyy')}</Text>
          )}
          age={() => (dob ? <CurrentAge /> : null)}
        />
        {controls}
      </HStack>
      {type === 'age' && !dob ? (
        <SetDobPrompt />
      ) : (
        <VStack gap={4}>
          <Wrap
            wrap={(children) => (
              <Match
                value={type}
                age={() => (
                  <GoalsAgeTimelineProvider>
                    {children}
                  </GoalsAgeTimelineProvider>
                )}
                date={() => (
                  <GoalsDateTimelineProvider>
                    {children}
                  </GoalsDateTimelineProvider>
                )}
              />
            )}
          >
            <GroupedGoals />
            <GoalsTimelineMarks />
            <LabelsContainer>
              <Match
                value={type}
                date={() => <GoalsDateTimeLabels />}
                age={() => <GoalsAgeTimeLabels />}
              />
            </LabelsContainer>
          </Wrap>
        </VStack>
      )}
    </VStack>
  )
}
