import styled, { css } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { HSLA } from '@lib/ui/colors/HSLA'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

interface ProjectRadioInputProps {
  value?: string
  onChange: (value: string) => void
  options: EnhancedProject[]
}

export const ProjectRadioInput = ({
  value,
  onChange,
  options,
}: ProjectRadioInputProps) => {
  if (!options.length) {
    return <Text>No projects</Text>
  }

  return (
    <HStack gap={8} wrap="wrap">
      {options.map(({ id, hslaColor, emoji, name }) => {
        const isSelected = id === value
        return (
          <Container
            as="label"
            key={id}
            $color={hslaColor}
            selected={isSelected}
          >
            <EmojiTextPrefix emoji={emoji} />
            {name}
            <InvisibleHTMLRadio
              isSelected={isSelected}
              value={id}
              groupName="project"
              onSelect={() => onChange(id)}
            />
          </Container>
        )
      })}
    </HStack>
  )
}

const Container = styled.div<{
  selected: boolean
  $color: HSLA
}>`
  height: 48px;
  ${horizontalPadding(12)}
  border-radius: 8px;
  ${centerContent}
  cursor: pointer;

  ${transition}

  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  ${transition}
  ${({ selected, $color, theme }) =>
    selected
      ? css`
          border-color: ${$color.toCssValue()};
        `
      : css`
          &:hover {
            border-color: ${theme.colors.mistExtra.toCssValue()};
          }
        `}
`
