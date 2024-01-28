import { Panel } from '@lib/ui/panel/Panel'
import { TasksView } from '../tasks/components/TasksView'
import { OnboardingStepView } from './OnboardingStepView'

export const TasksOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <Panel kind="secondary" style={{ maxWidth: 480 }}>
        <TasksView />
      </Panel>
    </OnboardingStepView>
  )
}
