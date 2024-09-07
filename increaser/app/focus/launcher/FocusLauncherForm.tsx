import { Panel } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'

import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { FocusTaskInput } from './task/FocusTaskInput'
import { FocusStartTime } from './startTime/FocusStartTime'
import { StartFocus } from './StartFocus'
import { FocusLauncherDuration } from './FocusLauncherDuration'
import { FocusLauncherBudget } from './FocusLauncherBudget'
import { FocusLauncherProject } from './project/FocusLauncherProject'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

export const FocusLauncherForm = () => {
  const project = useFocusTargetProject()

  return (
    <Container withSections kind="secondary">
      <FocusLauncherProject />
      <FocusTaskInput />
      {project && (
        <>
          <FocusLauncherBudget />
          <FocusStartTime />
          <FocusLauncherDuration />
          <VStack>
            <StartFocus />
          </VStack>
        </>
      )}
      <WorkdayFinished />
    </Container>
  )
}
