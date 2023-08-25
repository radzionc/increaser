import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 4px;
  position: relative;
`

const getProgressAnimation = (startedAt: number) => keyframes`
  0% {
    --startedAt=${startedAt};
    width: 0%;
  }

  100% {
    width: 100%
  }
`

interface Props {
  startedAt: number
  duration: number
}

const Content = styled.div<Props>`
  position: absolute;
  left: 0;
  top: 0;

  height: 100%;

  animation: ${({ startedAt }) => getProgressAnimation(startedAt)}
    ${({ duration }) => duration}ms linear;
  background: ${({ theme }) => theme.colors['text'].toCssValue()};
`

export const ProgressLine = React.memo(({ startedAt, duration }: Props) => {
  return (
    <Container>
      <Content startedAt={startedAt} duration={duration} />
    </Container>
  )
})
