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
import { NotPausedFocusOnly } from '../NotPausedFocusOnly'

const NotificationsWrapper = styled.div`
  align-self: flex-end;
`

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
        <NotificationsWrapper>
          <FocusNotifications />
        </NotificationsWrapper>
      </VStack>
      {task && <FocusTaskOverview />}
    </>
  )
}
