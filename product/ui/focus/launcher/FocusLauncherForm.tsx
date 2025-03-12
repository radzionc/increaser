import { VStack } from '@lib/ui/css/stack'
import { sidebarConfig } from '@product/app/navigation/Sidebar/config'
import { FocusDurationInput } from '@product/ui/focus/components/FocusDurationInput'
import { FocusTargetInputs } from '@product/ui/focus/components/FocusTargetInputs'
import { useFocusTargetProject } from '@product/ui/focus/hooks/useFocusTargetProject'

import { StartFocus } from './StartFocus'
import { FocusStartTime } from './startTime/FocusStartTime'
import { WorkdayFinished } from './WorkdayFinished'

export const FocusLauncherForm = () => {
  const project = useFocusTargetProject()

  return (
    <VStack style={{ position: 'relative' }} gap={sidebarConfig.gap}>
      <FocusTargetInputs />
      {project && (
        <>
          <FocusStartTime />
          <FocusDurationInput />
          <VStack>
            <StartFocus />
          </VStack>
        </>
      )}
      <WorkdayFinished />
    </VStack>
  )
}
