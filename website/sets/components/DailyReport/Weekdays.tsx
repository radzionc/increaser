import { useWeekday } from 'shared/hooks/useWeekday'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { WEEKDAYS, getShortWeekday } from '@increaser/utils/time'

export const Weekdays = () => {
  const today = useWeekday()

  return (
    <>
      {WEEKDAYS.map((weekday, index) => (
        <VStack style={{ flex: 1 }} alignItems="center" key={weekday}>
          <Text
            size={14}
            weight="bold"
            color={index === today ? 'regular' : 'shy'}
          >
            {getShortWeekday(index)}
          </Text>
        </VStack>
      ))}
    </>
  )
}
