import styled, { css } from 'styled-components'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { getColor } from '@increaser/ui/theme/getters'
import { transition } from '@increaser/ui/css/transition'
import { interactive } from '@increaser/ui/css/interactive'

interface Props {
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
  border-radius: 8px;
  font-weight: 500;
  color: ${getColor('textSupporting')};

  :hover {
    background: ${getColor('mist')};
  }

  :active {
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
}: Props) => {
  return (
    <Container isSelected={isActive}>
      <Text size={18} style={{ position: 'relative' }} as="div">
        <HStack gap={8}>
          <IconWrapper>{icon}</IconWrapper>
          <div>{name}</div>
        </HStack>
        {decoration}
      </Text>
    </Container>
  )
}
