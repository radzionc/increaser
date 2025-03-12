import { Match } from '@lib/ui/base/Match'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { WEEKDAYS } from '@lib/utils/time'

import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'

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
