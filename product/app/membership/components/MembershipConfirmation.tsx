import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { useRunOnChange } from '@lib/ui/hooks/useRunOnChange'
import { Modal } from '@lib/ui/modal'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { Text } from '@lib/ui/text'
import { InlineFounderContacts } from '@product/app/info/components/InflineFounderContacts'
import { useIsPayingUser } from '@product/app/membership/hooks/useIsPayingUser'
import { ContinueButton } from '@product/app/ui/ContinueButton'
import { productName } from '@product/config'

export const MembershipConfirmation = () => {
  const [isOpen, { set: open, unset: close }] = useBoolean(false)
  const isPayingUser = useIsPayingUser()

  useRunOnChange(() => {
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
      <ModalContent gap={20}>
        <Text color="regular">
          Hey there! Thank you for subscribing to {productName}. I'm Radzion,
          and I'm excited for you to embark on this journey to enhanced
          productivity and a more balanced lifestyle. If you have any questions
          or need assistance, feel free to reach out to me directly—I'm here to
          help!
        </Text>
        <InlineFounderContacts />
      </ModalContent>
    </Modal>
  )
}
