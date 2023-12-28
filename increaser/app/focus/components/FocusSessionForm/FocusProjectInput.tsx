import { EnhancedProject } from '@increaser/app/projects/Project'
import styled, { css } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { Center } from '@lib/ui/layout/Center'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

import { ProjectGoalBadge } from './ProjectGoalBadge'

interface ProjectRadioInputProps {
  value?: string
  onChange: (value: string) => void
  options: EnhancedProject[]
}

export const FocusProjectInput = ({
  value,
  onChange,
  options,
}: ProjectRadioInputProps) => {
  if (!options.length) {
    return <Text>No projects</Text>
  }

  return (
    <UniformColumnGrid gap={4} minChildrenWidth={160}>
      {options.map((project) => {
        const { id, name } = project
        const isSelected = id === value
        return (
          <Option as="label" key={id} selected={isSelected}>
            <HStack style={{ maxWidth: '100%' }} alignItems="center" gap={8}>
              <Identifier>
                <ProjectGoalBadge project={project} />
              </Identifier>
              <Text cropped>{name}</Text>
            </HStack>
            <InvisibleHTMLRadio
              isSelected={isSelected}
              value={id}
              groupName="project"
              onSelect={() => onChange(id)}
            />
          </Option>
        )
      })}
    </UniformColumnGrid>
  )
}

const Identifier = styled(Center)`
  width: 16px;
  font-size: 14px;
`

const Option = styled.div<{
  selected: boolean
}>`
  height: 52px;
  ${horizontalPadding(12)}
  border-radius: 8px;
  ${centerContent}
  justify-content: start;
  cursor: pointer;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${transition}

  ${transition}
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  border: 1px solid ${({ theme }) => theme.colors.background.toCssValue()};
  background: ${({ theme }) => theme.colors.background.toCssValue()};

  ${({ selected, theme }) =>
    selected
      ? css`
          background: ${theme.colors.background.toCssValue()};
          color: ${theme.colors.text.toCssValue()};
          border-color: ${theme.colors.text.toCssValue()};
        `
      : css`
          &:hover {
            border-color: ${theme.colors.mist.toCssValue()};
            color: ${({ theme }) => theme.colors.text.toCssValue()};
          }
        `}
`
