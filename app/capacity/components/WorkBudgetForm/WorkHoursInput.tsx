import styled from 'styled-components'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { Text } from '@increaser/ui/text'

import { maxHoursPerDay } from './useWorkBudgetForm'
import { ShyCheckbox } from 'ui/ShyCheckbox'
import { CountInput } from 'ui/CountInput'
import { verticalPadding } from '@increaser/ui/css/verticalPadding'

interface WorkHoursInputProps {
  value: number
  color: HSLA
  onChange: (value: number) => void
  defaultValue: number
  isOptional?: boolean
  label: string
  daysNumber: number
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 60px;
  align-items: center;
  ${verticalPadding(8)}

  > * {
    :last-child {
      justify-self: end;
    }
  }
`

export const WorkHoursInput = ({
  value,
  color,
  label,
  defaultValue,
  onChange,
  daysNumber,
}: WorkHoursInputProps) => {
  return (
    <Container>
      <ShyCheckbox
        value={!!value}
        onChange={(value) => onChange(value ? defaultValue : 0)}
        label={label}
        color={color}
      />
      {
        <CountInput
          value={value}
          color={color}
          max={maxHoursPerDay}
          onChange={onChange}
          formatValue={(v) => `${v} h`}
        />
      }
      <Text size={16} weight="bold">
        {value} h{' '}
        <Text size={14} weight="regular" as="span" color="shy">
          × {daysNumber}
        </Text>
      </Text>
    </Container>
  )
}
