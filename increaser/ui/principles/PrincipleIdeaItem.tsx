import { PrincipleIdea } from '@increaser/entities-utils/principle/principleIdeas'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { defaultPrincipleCategories } from '@increaser/entities/PrincipleCategory'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Text } from '@lib/ui/text'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { Opener } from '@lib/ui/base/Opener'
import { CreatePrincipleForm } from './form/CreatePrincipleForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PrincipleItemContainer } from './PrincipleItemContainer'
import { PrincipleHeader } from './PrincipleHeader'
import { PrincipleName } from './PrincipleName'
import { PrincipleDescription } from './PrincipleDescription'
import { useUser } from '../user/state/user'
import { useMemo } from 'react'
import { PrincipleFormShape } from './form/PrincipleFormShape'
import { usePrinciples } from './hooks/usePrinciples'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const PrincipleIdeaItem = ({
  value,
}: ComponentWithValueProps<PrincipleIdea>) => {
  const { description, name, source, categoryId } = value

  const { principleCategories } = useUser()

  const principles = usePrinciples()

  const isAdded = useMemo(
    () => principles.some((p) => p.name === name),
    [name, principles],
  )

  const initialValue = useMemo(() => {
    const result: Partial<PrincipleFormShape> = {
      name,
      description,
    }

    if (categoryId in principleCategories) {
      result.categoryId = categoryId
    }

    return result
  }, [categoryId, description, name, principleCategories])

  const content = (
    <PrincipleItemContainer>
      <PrincipleHeader
        prefix={
          <Text color="contrast">
            {
              shouldBePresent(
                defaultPrincipleCategories.find(
                  (principle) => principle.id === value.categoryId,
                ),
              ).emoji
            }
          </Text>
        }
      >
        <PrincipleName>
          {name}
          {isAdded && (
            <Text
              weight="600"
              style={{ marginLeft: 8 }}
              as="span"
              color="success"
            >
              (added)
            </Text>
          )}
        </PrincipleName>
      </PrincipleHeader>
      <PrincipleDescription>{description}</PrincipleDescription>
      <Text color="shy">
        From "{source.name}" by {source.author}
      </Text>
    </PrincipleItemContainer>
  )

  if (isAdded) {
    return <>{content}</>
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container
          onClick={() => {
            onOpen()
          }}
          verticalOffset={0}
        >
          {content}
        </Container>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreatePrincipleForm
            submitText="Add to my principles"
            initialValue={initialValue}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
