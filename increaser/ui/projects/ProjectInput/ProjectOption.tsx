import styled from 'styled-components'
import { EnhancedProject } from '../EnhancedProject'
import { HStack } from '@lib/ui/layout/Stack'
import { cropText } from '@lib/ui/css/cropText'
import { Text } from '@lib/ui/text'

import { textInputPadding } from '@lib/ui/css/textInput'
import { ProjectIdentifier } from './ProjectIdentifier'
import { ReactNode } from 'react'

interface ProjectOptionProps {
  value: EnhancedProject
  primaryStatistic?: ReactNode
}

const OptionContent = styled(HStack)`
  ${cropText};
`

export const ProjectOption = ({
  value,
  primaryStatistic,
}: ProjectOptionProps) => {
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
        <Text cropped size={14} weight="semibold">
          {value.name}
        </Text>
      </OptionContent>
      {primaryStatistic}
    </HStack>
  )
}
