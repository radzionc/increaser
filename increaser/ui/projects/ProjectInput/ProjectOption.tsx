import styled from 'styled-components'
import { EnhancedProject } from '../EnhancedProject'
import { HStack } from '@lib/ui/layout/Stack'
import { cropText } from '@lib/ui/css/cropText'
import { Text } from '@lib/ui/text'

import { textInputPadding } from '@lib/ui/css/textInput'
import { ProjectIdentifier } from './ProjectIdentifier'

interface ProjectOptionProps {
  value: EnhancedProject
}

const OptionContent = styled(HStack)`
  ${cropText};
`

export const ProjectOption = ({ value }: ProjectOptionProps) => {
  return (
    <HStack
      alignItems="center"
      fullWidth
      justifyContent="space-between"
      gap={20}
      style={{
        minHeight: 36,
      }}
    >
      <OptionContent alignItems="center" gap={textInputPadding}>
        <ProjectIdentifier>{value.emoji}</ProjectIdentifier>
        <Text size={14} weight="semibold">
          {value.name}
        </Text>
      </OptionContent>
    </HStack>
  )
}
