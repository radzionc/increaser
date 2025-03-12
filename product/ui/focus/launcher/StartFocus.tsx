import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RocketIcon } from '@lib/ui/icons/RocketIcon'
import { MemberOnlyAction } from '@product/app/membership/components/MemberOnlyAction'
import { useFocusTargetProject } from '@product/ui/focus/hooks/useFocusTargetProject'
import { useStartFocus } from '@product/ui/focus/hooks/useStartFocus'
import { useMemo } from 'react'

import { useFocusTargetStartTime } from './state/FocusLauncherStartTimeProvider'

export const StartFocus = () => {
  const start = useStartFocus()
  const project = useFocusTargetProject()

  const isDisabled = useMemo(() => {
    if (!project) {
      return `Choose a project or task to begin your focus session`
    }
  }, [project])

  const [startTime] = useFocusTargetStartTime()

  return (
    <MemberOnlyAction
      action={() => {
        start({
          start: startTime ?? Date.now(),
        })
      }}
      render={({ action }) => (
        <Button isDisabled={isDisabled} size="l" onClick={action}>
          <HStack alignItems="center" gap={8}>
            <IconWrapper>
              <RocketIcon />
            </IconWrapper>
            Start
          </HStack>
        </Button>
      )}
    />
  )
}
