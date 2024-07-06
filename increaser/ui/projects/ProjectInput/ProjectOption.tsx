import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { cropText } from '@lib/ui/css/cropText'
import { Text } from '@lib/ui/text'

import { ProjectIdentifier } from './ProjectIdentifier'
import { ReactNode } from 'react'
import { Project } from '@increaser/entities/Project'
import { textInputHorizontalPadding } from '@lib/ui/css/textInput'

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
        <Text cropped size={14} weight="semibold">
          {value.name}
        </Text>
      </OptionContent>
      {primaryStatistic}
    </HStack>
  )
}
