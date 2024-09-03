import { HStack, VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { Opener } from '@lib/ui/base/Opener'
import { Modal } from '@lib/ui/modal'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { useCurrentProductFeature } from './CurrentProductFeatureProvider'
import { ProductFeatureDetails } from './ProductFeatureDetails'
import { VoteForFeature } from './VoteForFeature'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

const Container = styled.div`
  ${verticalPadding(panelDefaultPadding)};
  ${interactive};
  ${transition};
`

const Content = styled(VStack)`
  gap: 8px;
  flex: 1;
  line-height: 1.5;
`

export const ProductFeatureItem = () => {
  const { name, description, isApproved } = useCurrentProductFeature()

  return (
    <ActionInsideInteractiveElement
      render={({ actionSize }) => (
        <Opener
          renderOpener={({ onOpen }) => (
            <Container onClick={onOpen}>
              <VStack gap={8}>
                <HStack
                  justifyContent="space-between"
                  alignItems="start"
                  fullWidth
                  gap={20}
                >
                  <Spacer {...actionSize} />
                  <Content>
                    <Text color="contrast" weight="500" style={{ flex: 1 }}>
                      {name}
                    </Text>
                    {description && (
                      <Text color="supporting" size={14}>
                        {description}
                      </Text>
                    )}
                    {!isApproved && (
                      <Text color="supporting">
                        <EmojiTextPrefix emoji="🙌" />
                        Thank you! Your feature is awaiting approval and will be
                        open for voting soon.
                      </Text>
                    )}
                  </Content>
                </HStack>
              </VStack>
            </Container>
          )}
          renderContent={({ onClose }) => (
            <Modal width={480} onClose={onClose} title={name}>
              <ProductFeatureDetails />
            </Modal>
          )}
        />
      )}
      action={<VoteForFeature />}
      actionPlacerStyles={{
        top: panelDefaultPadding,
        left: 0,
      }}
    />
  )
}
