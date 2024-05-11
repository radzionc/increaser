import { toPercents } from '@lib/utils/toPercents'
import styled, { keyframes } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { HSLA } from '@lib/ui/colors/HSLA'
import { getColor } from '@lib/ui/theme/getters'

interface Props {
  color: HSLA
  completion: number
}

const Container = styled.div<{ $color: HSLA }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: ${getColor('background')};
  overflow: hidden;
  border: 2px solid ${({ $color }) => $color.toCssValue()};
`

export const getFireplaceKeyframes = () => keyframes`
  0%{
    opacity: 1.0;
  }
  50%{
    opacity: 0.4;
  }
  100%{
    opacity: 1.0;
  }
`

export const Filler = styled.div<{ $color: HSLA }>`
  width: 100%;

  ${transition};

  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${({ $color }) => $color.getVariant({ a: () => 0.4 }).toCssValue()} 100%
  );

  animation: ${getFireplaceKeyframes()} 6s ease-in-out infinite;
`

export const FillingBlock = ({ color, completion }: Props) => {
  return (
    <Container $color={color}>
      <Filler
        $color={color}
        style={{ height: toPercents(Math.min(completion, 1)) }}
      />
    </Container>
  )
}
