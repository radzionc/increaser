import styled, { css } from 'styled-components'

import { getColor } from '../theme/getters'
import { CenterAbsolutely } from '../CenterAbsolutely'
import { getHoverVariant } from '../colors/getHoverVariant'
import { match } from '../../shared/utils/match'
import { Spinner } from '../Spinner'
import { Tooltip } from '../Tooltip'
import { defaultTransitionCSS } from '../animations/transitions'
import { centerContentCSS } from '../utils/centerContentCSS'
import { getCSSUnit } from '../utils/getCSSUnit'
import { getHorizontalPaddingCSS } from '../utils/getHorizontalPaddingCSS'
import { UnstyledButton } from './UnstyledButton'

export const buttonSizes = ['xs', 's', 'm', 'l', 'xl'] as const

type ButtonSize = (typeof buttonSizes)[number]

export const buttonKinds = [
  'primary',
  'secondary',
  'reversed',
  'alert',
  'outlined',
  'outlinedAlert',
  'ghost',
  'ghostSecondary',
] as const

export type ButtonKind = (typeof buttonKinds)[number]

interface ContainerProps {
  size: ButtonSize
  isDisabled?: boolean
  isLoading?: boolean
  isRounded?: boolean
  kind: ButtonKind
}

const Container = styled(UnstyledButton)<ContainerProps>`
  ${defaultTransitionCSS};
  ${centerContentCSS};

  position: relative;

  white-space: nowrap;
  font-weight: 500;

  border-radius: ${({ isRounded }) => getCSSUnit(isRounded ? 100 : 8)};

  ${({ size }) =>
    match(size, {
      xs: () => css`
        ${getHorizontalPaddingCSS(8)}
        height: 28px;
        font-size: 14px;
      `,
      s: () => css`
        ${getHorizontalPaddingCSS(16)}
        height: 36px;
        font-size: 14px;
      `,
      m: () => css`
        ${getHorizontalPaddingCSS(20)}
        height: 40px;
        font-size: 16px;
      `,
      l: () => css`
        ${getHorizontalPaddingCSS(20)}
        height: 48px;
        font-size: 16px;
      `,
      xl: () => css`
        ${getHorizontalPaddingCSS(40)}
        height: 56px;
        font-size: 18px;
      `,
    })}

  ${({ kind }) =>
    match(kind, {
      primary: () => css`
        background: ${getColor('primary')};
        color: ${getColor('white')};
      `,
      secondary: () => css`
        background: ${getColor('mist')};
        color: ${getColor('contrast')};
      `,
      reversed: () => css`
        background: ${getColor('contrast')};
        color: ${getColor('background')};
      `,
      alert: () => css`
        background: ${getColor('alert')};
        color: ${getColor('white')};
      `,
      outlined: () => css`
        border: 1px solid ${getColor('mistExtra')};
        color: ${getColor('contrast')};
      `,
      outlinedAlert: () => css`
        border: 1px solid ${getColor('alert')};
        color: ${getColor('alert')};
      `,
      ghost: () => css`
        color: ${getColor('contrast')};
      `,
      ghostSecondary: () => css`
        color: ${getColor('textSupporting')};
      `,
    })}
  
  ${({ isDisabled, isLoading, kind }) =>
    !isDisabled &&
    !isLoading &&
    css`
      :hover {
        ${match(kind, {
          primary: () => css`
            background: ${({ theme }) =>
              getHoverVariant(theme.colors.primary).toCssValue()};
          `,
          secondary: () => css`
            background: ${getColor('mistExtra')};
          `,
          reversed: () => css`
            background: ${getColor('text')};
          `,
          alert: () => css`
            background: ${({ theme }) =>
              getHoverVariant(theme.colors.alert).toCssValue()};
          `,
          outlined: () => css`
            background: ${getColor('mist')};
            color: ${getColor('contrast')};
          `,
          outlinedAlert: () => css`
            background: ${({ theme }) =>
              theme.colors.alert
                .getVariant({ a: (a) => a * 0.12 })
                .toCssValue()};
          `,
          ghost: () => css`
            background: ${getColor('mist')};
          `,
          ghostSecondary: () => css`
            background: ${getColor('mist')};
          `,
        })}
      }
    `};

  cursor: ${({ isDisabled, isLoading }) =>
    isDisabled ? 'initial' : isLoading ? 'wait' : 'pointer'};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.8;
    `};
`

export interface ButtonProps extends React.ComponentProps<typeof Container> {
  size?: ButtonSize
  isDisabled?: boolean | string
  isLoading?: boolean
  isRounded?: boolean
  kind?: ButtonKind
  onClick?: () => void
}

const Hide = styled.div`
  opacity: 0;
`

export const Button = ({
  children,
  size = 'm',
  isDisabled = false,
  isLoading = false,
  onClick,
  kind = 'primary',
  ...rest
}: ButtonProps) => {
  const content = isLoading ? (
    <>
      <Hide>{children}</Hide>
      <CenterAbsolutely>
        <Spinner />
      </CenterAbsolutely>
    </>
  ) : (
    children
  )

  const containerProps = {
    kind,
    size,
    isDisabled: !!isDisabled,
    isLoading,
    onClick: isDisabled || isLoading ? undefined : onClick,
    ...rest,
  }

  if (typeof isDisabled === 'string') {
    return (
      <Tooltip
        content={isDisabled}
        renderOpener={(props) => (
          <Container {...props} {...containerProps}>
            {content}
          </Container>
        )}
      />
    )
  }

  return <Container {...containerProps}>{content}</Container>
}
