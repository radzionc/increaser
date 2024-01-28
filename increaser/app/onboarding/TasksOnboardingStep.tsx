import { Panel } from '@lib/ui/panel/Panel'
import { TasksView } from '../tasks/components/TasksView'
import { OnboardingStepView } from './OnboardingStepView'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

export const TasksOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <VStack gap={40}>
        <Text height="large">
          Add your most important tasks for the day to keep them front and
          center on your homepage, ensuring you stay focused on your top
          priorities.
        </Text>
        <Panel kind="secondary" style={{ maxWidth: 480 }}>
          <TasksView />
        </Panel>
      </VStack>
    </OnboardingStepView>
  )
}
