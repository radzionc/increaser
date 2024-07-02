import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ReactNode } from 'react'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

const lineHeight = 22

const Container = styled(HStack)`
  font-size: 14px;
  align-items: start;
  gap: 8px;
  color: ${getColor('textSupporting')};
  white-space: pre-line;
  line-height: ${toSizeUnit(lineHeight)};
`

const IconContainer = styled(IconWrapper)`
  height: ${toSizeUnit(lineHeight)};
`

type GoalSectionProps = ComponentWithChildrenProps & {
  icon: ReactNode
}

export const GoalSection = ({ children, icon }: GoalSectionProps) => {
  return (
    <Container>
      <IconContainer>{icon}</IconContainer>
      {children}
    </Container>
  )
}
