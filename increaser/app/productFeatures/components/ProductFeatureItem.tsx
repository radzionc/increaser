import { ProductFeatureResponse } from '@increaser/api-interface/ProductFeatureResponse'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel, panelDefaultPadding } from '@lib/ui/panel/Panel'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { UpvoteButton } from '@lib/ui/buttons/UpvoteButton'
import { useVoteForFeatureMutation } from '../hooks/useVoteForFeatureMutation'
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
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { format } from 'date-fns'
import { UserProfileQueryDependant } from '../../community/components/UserProfileQueryDependant'
import { ScoreboardDisplayName } from '@increaser/ui/scoreboard/ScoreboardDisplayName'

const Description = styled(Text)`
  ${maxTextLines(2)}
`

const Container = styled(Panel)`
  ${interactive};
  ${transition};
  &:hover {
    background: ${getColor('foreground')};
  }
`

export const ProductFeatureItem = ({
  value,
}: ComponentWithValueProps<ProductFeatureResponse>) => {
  const { mutate } = useVoteForFeatureMutation()

  const votingAction = (
    <UpvoteButton
      onClick={() => {
        mutate({
          id: value.id,
        })
      }}
      value={value.upvotedByMe}
      upvotes={value.upvotes}
    />
  )

  return (
    <ActionInsideInteractiveElement
      render={({ actionSize }) => (
        <Opener
          renderOpener={({ onOpen }) => (
            <Container onClick={onOpen} kind="secondary">
              <VStack gap={8}>
                <HStack
                  justifyContent="space-between"
                  alignItems="start"
                  fullWidth
                  gap={20}
                >
                  <VStack gap={8}>
                    <Text weight="semibold" style={{ flex: 1 }} height="large">
                      {value.name}
                    </Text>

                    <Description height="large" color="supporting" size={14}>
                      {value.description}
                    </Description>
                  </VStack>
                  <Spacer {...actionSize} />
                </HStack>
                {!value.isApproved && (
                  <ShyInfoBlock>
                    Thank you! Your feature is awaiting approval and will be
                    open for voting soon."
                  </ShyInfoBlock>
                )}
              </VStack>
            </Container>
          )}
          renderContent={({ onClose }) => (
            <Modal width={480} onClose={onClose} title={value.name}>
              <VStack gap={18}>
                <HStack
                  fullWidth
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <VStack style={{ fontSize: 14 }} gap={8}>
                    <LabeledValue name="Proposed at">
                      {format(value.createdAt, 'dd MMM yyyy')}
                    </LabeledValue>
                    <LabeledValue name="Proposed by">
                      <UserProfileQueryDependant
                        id={value.proposedBy}
                        success={(profile) => {
                          return (
                            <ScoreboardDisplayName
                              name={profile?.name || 'Anonymous'}
                              country={profile?.country}
                            />
                          )
                        }}
                      />
                    </LabeledValue>
                  </VStack>
                  {votingAction}
                </HStack>
                <Text height="large">{value.description}</Text>
              </VStack>
            </Modal>
          )}
        />
      )}
      action={votingAction}
      actionPlacerStyles={{
        top: panelDefaultPadding,
        right: panelDefaultPadding,
      }}
    />
  )
}
