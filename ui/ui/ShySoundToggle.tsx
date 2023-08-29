import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { NoVolumeIcon } from '@increaser/ui/ui/icons/NoVolumeIcon'
import { VolumeIcon } from '@increaser/ui/ui/icons/VolumeIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getColor } from '@increaser/ui/ui/theme/getters'

import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { InputProps } from '../props'

interface ShySoundToggleProps extends InputProps<boolean> {
  style?: React.CSSProperties
}

const Container = styled(UnstyledButton)`
  background: ${getColor('mist')};
  border-radius: 8px;
  padding: 4px 8px;
  ${defaultTransitionCSS};
  font-size: 14px;
`

export const ShySoundToggle = ({
  value,
  onChange,
  style,
}: ShySoundToggleProps) => {
  return (
    <Container onClick={() => onChange(!value)} style={style}>
      <HStack alignItems="center" gap={8}>
        {value ? <VolumeIcon /> : <NoVolumeIcon />}
        <Text>{value ? 'sound on' : 'sound off'}</Text>
      </HStack>
    </Container>
  )
}
