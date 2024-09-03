import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { ReactNode } from 'react'
import styled from 'styled-components'

interface ScheduleCheckItemProps {
  value: boolean
  label: ReactNode
}

const CheckContainer = styled.div`
  background: ${getColor('mist')};
  ${round};
  ${sameDimensions(24)};
  ${centerContent};
  font-size: 14px;
  color: ${getColor('success')};
`

export const ScheduleCheckItem = ({ value, label }: ScheduleCheckItemProps) => {
  return (
    <HStack alignItems="start" gap={8}>
      <CheckContainer>{value && <CheckIcon />}</CheckContainer>
      <Text height="large" color={value ? 'supporting' : 'shy'} as="div">
        {label}
      </Text>
    </HStack>
  )
}
