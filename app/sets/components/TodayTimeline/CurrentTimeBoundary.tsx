import { useFocus } from 'focus/hooks/useFocus'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'
import { getLastItem } from '@increaser/utils/array/getLastItem'

const Boundary = styled(Text)`
  position: absolute;
  width: 100%;
  font-size: 14px;

  left: 10px;
  width: calc(100% - 20px);
`

interface Props {
  top: string
}

export const CurrentTimeBoundary = ({ top }: Props) => {
  useRhythmicRerender(2000)
  const { currentSet } = useFocus()

  const todaySets = useTodaySets()

  const lastSet = getLastItem(todaySets)

  return (
    <Boundary
      color="regular"
      as="div"
      style={{
        top,
        borderTop: currentSet ? undefined : '1px dashed',
      }}
    >
      <HStackSeparatedBy separator={<Text color="shy">{dotSeparator}</Text>}>
        <Text color="regular">
          {new Date().toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        {!currentSet && lastSet && (
          <Text color="supporting">
            {formatDuration(Date.now() - lastSet.end, 'ms')}
          </Text>
        )}
      </HStackSeparatedBy>
    </Boundary>
  )
}
