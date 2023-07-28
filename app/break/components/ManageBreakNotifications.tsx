import { useBreak } from 'break/hooks/useBreak'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { NoVolumeIcon } from '@increaser/ui/ui/icons/NoVolumeIcon'
import { VolumeIcon } from '@increaser/ui/ui/icons/VolumeIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getColor } from '@increaser/ui/ui/theme/getters'

import { BreakBrowserNotification } from './BreakBrowserNotifications'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'

const Container = styled(HStack)`
  position: relative;
`

const SoundToggle = styled(UnstyledButton)`
  background: ${getColor('mist')};
  border-radius: 8px;
  padding: 4px 8px;
  ${defaultTransitionCSS};
  font-size: 14px;
`

export const ManageBreakNotifications = () => {
  const {
    hasBrowserNotification,
    setHasSoundNotification,
    hasSoundNotification,
  } = useBreak()

  return (
    <Container alignItems="center" gap={16}>
      <BreakBrowserNotification />
      <SoundToggle
        onClick={() => setHasSoundNotification(!hasSoundNotification)}
        style={{ opacity: Number(hasBrowserNotification) }}
      >
        <HStack alignItems="center" gap={8}>
          {hasSoundNotification ? <VolumeIcon /> : <NoVolumeIcon />}
          <Text>{hasSoundNotification ? 'sound on' : 'sound off'}</Text>
        </HStack>
      </SoundToggle>
    </Container>
  )
}
