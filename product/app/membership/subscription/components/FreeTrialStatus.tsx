import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { Text } from '@lib/ui/text'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { freeTrialDays, productName } from '@product/config'
import { useUser } from '@product/ui/user/state/user'

import { useIsPayingUser } from '../../hooks/useIsPayingUser'

export const FreeTrialStatus = () => {
  const { freeTrialEnd } = useUser()

  const isPayingUser = useIsPayingUser()

  if (isPayingUser) {
    return null
  }

  return (
    <RhythmicRerender
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
              <Text color="contrast" as="span" weight="500">
                {formatDuration(freeTrialEnd - now, 'ms', {
                  minUnit: 'h',
                  kind: 'l',
                })}
              </Text>
            </Text>
          </ShyInfoBlock>
        )
      }}
    />
  )
}
