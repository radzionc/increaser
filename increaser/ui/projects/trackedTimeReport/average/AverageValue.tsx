import { formatDuration } from '@lib/utils/time/formatDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import {
  ComponentWithKindProps,
  ComponentWithValueProps,
  NamedComponentProps,
} from '@lib/ui/props'
import { text, Text } from '@lib/ui/text'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { sum } from '@lib/utils/array/sum'
import { useMemo } from 'react'
import { hStack } from '@lib/ui/css/stack'
import styled from 'styled-components'

type AverageValueKind = 'regular' | 'secondary'

const Container = styled.div`
  ${hStack({
    alignItems: 'center',
    justifyContent: 'space-between',
  })}

  ${text({
    weight: 600,
    color: 'contrast',
  })}
`

export const AverageValue = ({
  value,
  name,
  kind = 'regular',
}: NamedComponentProps &
  ComponentWithValueProps<number[]> &
  Partial<ComponentWithKindProps<AverageValueKind>>) => {
  const result = useMemo(() => {
    if (isEmpty(value)) {
      return undefined
    }

    const average = sum(value) / value.length

    if (!average) return undefined

    return average
  }, [value])

  return (
    <Container>
      <Text color={kind === 'secondary' ? 'supporting' : 'contrast'}>
        {name} average
      </Text>
      <span>
        {result ? (
          <EmphasizeNumbers
            value={formatDuration(sum(value) / value.length, 's', {
              minUnit: 'min',
              maxUnit: 'h',
            })}
          />
        ) : (
          '-'
        )}
      </span>
    </Container>
  )
}
