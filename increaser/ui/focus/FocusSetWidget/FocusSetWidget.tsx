import { HStack, VStack } from '@lib/ui/css/stack'
import { FocusTaskOverview } from './task/FocusTaskOverview'
import { ActiveFocusHeader } from './ActiveFocusHeader'
import { Panel } from '@lib/ui/css/panel'

import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { FocusAudioWidget } from '../audio/FocusAudioWidget'
import { ActiveFocusDocumentTitle } from '../components/ActiveFocusDocumentTitle'
import { FocusTargetInputs } from '../components/FocusTargetInputs'
import { ManageFocusNotifications } from '../notifications/ManageFocusNotifications'
import { useFocusTargetTask } from '../tasks/hooks/useFocusTargetTask'

export const FocusSetWidget = () => {
  const task = useFocusTargetTask()

  return (
    <>
      <ActiveFocusDocumentTitle />
      <ActiveFocusHeader />
      <VStack gap={4}>
        <Panel kind="secondary" withSections>
          <FocusTargetInputs />
        </Panel>
      </VStack>
      <HStack
        fullWidth
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
      >
        <FocusAudioWidget />
        <ManageFocusNotifications />
      </HStack>
      {task && (
        <CurrentTaskProvider key={task.id} value={task}>
          <FocusTaskOverview />
        </CurrentTaskProvider>
      )}
    </>
  )
}
