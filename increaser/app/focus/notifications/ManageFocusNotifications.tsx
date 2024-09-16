import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { WithSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { Modal } from '@lib/ui/modal'
import { useState } from 'react'
import { useFocusNotificationsHaveSound } from './state/focusNotificationsHaveSound'
import { NoVolumeIcon } from '@lib/ui/icons/NoVolumeIcon'
import { VolumeIcon } from '@lib/ui/icons/VolumeIcon'
import styled from 'styled-components'
import { FocusNotificationsToggles } from './FocusNotificationsToggles'

const IconContainer = styled(IconWrapper)`
  color: ${({ theme }) =>
    theme.colors.foreground.getVariant({ l: () => 48 }).toCssValue()};
`

export const ManageFocusNotifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [haveSound, setHaveSound] = useFocusNotificationsHaveSound()

  return (
    <>
      <WithSecondaryAction>
        <HStack onClick={() => setIsOpen(true)} alignItems="center" gap={8}>
          <IconContainer>
            <SettingsIcon />
          </IconContainer>
          Notifications
        </HStack>
        <UnstyledButton
          title={haveSound ? 'Disable sound' : 'Enable sound'}
          onClick={() => setHaveSound(!haveSound)}
          type="button"
        >
          {haveSound ? <VolumeIcon /> : <NoVolumeIcon />}
        </UnstyledButton>
      </WithSecondaryAction>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="Focus notifications">
          <FocusNotificationsToggles />
        </Modal>
      )}
    </>
  )
}
