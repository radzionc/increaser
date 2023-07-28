import { Text } from '@increaser/ui/ui/Text'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { roundedCSS } from '@increaser/ui/ui/utils/roundedCSS'
import { range } from 'shared/utils/range'
import { toPercents } from 'shared/utils/toPercents'
import styled, { useTheme } from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  /* cursor: ew-resize; */
  ${centerContentCSS}
`

const Option = styled.div`
  position: absolute;
  width: 2px;
  ${roundedCSS};
  background: var(--color);
`

const Recommended = styled.div`
  position: absolute;
  height: 6px;
  width: 6px;
  ${roundedCSS};
  background: var(--color);
`

const InteractiveArea = styled.div<{ $color: HSLA; isSelected: boolean }>`
  position: absolute;
  height: 100%;
  cursor: pointer;
  color: transparent;
  --color: ${({ $color }) => $color.toCssValue()};
  :hover {
    --color: ${({ theme, isSelected, $color }) =>
      (isSelected ? $color : theme.colors.contrast).toCssValue()};
    color: var(--color);
  }
  ${centerContentCSS}
`

const DurationTextWr = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${centerContentCSS};
  overflow: visible;
`

const DurationText = styled(Text)`
  position: absolute;
  top: -10px;
  white-space: nowrap;
`

export interface CountInputProps {
  value: number
  max: number
  onChange: (value: number) => void
  color: HSLA
  formatValue: (value: number) => string
  recommendedValues?: number[]
}

export const CountInput = ({
  value,
  onChange,
  color,
  max,
  formatValue,
  recommendedValues = [],
}: CountInputProps) => {
  const { colors } = useTheme()

  const steps = range(max)

  return (
    <Container>
      {steps.map((index) => {
        const step = index + 1

        const isRecommended = recommendedValues.includes(step)

        return (
          <InteractiveArea
            style={{
              left: toPercents(index / max),
              width: toPercents(1 / max),
            }}
            isSelected={step === value}
            $color={step <= value ? color : colors.mistExtra}
            onClick={() => onChange(step)}
            key={index}
          >
            <Option
              key={index}
              style={{
                height: 16,
              }}
            />
            {isRecommended && <Recommended />}
            <DurationTextWr>
              <DurationText weight="semibold" size={14}>
                {formatValue(step)}
              </DurationText>
            </DurationTextWr>
          </InteractiveArea>
        )
      })}
    </Container>
  )
}
