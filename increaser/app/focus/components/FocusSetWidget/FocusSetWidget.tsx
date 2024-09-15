import { HStack, VStack } from '@lib/ui/css/stack'
import { FocusTaskOverview } from './task/FocusTaskOverview'
import { useFocusTargetTask } from '../../tasks/hooks/useFocusTargetTask'
import { ActiveFocusDocumentTitle } from '../ActiveFocusDocumentTitle'
import { ActiveFocusHeader } from './ActiveFocusHeader'
import { Panel } from '@lib/ui/css/panel'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { FocusTargetInputs } from '../FocusTargetInputs'

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
      </HStack>
      {task && <FocusTaskOverview key={task.id} />}
    </>
  )
}
