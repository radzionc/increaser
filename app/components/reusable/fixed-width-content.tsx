import React from 'react'
import styled from 'styled-components'
import { Spacer } from '@increaser/ui/layout/Spacer'
import { toSizeUnit } from '@increaser/ui/css/toSizeUnit'

const Container = styled.div<{ width: number | string }>`
  max-width: ${({ width }) => toSizeUnit(width)};
  width: ${({ width }) => toSizeUnit(width)};
  height: 100%;
  @media (max-width: 1250px) {
    width: 100%;
  }
`

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
  width?: number | string
}

export const FixedWidthContent = ({ children, style, width = 930 }: Props) => {
  return (
    <Container width={width} style={style}>
      {children}
      <Spacer height={20} />
    </Container>
  )
}
