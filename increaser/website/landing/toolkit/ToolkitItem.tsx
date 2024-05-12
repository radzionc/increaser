import { ComponentWithValueProps } from '@lib/ui/props'
import { Tool, toolColor, toolNames, toolsIcons } from './tools'
import styled, { useTheme } from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

const IconContainer = styled(IconWrapper)`
  font-size: 18px;
`

const Container = styled(HStack)`
  gap: 8px;
  align-items: center;
  padding: 12px;
  ${borderRadius.s};
  background: ${getColor('foreground')};
  color: ${getColor('contrast')};
  font-weight: 500;
  font-size: 14px;
`

export const ToolkitItem = ({ value }: ComponentWithValueProps<Tool>) => {
  const { colors } = useTheme()
  return (
    <Container>
      <IconContainer
        style={{ color: colors.getLabelColor(toolColor[value]).toCssValue() }}
      >
        {toolsIcons[value]}
      </IconContainer>
      {toolNames[value]}
    </Container>
  )
}
