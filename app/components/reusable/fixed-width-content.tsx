import React from 'react'
import styled from 'styled-components'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'

const Container = styled.div<{ width: number | string }>`
  max-width: ${({ width }) => getCSSUnit(width)};
  width: ${({ width }) => getCSSUnit(width)};
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
