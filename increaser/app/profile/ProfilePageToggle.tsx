import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserProfileMutation } from '@increaser/app/community/hooks/useUpdateUserProfileMutation'
import { Switch } from '@lib/ui/inputs/Switch'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { useIsPayingUser } from '../membership/hooks/useIsPayingUser'

export const ProfilePageToggle = () => {
  const { isAnonymous } = useAssertUserState()
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
