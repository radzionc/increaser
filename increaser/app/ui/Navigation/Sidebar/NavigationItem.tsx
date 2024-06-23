import styled, { css } from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { interactive } from '@lib/ui/css/interactive'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { ComponentWithActiveState, UIComponentProps } from '@lib/ui/props'

export type NavigationItemProps = UIComponentProps & {
  icon: React.ReactNode
  name: React.ReactNode
  isActive?: boolean
  decoration?: React.ReactNode
}

export const Container = styled.div<ComponentWithActiveState>`
  padding: 0 12px;
  height: 44px;
  ${interactive};
  display: flex;
  align-items: center;
  width: 100%;
  ${transition};
  ${borderRadius.s};
  font-weight: 500;
  color: ${getColor('textSupporting')};
  position: relative;

  &:hover {
    background: ${getColor('mist')};
  }

  &:active {
    background: ${getColor('mistExtra')};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
      color: ${getColor('contrast')};
    `}
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
`

export const NavigationItem = ({
  icon,
  name,
  isActive = false,
  decoration = null,
  ...rest
}: NavigationItemProps) => {
  return (
    <Container isActive={isActive} {...rest}>
      <HStack gap={8}>
        <IconWrapper>{icon}</IconWrapper>
        <div>{name}</div>
      </HStack>
      {decoration}
    </Container>
  )
}
