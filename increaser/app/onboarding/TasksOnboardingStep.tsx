import { Panel } from '@lib/ui/panel/Panel'
import { TasksView } from '../tasks/components/TasksView'

export const TasksOnboardingStep = () => {
  return (
    <Panel kind="secondary" style={{ maxWidth: 480 }}>
      <TasksView />
    </Panel>
  )
}
