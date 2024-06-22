import { getColor } from '@lib/ui/theme/getters'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const vaporAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-12px);
    opacity: 0;
  }
`

const VaporLine = styled.line<{ delay: number }>`
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${vaporAnimation} 2s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
`

const Container = styled.svg`
  color: ${getColor('idle')};
  overflow: visible;
`

export const AnimatedCoffeeIcon: React.FC = () => (
  <Container
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <VaporLine x1="6" y1="8" x2="6" y2="4" delay={0} />
    <VaporLine x1="10" y1="8" x2="10" y2="4" delay={0.5} />
    <VaporLine x1="14" y1="8" x2="14" y2="4" delay={1} />
  </Container>
)
