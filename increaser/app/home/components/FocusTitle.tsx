import { Text } from '@lib/ui/text'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { HStack } from '@lib/ui/layout/Stack'
import { FocusAssistance } from '../../focus/components/FocusAssistance'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusGoal } from '@increaser/ui/focus/FocusGoal'
import { SessionStartedAt } from '@increaser/ui/focus/SessionStartedAt'

export const FocusTitle = () => {
  return (
    <CurrentFocusGuard>
      <PageTitle
        title={
          <HStack
            fullWidth
            alignItems="center"
            justifyContent="space-between"
            gap={8}
            wrap="wrap"
          >
            <Text>Focus Session</Text>
            <HStack wrap="wrap" alignItems="center" gap={8}>
              <SessionStartedAt />
              <FocusGoal />
              <FocusAssistance />
            </HStack>
          </HStack>
        }
      />
    </CurrentFocusGuard>
  )
}
