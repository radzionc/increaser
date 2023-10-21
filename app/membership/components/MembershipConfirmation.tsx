import { productName } from '@increaser/entities'
import { Modal } from '@increaser/ui/modal'
import { FinishableComponentProps } from '@increaser/ui/props'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { InlineFounderContacts } from 'info/components/InflineFounderContacts'
import { ContinueButton } from 'ui/ContinueButton'

export const MembershipConfirmation = ({
  onFinish,
}: FinishableComponentProps) => {
  return (
    <Modal
      placement="top"
      onClose={onFinish}
      title="Welcome to Increaser!"
      footer={<ContinueButton onClick={onFinish} />}
    >
      <VStack gap={20}>
        <Text>
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
