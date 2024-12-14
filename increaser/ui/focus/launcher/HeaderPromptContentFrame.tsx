import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/css/stack'
import { ComponentWithIconProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'
import styled from 'styled-components'

const Container = styled(HStack)`
  align-items: center;
  gap: 8px;
`

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textPrimary')};
  font-size: 16px;
`

export const HeaderPromptContentFrame = ({
  children,
  icon,
}: ComponentWithIconProps & ComponentProps<typeof Container>) => {
  return (
    <Container>
      <IconContainer>{icon}</IconContainer>
      {children}
    </Container>
  )
}
