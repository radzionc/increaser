import { ClosableComponentProps } from '@lib/ui/props'
import { Button } from '@lib/ui/buttons/Button'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

import { UpdateSoundForm } from './UpdateSoundForm'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'

interface ManageSoundProps extends ClosableComponentProps {
  url: string
}

export const ManageSound = ({ onClose, url }: ManageSoundProps) => {
  const { focusSounds } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()

  const sound = focusSounds.find((sound) => sound.url === url)

  const handleDelete = () => {
    updateUser({
      focusSounds: focusSounds.filter((sound) => sound.url !== url),
    })
    onClose()
  }

  return (
    <SeparatedByLine gap={20}>
      {sound && <UpdateSoundForm sound={sound} onFinish={onClose} />}
      <Button size="l" onClick={handleDelete} kind="alert">
        Delete sound
      </Button>
    </SeparatedByLine>
  )
}
