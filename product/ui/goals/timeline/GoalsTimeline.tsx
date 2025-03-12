import { Match } from '@lib/ui/base/Match'
import { HStack, VStack } from '@lib/ui/css/stack'
import { UiProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useUser } from '@product/ui/user/state/user'
import { format } from 'date-fns'

import { SetDobPrompt } from '../dob/SetDobPrompt'

import { CurrentAge } from './CurrentAge'
import { GoalsTimelineContent } from './GoalsTimelineContent'
import { useGoalsTimelineType } from './state/goalsTimelineType'

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
