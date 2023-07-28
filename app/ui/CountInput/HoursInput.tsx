import styled from 'styled-components'

import { CountInput, CountInputProps } from '.'
import { Text } from '@increaser/ui/ui/Text'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
  align-items: center;

  > * {
    :last-child {
      justify-self: end;
    }
  }
`

interface HoursInputProps extends Omit<CountInputProps, 'formatValue'> {}

export const HoursInput = (props: HoursInputProps) => {
  return (
    <Container>
      <CountInput {...props} formatValue={(v) => `${v} h`} />
      <Text weight="bold">{props.value} h</Text>
    </Container>
  )
}
