import { EnhancedProject } from 'projects/Project'
import styled, { css } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { Center } from '@increaser/ui/ui/Center'
import { InvisibleHTMLRadio } from '@increaser/ui/ui/inputs/InvisibleHTMLRadio'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getHorizontalPaddingCSS } from '@increaser/ui/ui/utils/getHorizontalPaddingCSS'

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
    <SameWidthChildrenRow gap={4} minChildrenWidth={160}>
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
    </SameWidthChildrenRow>
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
  ${getHorizontalPaddingCSS(12)}
  border-radius: 8px;
  ${centerContentCSS}
  justify-content: start;
  cursor: pointer;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${defaultTransitionCSS}

  ${defaultTransitionCSS}
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
          :hover {
            border-color: ${theme.colors.mist.toCssValue()};
            color: ${({ theme }) => theme.colors.text.toCssValue()};
          }
        `}
`
