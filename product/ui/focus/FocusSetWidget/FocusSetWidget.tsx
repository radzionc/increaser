import { HStack } from '@lib/ui/css/stack'
import { CurrentTaskProvider } from '@product/ui/tasks/CurrentTaskProvider'

import { FocusAudioWidget } from '../audio/FocusAudioWidget'
import { ActiveFocusDocumentTitle } from '../components/ActiveFocusDocumentTitle'
import { FocusTargetInputs } from '../components/FocusTargetInputs'
import { ManageFocusNotifications } from '../notifications/ManageFocusNotifications'
import { useFocusTargetTask } from '../tasks/hooks/useFocusTargetTask'

import { ActiveFocusHeader } from './ActiveFocusHeader'
import { FocusTaskOverview } from './task/FocusTaskOverview'

export const FocusSetWidget = () => {
  const task = useFocusTargetTask()

  return (
    <>
      <ActiveFocusDocumentTitle />
      <ActiveFocusHeader />
      <FocusTargetInputs />
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
