import { ClosableComponentProps } from '@increaser/ui/props'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { SeparatedByLine } from '@increaser/ui/ui/SeparatedByLine'

import { useFocusSounds } from '../useFocusSounds'
import { UpdateSoundForm } from './UpdateSoundForm'

interface ManageSoundProps extends ClosableComponentProps {
  url: string
}

export const ManageSound = ({ onClose, url }: ManageSoundProps) => {
  const { sounds, updateSounds } = useFocusSounds()

  const sound = sounds.find((sound) => sound.url === url)

  const handleDelete = () => {
    updateSounds(sounds.filter((sound) => sound.url !== url))
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
