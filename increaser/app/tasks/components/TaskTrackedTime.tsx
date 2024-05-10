import { useCurrentTask } from './CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled.span`
  font-weight: 500;
  padding: 4px 8px;
  background: ${getColor('mist')};
  ${borderRadius.xs};
  color: ${getColor('text')};
  margin-right: 8px;
  font-size: 14px;
`

export const TaskTrackedTime = () => {
  const { spentTime, projectId } = useCurrentTask()

  if (!projectId || !spentTime) return null

  return <Container>{formatDuration(spentTime, 'ms')}</Container>
}
