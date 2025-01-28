import { useUser } from '@increaser/ui/user/state/user'
import { HStack, VStack } from '@lib/ui/css/stack'
import { CurrentAge } from './CurrentAge'
import { Match } from '@lib/ui/base/Match'
import { useGoalsTimelineType } from './state/goalsTimelineType'
import { format } from 'date-fns'
import { SetDobPrompt } from '../dob/SetDobPrompt'
import { Text } from '@lib/ui/text'
import { UiProps } from '@lib/ui/props'
import { GoalsTimelineContent } from './GoalsTimelineContent'

type GoalsTimelineProps = UiProps & {
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
      {type === 'age' && !dob ? <SetDobPrompt /> : <GoalsTimelineContent />}
    </VStack>
  )
}
