import { ComponentProps, Ref, forwardRef } from 'react'
import styled from 'styled-components'
import { UnstyledButton } from './UnstyledButton'
import { match } from '@lib/utils/match'
import { centerContent } from '../css/centerContent'
import { sameDimensions } from '../css/sameDimensions'
import { toSizeUnit } from '../css/toSizeUnit'
import { transition } from '../css/transition'
import { matchColor } from '../theme/getters'
import { borderRadius } from '../css/borderRadius'

export const iconButtonSizes = ['s', 'm', 'l'] as const
export type IconButtonSize = (typeof iconButtonSizes)[number]

export const iconButtonKinds = ['regular', 'secondary', 'alert'] as const
export type IconButtonKind = (typeof iconButtonKinds)[number]

export const iconButtonSizeRecord: Record<IconButtonSize, number> = {
  s: 24,
  m: 32,
  l: 40,
}

interface ContainerProps {
  size: IconButtonSize
  kind: IconButtonKind
}

const Container = styled(UnstyledButton)<ContainerProps>`
  position: relative;
  ${centerContent};
  ${({ size }) => sameDimensions(iconButtonSizeRecord[size])};

  color: ${matchColor('kind', {
    regular: 'text',
    secondary: 'text',
    alert: 'alert',
  })};

  font-size: ${({ size }) =>
    `calc(${toSizeUnit(iconButtonSizeRecord[size] * 0.6)})`};

  ${borderRadius.s};

  ${transition};

  background: ${({ kind, theme: { colors } }) =>
    match(kind, {
      regular: () => colors.mist,
      secondary: () => colors.transparent,
      alert: () => colors.transparent,
    }).toCssValue()};

  &:hover {
    background: ${({ kind, theme: { colors } }) =>
      match(kind, {
        regular: () => colors.mist,
        secondary: () => colors.mist,
        alert: () => colors.alert.getVariant({ a: (a) => a * 0.24 }),
      }).toCssValue()};

    color: ${matchColor('kind', {
      regular: 'contrast',
      secondary: 'contrast',
      alert: 'alert',
    })};
  }
`

export type IconButtonProps = Omit<
  ComponentProps<typeof Container>,
  'size' | 'kind'
> & {
  icon: React.ReactNode
  size?: IconButtonSize
  kind?: IconButtonKind
  title: string
  as?: React.ElementType
}

export const IconButton = forwardRef(function IconButton(
  {
    size = 'm',
    kind = 'regular',
    icon,
    type = 'button',
    ...rest
  }: IconButtonProps,
  ref: Ref<HTMLButtonElement> | null,
) {
  return (
    <Container type={type} kind={kind} ref={ref} size={size} {...rest}>
      {icon}
    </Container>
  )
})
