import { centerContent } from '@increaser/ui/css/centerContent'
import { round } from '@increaser/ui/css/round'
import { sameDimensions } from '@increaser/ui/css/sameDimensions'
import { CheckIcon } from '@increaser/ui/icons/CheckIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { getColor } from '@increaser/ui/theme/getters'
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
    <HStack alignItems="center" gap={8}>
      <CheckContainer>{value && <CheckIcon />}</CheckContainer>
      <Text color="supporting" as="div">
        {label}
      </Text>
    </HStack>
  )
}
