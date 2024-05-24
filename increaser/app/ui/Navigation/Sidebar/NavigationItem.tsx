import styled, { css } from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { interactive } from '@lib/ui/css/interactive'
import { borderRadius } from '@lib/ui/css/borderRadius'

export type NavigationItemProps = {
  icon: React.ReactNode
  name: React.ReactNode
  isActive?: boolean
  decoration?: React.ReactNode
}

export const Container = styled.div<{ isSelected?: boolean }>`
  padding: 0 16px;
  height: 48px;
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

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.colors.mist.toCssValue()};
      color: ${theme.colors.text.toCssValue()};
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
  isActive,
  decoration = null,
}: NavigationItemProps) => {
  return (
    <Container isSelected={isActive}>
      <Text size={18} as="div">
        <HStack gap={8}>
          <IconWrapper>{icon}</IconWrapper>
          <div>{name}</div>
        </HStack>
      </Text>
      {decoration}
    </Container>
  )
}
