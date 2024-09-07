import { VStack } from '@lib/ui/css/stack'
import { FocusTaskOverview } from './task/FocusTaskOverview'
import { useFocusTargetTask } from '../../tasks/hooks/useFocusTargetTask'
import { FocusNotifications } from '../FocusNotifications'
import styled from 'styled-components'
import { ActiveFocusDocumentTitle } from '../ActiveFocusDocumentTitle'
import { ActiveFocusHeader } from './ActiveFocusHeader'
import { Panel } from '@lib/ui/css/panel'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { FocusTargetInputs } from '../FocusTargetInputs'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'

const NotificationsWrapper = styled.div`
  align-self: flex-end;
`

export const FocusSetWidget = () => {
  const task = useFocusTargetTask()
  const isPaused = useIsFocusPaused()

  return (
    <>
      <ActiveFocusDocumentTitle />
      <ActiveFocusHeader />
      <VStack gap={4}>
        <Panel kind="secondary" withSections>
          <FocusTargetInputs />
          {!isPaused && <FocusAudioWidget />}
        </Panel>
        <NotificationsWrapper>
          <FocusNotifications />
        </NotificationsWrapper>
      </VStack>
      {task && <FocusTaskOverview />}
    </>
  )
}
