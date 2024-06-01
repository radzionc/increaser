import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { Tag } from '@lib/ui/tags/Tag'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useTheme } from 'styled-components'
import { NoMembershipDecoration } from './NoMembershipDecoration'

export const FreeTrialDecoration = () => {
  const { freeTrialEnd } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const theme = useTheme()

  const duration = freeTrialEnd - now
  if (duration < 0) {
    return <NoMembershipDecoration />
  }

  return (
    <Tag $color={theme.colors.idle}>
      {formatDuration(duration, 'ms', { minUnit: 'h' })}
    </Tag>
  )
}
