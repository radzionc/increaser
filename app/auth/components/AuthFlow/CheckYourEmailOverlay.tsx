import { useContext } from 'react'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { Modal } from '@increaser/ui/ui/Modal'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { CheckInboxLink } from './CheckInboxLink'
import { EmailAuthFlowContext } from './EmailAuthFlowContext'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { OpenLetterIcon } from '@increaser/ui/ui/icons/OpenLetterIcon'

interface Props {
  email: string
  onEditEmail: () => void
}

export const CheckYourEmailOverlay = ({ email, onEditEmail }: Props) => {
  const { setEmail } = useContext(EmailAuthFlowContext)

  return (
    <Modal
      placement="top"
      onClose={() => setEmail(null)}
      renderContent={() => (
        <VStack
          style={{ padding: 60, paddingTop: 0 }}
          alignItems="center"
          gap={24}
        >
          <Text color="primary">
            <OpenLetterIcon />
          </Text>
          <Text size={20} weight="bold">
            Confirm your email
          </Text>
          <VStack gap={4} alignItems="center">
            <Text centered>We emailed a magic link to</Text>
            <HStack alignItems="center" gap={12}>
              <Text weight="bold">{email}</Text>
              <IconButton
                size="s"
                kind="secondary"
                icon={<EditIcon />}
                onClick={onEditEmail}
              />
            </HStack>
            <Text centered>Click the link to log in or sign up.</Text>
          </VStack>
          <CheckInboxLink email={email} />
        </VStack>
      )}
    />
  )
}
