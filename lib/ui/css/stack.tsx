import React from 'react'
import styled, { css } from 'styled-components'
import { toSizeUnit } from '../css/toSizeUnit'

type FixedDirectionStackProps = {
  gap?: React.CSSProperties['gap']
  alignItems?: React.CSSProperties['alignItems']
  justifyContent?: React.CSSProperties['justifyContent']
  wrap?: React.CSSProperties['flexWrap']
  fullWidth?: boolean
  fullHeight?: boolean
  fill?: boolean
  children?: React.ReactNode
}

export type StackProps = FixedDirectionStackProps & {
  direction: React.CSSProperties['flexDirection']
}

const formatFlexAlignment = (
  value:
    | React.CSSProperties['alignItems']
    | React.CSSProperties['justifyContent'],
) => {
  if (value === 'end' || value === 'start') {
    return `flex-${value}`
  }

  return value
}

export const stack = ({
  gap,
  alignItems,
  justifyContent,
  wrap,
  fullWidth,
  fullHeight,
  direction,
  fill,
}: StackProps) => css`
  display: flex;
  flex-direction: ${direction};
  ${gap &&
  css`
    gap: ${toSizeUnit(gap)};
  `}
  ${alignItems &&
  css`
    align-items: ${formatFlexAlignment(alignItems)};
  `}
  ${justifyContent &&
  css`
    justify-content: ${formatFlexAlignment(justifyContent)};
  `}
  ${wrap &&
  css`
    flex-wrap: ${wrap};
  `}
  ${fullWidth &&
  css`
    width: 100%;
  `}
  ${fullHeight &&
  css`
    height: 100%;
  `}
    ${fill &&
  css`
    flex: 1;
  `}
`

export const vStack = (props: FixedDirectionStackProps) =>
  stack({ ...props, direction: 'column' })

export const hStack = (props: FixedDirectionStackProps) =>
  stack({ ...props, direction: 'row' })

export const VStack = styled.div<FixedDirectionStackProps>`
  ${vStack}
`

export const HStack = styled.div<FixedDirectionStackProps>`
  ${hStack}
`

export const Stack = styled.div<StackProps>`
  ${stack}
`
