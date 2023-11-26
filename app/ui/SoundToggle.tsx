import { IconButton } from '@increaser/ui/buttons/IconButton'
import { NoVolumeIcon } from '@increaser/ui/icons/NoVolumeIcon'
import { VolumeIcon } from '@increaser/ui/icons/VolumeIcon'

interface SoundToggleProps {
  value: boolean
  onChange: (value: boolean) => void
}

export const SoundToggle = ({ value, onChange }: SoundToggleProps) => {
  return (
    <IconButton
      title="Toggle sound"
      kind={value ? 'regular' : 'secondary'}
      onClick={() => onChange(!value)}
      icon={value ? <VolumeIcon /> : <NoVolumeIcon />}
    />
  )
}
