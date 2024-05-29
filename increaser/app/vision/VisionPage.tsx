import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { TasksViewProvider } from '@increaser/ui/tasks/TasksView'
import { VStack } from '@lib/ui/layout/Stack'
import { VisionAttributes } from './VisionAttributes'
import { AddVisionAttributePrompt } from './AddVisionAttributePrompt'

const title = 'Define your perfect life vision'

export const VisionPage = () => {
  return (
    <FixedWidthContent>
      <TasksViewProvider>
        <PageTitle documentTitle={`✨ ${title}`} title={title} />
        <ShyInfoBlock>
          Creating a clear list of your perfect life vision helps you stay
          focused and make decisions that align with your goals. Be specific,
          prioritize your goals, and regularly review your progress to ensure
          you're on the right path. This approach keeps you motivated and
          adaptable, leading to a fulfilling and purpose-driven life.
        </ShyInfoBlock>

        <VStack>
          <VisionAttributes />
          <AddVisionAttributePrompt />
        </VStack>
      </TasksViewProvider>
    </FixedWidthContent>
  )
}
