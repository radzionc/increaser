import { ReactNode } from 'react'
import { useTheme } from 'styled-components'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

type HabitStatisticKind = 'regular' | 'alert'

interface HabitStatisticProps {
  icon: ReactNode
  value: ReactNode
  name: ReactNode
  kind: HabitStatisticKind
  explanation?: ReactNode
}

export const HabitStatistic = ({
  icon,
  value,
  name,
  kind,
}: HabitStatisticProps) => {
  const { colors } = useTheme()

  return (
    <Text as="div" color="supporting" weight="semibold">
      <HStack alignItems="center" gap={4}>
        <>
          <HStack
            style={{
              color: (kind === 'alert'
                ? colors.alert
                : colors.textShy
              ).toCssValue(),
            }}
          >
            <>{icon}</>
          </HStack>{' '}
          <Text color={kind} as="span">
            {value}
          </Text>{' '}
          {name}
        </>
      </HStack>
    </Text>
  )
}
