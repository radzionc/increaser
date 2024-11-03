import { GoalTarget } from '@increaser/entities/Goal'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'
import { Switch } from '@lib/ui/inputs/Switch'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { hStack } from '@lib/ui/css/stack'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { Text } from '@lib/ui/text'
import { toPercents } from '@lib/utils/toPercents'
import { panelFormConfig } from '../../form/panel/config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'

const Container = styled.div`
  padding: 0;

  min-height: ${toSizeUnit(panelFormConfig.sectionMinHeight)};

  > * {
    &:first-child {
      ${horizontalPadding(panelDefaultPadding)};
    }

    &:only-child {
      flex: 1;
    }
  }

  ${hStack({ alignItems: 'stretch' })}
`

const Input = styled(AmountTextInput)`
  height: 40px;
  width: 100px;
`

export const GoalTargetInput = ({
  value,
  onChange,
}: InputProps<GoalTarget | null>) => {
  return (
    <Container>
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
        <HStackSeparatedBy gap={8} separator={<Text color="shy">~</Text>}>
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
          {value.value &&
          value.value > 0 &&
          value.current &&
          value.current > 0 ? (
            <Text color="supporting">
              <EmphasizeNumbers
                value={toPercents(value.current / value.value, 'round')}
              />
            </Text>
          ) : null}
        </HStackSeparatedBy>
      )}
    </Container>
  )
}
