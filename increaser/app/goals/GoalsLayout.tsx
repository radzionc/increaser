import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { GoalsViewSelector } from './GoalsViewSelector'

const title = 'Your goals'

const Container = styled(VStack)`
  max-width: 560px;
`

const Content = styled(VStack)`
  gap: 40px;
`

export const GoalsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <Container>
          <PageTitle
            documentTitle={`⏳ ${title}`}
            title={
              <HStack
                fullWidth
                justifyContent="space-between"
                gap={20}
                wrap="wrap"
              >
                <Text>{title}</Text>
                <GoalsViewSelector />
              </HStack>
            }
          />
          <Content>
            <UserStateOnly>{children}</UserStateOnly>
          </Content>
        </Container>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
