import { GoalTarget } from '@increaser/entities/Goal'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CircleIcon } from '@lib/ui/icons/CircleIcon'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'
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
  width: 120px;
`

export const GoalTargetInput = ({
  value,
  onChange,
}: InputProps<GoalTarget | null>) => {
  return (
    <Container>
      <Switch
        size="s"
        label="Track a number"
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
              unit={<CircleIcon />}
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
              unit={<TargetIcon />}
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
            <Text color="shy">
              {toPercents(value.current / value.value, 'round')}
            </Text>
          ) : null}
        </HStackSeparatedBy>
      )}
    </Container>
  )
}
