import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'

import { WorkdayFinished } from './WorkdayFinished'
import styled from 'styled-components'
import { FocusTaskInput } from './task/FocusTaskInput'
import { FocusStartTime } from './startTime/FocusStartTime'
import { StartFocus } from './StartFocus'
import { FocusLauncherDuration } from './FocusLauncherDuration'
import { useFocusLauncherProject } from './hooks/useFocusLauncherProject'
import { FocusLauncherBudget } from './FocusLauncherBudget'
import { FocusLauncherProject } from './project/FocusLauncherProject'

const Container = styled(Panel)`
  position: relative;
  isolation: isolate;
`

export const FocusLauncherForm = () => {
  const project = useFocusLauncherProject()

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
