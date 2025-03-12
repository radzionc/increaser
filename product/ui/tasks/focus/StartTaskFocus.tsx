import { HStack } from '@lib/ui/css/stack'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { OnFinishProp } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useFocusStatus } from '@product/ui/focus/state/focusIntervals'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { useStartFocus } from '../../focus/hooks/useStartFocus'
import { useFocusProject } from '../../focus/state/focusProject'
import { useFocusProjectTask } from '../../focus/state/focusProjectTask'
import { getAppPath } from '../../navigation/app'
import { useCurrentTask } from '../CurrentTaskProvider'

const Container = styled(ExpandableSelectorContainer)`
  padding-right: 16px;
  color: ${getColor('textPrimary')};

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

export const StartTaskFocus = ({ onFinish }: OnFinishProp) => {
  const [, setFocusProject] = useFocusProject()
  const [, setFocusProjectTask] = useFocusProjectTask()

  const { projectId, id, status } = useCurrentTask()

  const start = useStartFocus()

  const focusStatus = useFocusStatus()

  const { push } = useRouter()

  if (status === 'done') return null

  return (
    <Tooltip
      renderOpener={(props) => (
        <Container
          {...props}
          onClick={() => {
            onFinish()

            setFocusProjectTask((prev) => ({ ...prev, [projectId]: id }))
            setFocusProject(projectId)

            if (!focusStatus) {
              start()
            }

            push(getAppPath('focus'))
          }}
        >
          <HStack alignItems="center" gap={8}>
            <PlayIcon />
            Start
          </HStack>
        </Container>
      )}
      content="Start focus session"
    />
  )
}
