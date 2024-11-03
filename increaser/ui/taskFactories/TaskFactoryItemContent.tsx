import { HStack } from '@lib/ui/css/stack'
import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { ProjectEmoji } from '../projects/ProjectEmoji'
import { Match } from '@lib/ui/base/Match'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { WEEKDAYS } from '@lib/utils/time'

export const TaskFactoryItemContent = () => {
  const { name, projectId, cadence, deadlineIndex } = useCurrentTaskFactory()

  return (
    <PrefixedItemFrame
      prefix={
        <Text size={16} color="contrast">
          <ProjectEmoji id={projectId} />
        </Text>
      }
    >
      <HStack fullWidth gap={20}>
        <Text style={{ flex: 1 }}>
          {name}{' '}
          <Text as="span" color="supporting">
            (
            <Match
              value={cadence}
              day={() => 'daily'}
              workday={() => 'every workday'}
              week={() =>
                `weekly on ${WEEKDAYS[shouldBePresent(deadlineIndex)]}`
              }
              month={() => `monthly on the ${deadlineIndex}th`}
            />
            )
          </Text>
        </Text>
      </HStack>
    </PrefixedItemFrame>
  )
}
