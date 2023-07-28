import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { NoVolumeIcon } from '@increaser/ui/ui/icons/NoVolumeIcon'
import { VolumeIcon } from '@increaser/ui/ui/icons/VolumeIcon'

interface SoundToggleProps {
  value: boolean
  onChange: (value: boolean) => void
}

export const SoundToggle = ({ value, onChange }: SoundToggleProps) => {
  return (
    <IconButton
      kind={value ? 'regular' : 'secondary'}
      onClick={() => onChange(!value)}
      icon={value ? <VolumeIcon /> : <NoVolumeIcon />}
    />
  )
}
