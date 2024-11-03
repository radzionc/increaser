import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { Text } from '@lib/ui/text'
import { Match } from '@lib/ui/base/Match'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { WEEKDAYS } from '@lib/utils/time'

export const TaskFactoryTitle = () => {
  const { name, cadence, deadlineIndex } = useCurrentTaskFactory()

  return (
    <Text>
      {name}{' '}
      <Text as="span" color="supporting">
        (
        <Match
          value={cadence}
          day={() => 'daily'}
          workday={() => 'every workday'}
          week={() => `weekly on ${WEEKDAYS[shouldBePresent(deadlineIndex)]}`}
          month={() => `monthly on the ${deadlineIndex}th`}
        />
        )
      </Text>
    </Text>
  )
}
