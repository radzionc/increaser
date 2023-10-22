import { productName } from '@increaser/entities'
import { useBoolean } from '@increaser/ui/hooks/useBoolean'
import { useEffectOnDependencyChange } from '@increaser/ui/hooks/useEffectOnDependencyChange'
import { Modal } from '@increaser/ui/modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { InlineFounderContacts } from 'info/components/InflineFounderContacts'
import { useIsPayingUser } from 'membership/hooks/useIsPayingUser'
import { ContinueButton } from 'ui/ContinueButton'

export const MembershipConfirmation = () => {
  const [isOpen, { set: open, unset: close }] = useBoolean(false)
  const isPayingUser = useIsPayingUser()
  useEffectOnDependencyChange(() => {
    if (isPayingUser) {
      open()
    }
  }, [isPayingUser])

  if (!isOpen) return null

  return (
    <Modal
      placement="top"
      onClose={close}
      title={`Welcome to ${productName}!`}
      footer={<ContinueButton onClick={close} />}
    >
      <VStack gap={20}>
        <Text color="regular">
          Hey there! Thank you for subscribing to {productName}. I'm Radzion,
          and I'm excited for you to embark on this journey to enhanced
          productivity and a more balanced lifestyle. If you have any questions
          or need assistance, feel free to reach out to me directly—I'm here to
          help!
        </Text>
        <InlineFounderContacts />
      </VStack>
    </Modal>
  )
}
