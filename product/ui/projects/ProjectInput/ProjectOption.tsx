import { cropText } from '@lib/ui/css/cropText'
import { HStack } from '@lib/ui/css/stack'
import { textInputHorizontalPadding } from '@lib/ui/css/textInput'
import { Text } from '@lib/ui/text'
import { Project } from '@product/entities/Project'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { ProjectIdentifier } from './ProjectIdentifier'

interface ProjectOptionProps {
  value: Project
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
      <OptionContent alignItems="center" gap={textInputHorizontalPadding}>
        <ProjectIdentifier>{value.emoji}</ProjectIdentifier>
        <Text cropped size={14} weight="500">
          {value.name}
        </Text>
      </OptionContent>
      {primaryStatistic}
    </HStack>
  )
}
