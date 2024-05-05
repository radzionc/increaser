import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack } from '@lib/ui/layout/Stack'
import { range } from '@lib/utils/array/range'
import styled from 'styled-components'

const Wrapper = styled(TakeWholeSpaceAbsolutely)`
  overflow: hidden;
`

const Container = styled(HStack)`
  height: 100%;
  width: 120%;
  margin-left: -10%;
  justify-content: space-between;
  align-items: center;
`

const Line = styled.div`
  border-left: 2px solid;
  transform: rotate(45deg);
  height: 200%;
`

type LinesFillerProps = {
  rotation?: number
}

export const LinesFiller = ({ rotation }: LinesFillerProps) => {
  const count = 32
  return (
    <Wrapper>
      <Container>
        {range(count).map((index) => (
          <Line style={{ transform: `rotate(${rotation}deg)` }} key={index} />
        ))}
      </Container>
    </Wrapper>
  )
}
