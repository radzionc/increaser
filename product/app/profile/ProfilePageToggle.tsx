import { Switch } from '@lib/ui/inputs/Switch'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { useUpdateUserProfileMutation } from '@product/app/community/hooks/useUpdateUserProfileMutation'
import { useUser } from '@product/ui/user/state/user'

import { useIsPayingUser } from '../membership/hooks/useIsPayingUser'

export const ProfilePageToggle = () => {
  const { isAnonymous } = useUser()
  const { mutate: updateUser } = useUpdateUserProfileMutation()
  const isPaying = useIsPayingUser()

  if (!isPaying && isAnonymous) return null

  return (
    <WithHint hint="Enable your public profile to display your name and country on the leaderboard and feature requests. Without it, you'll remain anonymous everywhere.">
      <Switch
        size="s"
        value={!isAnonymous}
        label="Enable public profile"
        onChange={(value) => {
          const fields = { isAnonymous: !value }
          updateUser(fields)
        }}
      />
    </WithHint>
  )
}
