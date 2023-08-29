import styled, { css } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { InvisibleHTMLRadio } from '@increaser/ui/ui/inputs/InvisibleHTMLRadio'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getHorizontalPaddingCSS } from '@increaser/ui/ui/utils/getHorizontalPaddingCSS'
import { EnhancedProject } from 'projects/Project'

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
  ${getHorizontalPaddingCSS(12)}
  border-radius: 8px;
  ${centerContentCSS}
  cursor: pointer;

  ${defaultTransitionCSS}

  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  ${defaultTransitionCSS}
  ${({ selected, $color, theme }) =>
    selected
      ? css`
          border-color: ${$color.toCssValue()};
        `
      : css`
          :hover {
            border-color: ${theme.colors.mistExtra.toCssValue()};
          }
        `}
`
