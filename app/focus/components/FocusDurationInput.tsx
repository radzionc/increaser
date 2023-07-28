import {
  FocusDuration,
  maxFocusDuration,
  recommendedFocusDurations,
} from 'focus/FocusDuration'
import { range } from 'shared/utils/range'
import styled, { useTheme } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { roundedCSS } from '@increaser/ui/ui/utils/roundedCSS'

interface FocusDurationInputProps {
  value: FocusDuration
  onChange: (value: FocusDuration) => void
  color?: HSLA
}

const Container = styled.div`
  width: 100%;
  height: 44px;
  position: relative;
  display: grid;

  > * {
    :first-child {
      padding-left: 2px;
      justify-content: start;
    }
  }

  > * {
    :last-child {
      padding-right: 2px;
      justify-content: end;
    }
  }
`

const InteractiveArea = styled.div<{ $color: HSLA; isSelected: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: end;
  justify-content: center;

  cursor: pointer;
  --color: ${({ $color }) => $color.toCssValue()};
  color: transparent;
  :hover {
    --color: ${({ theme, isSelected, $color }) =>
      (isSelected ? $color : theme.colors.contrast).toCssValue()};
    color: var(--color);
  }
`

const DurationTextWr = styled.div`
  position: absolute;
  width: 100%;
  ${centerContentCSS};
  overflow: visible;
  top: -22px;
`

const DurationText = styled(Text)`
  white-space: nowrap;
`

const Option = styled.div`
  width: 2px;
  ${roundedCSS};
  background: var(--color);
  ${defaultTransitionCSS};
  position: relative;
`

export const FocusDurationInput = ({
  value,
  onChange,
}: FocusDurationInputProps) => {
  const { colors } = useTheme()
  const color = colors.contrast

  const max = maxFocusDuration / 5
  const steps = range(max)

  const recommendedValues = recommendedFocusDurations.map((v) => v / 5)

  const gridTemplateColumns = `1fr repeat(${max - 2}, 2fr) 1fr`

  return (
    <Container style={{ gridTemplateColumns }}>
      {steps.map((index) => {
        const step = index + 1

        const isRecommended = recommendedValues.includes(step)

        const duration = (step * 5) as FocusDuration
        const isSelected = duration === value

        const optionHeight = isRecommended ? 26 : 12

        return (
          <InteractiveArea
            isSelected={step === value}
            $color={duration <= value ? color : colors.textShy}
            onClick={() => onChange(duration)}
            key={index}
          >
            <Option
              key={index}
              style={{
                height: optionHeight,
              }}
            >
              <DurationTextWr>
                <DurationText
                  style={{ color: isSelected ? color.toCssValue() : undefined }}
                  weight={isSelected ? 'bold' : 'regular'}
                  size={14}
                >
                  {duration}
                </DurationText>
              </DurationTextWr>
            </Option>
          </InteractiveArea>
        )
      })}
    </Container>
  )
}
