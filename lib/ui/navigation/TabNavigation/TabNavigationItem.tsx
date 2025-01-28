import styled, { css } from 'styled-components'

import {
  InvisibleHTMLRadio,
  InvisibleHTMLRadioProps,
} from '../../inputs/InvisibleHTMLRadio'
import { centerContent } from '../../css/centerContent'
import { IsActiveProp, ChildrenProp, UiProps } from '../../props'
import { interactive } from '../../css/interactive'
import { getColor } from '../../theme/getters'
import { round } from '../../css/round'

const Container = styled.label<IsActiveProp>`
  ${interactive};
  ${round};
  text-decoration: none;
  ${centerContent};
  font-weight: 500;
  font-size: 14px;
  position: relative;

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

type TabNavigationItemProps = InvisibleHTMLRadioProps & ChildrenProp & UiProps

export const TabNavigationItem = ({
  isSelected,
  children,
  className,
  style,
  ...rest
}: TabNavigationItemProps) => {
  return (
    <Container
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
