import { PrincipleIdea } from '@increaser/entities-utils/principle/principleIdeas'
import { ValueProp } from '@lib/ui/props'
import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { Opener } from '@lib/ui/base/Opener'
import { CreatePrincipleForm } from './form/CreatePrincipleForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useUser } from '../user/state/user'
import { useMemo } from 'react'
import { PrincipleFormShape } from './form/PrincipleFormShape'
import { usePrinciples } from './hooks/usePrinciples'
import { PrincipleIdeaItemContent } from './PrincipleIdeaItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const PrincipleIdeaItem = ({ value }: ValueProp<PrincipleIdea>) => {
  const { description, name, categoryId } = value

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

  const content = <PrincipleIdeaItemContent value={value} />

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
