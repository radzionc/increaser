import { VStack } from '@lib/ui/css/stack'
import { FocusTaskOverview } from './task/FocusTaskOverview'
import { useFocusTargetTask } from '../../tasks/hooks/useFocusTargetTask'
import { ActiveFocusDocumentTitle } from '../ActiveFocusDocumentTitle'
import { ActiveFocusHeader } from './ActiveFocusHeader'
import { Panel } from '@lib/ui/css/panel'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { FocusTargetInputs } from '../FocusTargetInputs'
import { NotPausedFocusOnly } from '../NotPausedFocusOnly'

export const FocusSetWidget = () => {
  const task = useFocusTargetTask()

  return (
    <>
      <ActiveFocusDocumentTitle />
      <ActiveFocusHeader />
      <VStack gap={4}>
        <Panel kind="secondary" withSections>
          <FocusTargetInputs />
          <NotPausedFocusOnly>
            <FocusAudioWidget />
          </NotPausedFocusOnly>
        </Panel>
      </VStack>
      {task && <FocusTaskOverview key={task.id} />}
    </>
  )
}
