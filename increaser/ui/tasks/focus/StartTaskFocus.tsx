import { useFocusProject } from '@increaser/app/focus/state/focusProject'
import { useFocusProjectTask } from '@increaser/app/focus/state/focusProjectTask'
import { HStack } from '@lib/ui/css/stack'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useStartFocus } from '@increaser/app/focus/hooks/useStartFocus'
import { useRouter } from 'next/router'
import { getAppPath } from '../../navigation/app'
import { NoValueFinishProps } from '@lib/ui/props'

const Container = styled(ExpandableSelectorContainer)`
  padding-right: 16px;
  color: ${getColor('textPrimary')};

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

export const StartTaskFocus = ({ onFinish }: NoValueFinishProps) => {
  const [, setFocusProject] = useFocusProject()
  const [, setFocusProjectTask] = useFocusProjectTask()

  const { projectId, id } = useCurrentTask()

  const start = useStartFocus()

  const { push } = useRouter()

  return (
    <Tooltip
      renderOpener={(props) => (
        <Container
          {...props}
          onClick={() => {
            onFinish()

            setFocusProjectTask((prev) => ({ ...prev, [projectId]: id }))
            setFocusProject(projectId)
            start()
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
