import { Panel } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'

import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { FocusStartTime } from './startTime/FocusStartTime'
import { StartFocus } from './StartFocus'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'
import { FocusTargetInputs } from '../components/FocusTargetInputs'
import { FocusDurationInput } from '../components/FocusDurationInput'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

export const FocusLauncherForm = () => {
  const project = useFocusTargetProject()

  return (
    <Container withSections kind="secondary">
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
    </Container>
  )
}
