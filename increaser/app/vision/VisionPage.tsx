import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import { VisionAttributes } from './VisionAttributes'
import { AddVisionAttribute } from './AddVisionAttribute'
import styled from 'styled-components'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

const title = 'Achieve your dreams'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
`

export const VisionPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✨ ${title}`} title={title} />
        <Container>
          <ExpandableSection defaultIsOpen title="Your perfect life vision">
            <VStack gap={20}>
              <ShyInfoBlock>
                Envision your ideal life by describing specific attributes that
                define your perfect world, such as a happy marriage, a fit body,
                or financial independence. Ensure each attribute clearly
                resonates with your long-term aspirations and reflects what
                truly matters to you. Keep your vision clear and concise, making
                it easy to visualize and strive towards daily.
              </ShyInfoBlock>
              <UserStateOnly>
                <VStack>
                  <ActiveItemIdProvider initialValue={null}>
                    <VisionAttributes />
                    <AddVisionAttribute />
                  </ActiveItemIdProvider>
                </VStack>
              </UserStateOnly>
            </VStack>
          </ExpandableSection>
          <ExpandableSection defaultIsOpen title="Your goals">
            <VStack gap={20}>
              <ShyInfoBlock>
                Set practical and achievable goals that will bring you closer to
                your perfect life vision. Break down each goal into manageable
                steps, and focus on consistent progress rather than perfection.
                Remember to track your progress and adjust your goals as needed
                to stay aligned with your evolving vision.
              </ShyInfoBlock>
              <UserStateOnly>
                <VStack>
                  <ActiveItemIdProvider initialValue={null}>
                    <VisionAttributes />
                    <AddVisionAttribute />
                  </ActiveItemIdProvider>
                </VStack>
              </UserStateOnly>
            </VStack>
          </ExpandableSection>
        </Container>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
