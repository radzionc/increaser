import { GoalTarget } from '@increaser/entities/Goal'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'
import { Switch } from '@lib/ui/inputs/Switch'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { InputProps } from '@lib/ui/props'
import styled, { useTheme } from 'styled-components'
import { vStack } from '@lib/ui/css/stack'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { text, Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { ProgressRing } from '@lib/ui/progress/ProgressRing'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { textInputAutoWidth } from '@lib/ui/css/textInput'
import { PanelFormSwitchPrefixedSection } from '../../../form/panel/PanelFormSwitchPrefixedSection'

const Input = styled(AmountTextInput)`
  height: 40px;
  ${({ value, placeholder }) => textInputAutoWidth({ value, placeholder })};
`

const ProgressWrapper = styled.div`
  ${vStack({
    justifyContent: 'center',
  })}
  padding-left: ${toSizeUnit(panelDefaultPadding)};
`

const ProgressContainer = styled.div`
  ${sameDimensions(tightListItemMinHeight)};
  ${centerContent};
  position: relative;
  ${text({
    size: 12,
    color: 'contrast',
    weight: 600,
  })}
`

const Progress = styled(ProgressRing)`
  ${takeWholeSpaceAbsolutely};
`

export const GoalTargetInput = ({
  value,
  onChange,
}: InputProps<GoalTarget | null>) => {
  const { colors } = useTheme()

  return (
    <PanelFormSwitchPrefixedSection>
      <Switch
        size="s"
        label="Measure"
        value={!!value}
        onChange={(value) => {
          onChange(
            value
              ? {
                  current: null,
                  value: null,
                }
              : null,
          )
        }}
      />
      {value && (
        <HStackSeparatedBy gap={8} separator={<Text color="shy">/</Text>}>
          <Input
            value={value.current ?? null}
            placeholder="Current"
            onValueChange={(current) => {
              onChange({
                ...value,
                current,
              })
            }}
          />
          <Input
            placeholder="Target"
            value={value.value ?? null}
            onValueChange={(target) => {
              onChange({
                ...value,
                value: target,
              })
            }}
          />
        </HStackSeparatedBy>
      )}
      {value &&
      value.value &&
      value.value > 0 &&
      value.current &&
      value.current > 0 ? (
        <ProgressWrapper>
          <ProgressContainer>
            <Text size={12}>
              {Math.round((value.current * 100) / value.value)}
            </Text>
            <Progress
              size={tightListItemMinHeight}
              value={value.current / value.value}
              thickness={2}
              color={colors.textPrimary}
            ></Progress>
          </ProgressContainer>
        </ProgressWrapper>
      ) : null}
    </PanelFormSwitchPrefixedSection>
  )
}
