import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  ComponentWithActiveState,
  ComponentWithChildrenProps,
  TitledComponentProps,
} from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

type PlanSectionProps = ComponentWithChildrenProps &
  TitledComponentProps & {
    isCompleted: boolean
    index: number
  }

const Index = styled.div<ComponentWithActiveState>`
  ${centerContent};
  ${sameDimensions(24)};
  ${round}
  background: ${getColor('mist')};
  font-weight: 500;
  font-size: 14px;
  border: 1px solid ${getColor('mist')};
  color: ${getColor('contrast')};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('success')};
      border-color: ${getColor('success')};
    `}
`

export const PlanSection = ({
  children,
  title,
  isCompleted,
  index,
}: PlanSectionProps) => {
  return (
    <VStack gap={8}>
      <HStack alignItems="center" gap={8}>
        <Index isActive={isCompleted}>{index}</Index>
        <Text color="contrast" size={14} weight="semibold" as="div">
          {title}
        </Text>
      </HStack>
      {children}
    </VStack>
  )
}
