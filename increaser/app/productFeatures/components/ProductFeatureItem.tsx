import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel, panelDefaultPadding } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import styled from 'styled-components'
import { maxTextLines } from '@lib/ui/css/maxTextLines'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { Opener } from '@lib/ui/base/Opener'
import { Modal } from '@lib/ui/modal'
import { interactive } from '@lib/ui/css/interactive'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { useCurrentProductFeature } from './CurrentProductFeatureProvider'
import { ProductFeatureDetails } from './ProductFeatureDetails'
import { VoteForFeature } from './VoteForFeature'

const Description = styled(Text)`
  ${maxTextLines(2)}
`

const Container = styled(Panel)`
  ${interactive};
  ${transition};
  height: 100%;
  &:hover {
    background: ${getColor('foreground')};
  }
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
                  <VStack gap={8}>
                    <Text weight="semibold" style={{ flex: 1 }} height="large">
                      {name}
                    </Text>

                    <Description height="large" color="supporting" size={14}>
                      {description}
                    </Description>
                  </VStack>
                  <Spacer {...actionSize} />
                </HStack>
                {!isApproved && (
                  <ShyInfoBlock>
                    Thank you! Your feature is awaiting approval and will be
                    open for voting soon.
                  </ShyInfoBlock>
                )}
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
        right: panelDefaultPadding,
      }}
    />
  )
}
