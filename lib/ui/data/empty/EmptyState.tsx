import { ReactNode } from 'react'
import { HStack, VStack } from '../../css/stack'
import { NoDataIllustration } from '../../illustrations/NoDataIllustration'
import { Center } from '../../layout/Center'
import { ActionProp, TitleProp } from '../../props'
import { Text } from '../../text'
import styled from 'styled-components'
import { verticalPadding } from '../../css/verticalPadding'

type EmptyStateProps = TitleProp &
  ActionProp & {
    description?: ReactNode
  }

const Container = styled(Center)`
  ${verticalPadding(40)}
`

const Content = styled(VStack)`
  max-width: 400px;
  align-items: center;
  gap: 40px;
`

export const EmptyState = ({ action, title, description }: EmptyStateProps) => {
  return (
    <Container>
      <Content>
        <VStack alignItems="center" gap={8}>
          <Text size={20} weight="700" color="contrast">
            {title}
          </Text>
          {description && (
            <Text height="l" centerHorizontally color="supporting">
              {description}
            </Text>
          )}
        </VStack>
        <NoDataIllustration fontSize={100} />
        <HStack gap={8} alignItems="center">
          {action}
        </HStack>
      </Content>
    </Container>
  )
}
