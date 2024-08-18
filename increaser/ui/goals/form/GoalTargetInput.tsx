import { GoalTarget } from '@increaser/entities/Goal'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CircleIcon } from '@lib/ui/icons/CircleIcon'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'
import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'
import { Switch } from '@lib/ui/inputs/Switch'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0;

  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

export const GoalTargetInput = ({
  value,
  onChange,
}: InputProps<GoalTarget | null>) => {
  return (
    <Container>
      <Switch
        size="s"
        label="Include measurable target"
        value={!!value}
        onChange={(value) => {
          onChange(
            value
              ? {
                  current: 0,
                  value: 0,
                }
              : null,
          )
        }}
      />
      {value && (
        <UniformColumnGrid maxChildrenWidth={160} gap={panelDefaultPadding}>
          <AmountTextInput
            unit={<CircleIcon />}
            label="Current"
            value={value.current || undefined}
            onValueChange={(current) => {
              onChange({
                ...value,
                current: current ?? 0,
              })
            }}
          />
          <AmountTextInput
            unit={<TargetIcon />}
            label="Target"
            value={value.value || undefined}
            onValueChange={(target) => {
              onChange({
                ...value,
                value: target ?? 0,
              })
            }}
          />
        </UniformColumnGrid>
      )}
    </Container>
  )
}
