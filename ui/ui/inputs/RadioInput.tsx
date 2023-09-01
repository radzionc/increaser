import styled from 'styled-components'
import { InputProps } from '../../props'
import { defaultBorderRadiusCSS } from '../borderRadius'
import { InvisibleHTMLRadio } from './InvisibleHTMLRadio'
import { getColor, matchColor } from '../theme/getters'
import { defaultTransitionCSS } from '../animations/transitions'
import { HStack } from '../Stack'
import { interactiveCSS } from '../utils/interactiveCSS'
import { getSameDimensionsCSS } from '../utils/getSameDimensionsCSS'

interface RadioInputProps<T extends string> extends InputProps<T> {
  options: readonly T[]
  renderOption: (option: T) => React.ReactNode
}

const Indicator = styled.div<{ selected: boolean }>`
  ${getSameDimensionsCSS(8)};
  border-radius: 50%;
  background: ${matchColor('selected', {
    true: 'primary',
    false: 'mistExtra',
  })};
`

const Container = styled.label<{ selected: boolean }>`
  padding: 12px 20px;
  ${defaultBorderRadiusCSS};
  background: ${getColor('foreground')};
  ${defaultTransitionCSS};
  ${interactiveCSS};

  :hover {
    background: ${getColor('mist')};
  }

  color: ${matchColor('selected', {
    true: 'contrast',
    false: 'text',
  })};
  font-weight: 500;
`

export const RadioInput = <T extends string>({
  value,
  onChange,
  options,
  renderOption,
}: RadioInputProps<T>) => {
  return (
    <HStack gap={4}>
      {options.map((option) => {
        const isSelected = option === value
        return (
          <Container selected={isSelected} key={option}>
            <HStack alignItems="center" gap={8}>
              <Indicator selected={isSelected} />
              {renderOption(option)}
            </HStack>
            <InvisibleHTMLRadio
              isSelected={isSelected}
              value={option}
              groupName="project"
              onSelect={() => onChange(option)}
            />
          </Container>
        )
      })}
    </HStack>
  )
}
