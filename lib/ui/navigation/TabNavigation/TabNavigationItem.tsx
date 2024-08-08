import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import {
  InvisibleHTMLRadio,
  InvisibleHTMLRadioProps,
} from '../../inputs/InvisibleHTMLRadio'
import { centerContent } from '../../css/centerContent'
import {
  ComponentWithActiveState,
  ComponentWithChildrenProps,
  UIComponentProps,
} from '../../props'
import { interactive } from '../../css/interactive'
import { getColor } from '../../theme/getters'
import { round } from '../../css/round'

const Container = styled.label<ComponentWithActiveState>`
  ${interactive};
  ${round};
  text-decoration: none;
  ${centerContent};
  font-weight: 500;
  font-size: 14px;

  padding: 0 20px;
  height: 40px;

  border: 1px solid ${getColor('mistExtra')};
  color: ${getColor('textSupporting')};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
          background: ${getColor('mist')};
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`

type TabNavigationItemProps = InvisibleHTMLRadioProps &
  ComponentWithChildrenProps &
  UIComponentProps

export const TabNavigationItem = ({
  isSelected,
  children,
  className,
  style,
  ...rest
}: TabNavigationItemProps) => {
  const ref = useRef<HTMLLabelElement>(null)
  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [isSelected])

  return (
    <Container
      ref={ref}
      className={className}
      style={style}
      tabIndex={-1}
      isActive={isSelected}
    >
      {children}
      <InvisibleHTMLRadio isSelected={isSelected} {...rest} />
    </Container>
  )
}
