import { HStack } from '@lib/ui/css/stack'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useRouter } from 'next/router'
import { getAppPath } from '../../navigation/app'
import { OnFinishProp } from '@lib/ui/props'
import { useFocusStatus } from '@increaser/ui/focus/state/focusIntervals'
import { useStartFocus } from '../../focus/hooks/useStartFocus'
import { useFocusProject } from '../../focus/state/focusProject'
import { useFocusProjectTask } from '../../focus/state/focusProjectTask'

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
