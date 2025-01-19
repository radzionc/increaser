import { VStack } from '@lib/ui/css/stack'

import { WorkdayFinished } from './WorkdayFinished'
import { FocusStartTime } from './startTime/FocusStartTime'
import { StartFocus } from './StartFocus'
import { useFocusTargetProject } from '@increaser/ui/focus/hooks/useFocusTargetProject'
import { FocusTargetInputs } from '@increaser/ui/focus/components/FocusTargetInputs'
import { FocusDurationInput } from '@increaser/ui/focus/components/FocusDurationInput'

export const FocusLauncherForm = () => {
  const project = useFocusTargetProject()

  return (
    <>
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
    </>
  )
}
