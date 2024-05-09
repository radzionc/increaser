import React from 'react'
import styled from 'styled-components'
import { Spacer } from '@lib/ui/layout/Spacer'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ComponentWithChildrenProps, UIComponentProps } from '@lib/ui/props'

const Container = styled.div<{ width: number | string }>`
  max-width: ${({ width }) => toSizeUnit(width)};
  width: ${({ width }) => toSizeUnit(width)};
  height: 100%;
  @media (max-width: 1250px) {
    width: 100%;
  }
`

type FixedWidthContentProps = UIComponentProps &
  ComponentWithChildrenProps & {
    width?: number | string
  }

export const FixedWidthContent = ({
  children,
  width = 930,
  ...rest
}: FixedWidthContentProps) => {
  return (
    <Container width={width} {...rest}>
      {children}
      <Spacer height={20} />
    </Container>
  )
}
