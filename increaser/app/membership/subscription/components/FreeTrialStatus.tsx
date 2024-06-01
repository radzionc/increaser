import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { freeTrialDays, productName } from '@increaser/config'
import { useIsPayingUser } from '../../hooks/useIsPayingUser'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'

export const FreeTrialStatus = () => {
  const { freeTrialEnd } = useAssertUserState()

  const isPayingUser = useIsPayingUser()

  if (isPayingUser) {
    return null
  }

  return (
    <RhytmicRerender
      interval={convertDuration(1, 'min', 'ms')}
      render={() => {
        const now = Date.now()
        const isEnded = freeTrialEnd < now

        if (isEnded) {
          return (
            <ShyWarningBlock title="Your free trial has ended">
              Become a member to continue using {productName}.
            </ShyWarningBlock>
          )
        }

        return (
          <ShyInfoBlock>
            <Text as="span">
              Your {freeTrialDays}-day free trial will end in{' '}
              <Text color="contrast" as="span" weight="semibold">
                {formatDuration(freeTrialEnd - now, 'ms', {
                  minUnit: 'h',
                  kind: 'long',
                })}
              </Text>
            </Text>
          </ShyInfoBlock>
        )
      }}
    />
  )
}
