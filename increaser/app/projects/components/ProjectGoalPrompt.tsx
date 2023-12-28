import { useUpdateProjectMutation } from '@increaser/app/projects/api/useUpdateProjectMutation'
import { useEffect, useState } from 'react'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { Button } from '@lib/ui/buttons/Button'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@increaser/app/ui/EmojiTextPrefix'
import { MIN_IN_HOUR } from '@lib/utils/time'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'

import { useCurrentProject } from './ProjectView/CurrentProjectProvider'
import { ListCard } from '@increaser/app/ui/ListCard'
import { HoursInput } from '@increaser/app/ui/CountInput/HoursInput'

const getDefaultValue = (freeMinutes: number) =>
  Math.min(freeMinutes, 10 * MIN_IN_HOUR)

export const ProjectGoalPrompt = () => {
  const { emoji, name, id, hslaColor, allocatedMinutesPerWeek } =
    useCurrentProject()
  const { freeMinutes } = useWeekTimeAllocation()

  const { mutate: updateProject } = useUpdateProjectMutation()

  const [isCreatingGoal, { set: createGoal, unset: finishCreatingGoal }] =
    useBoolean(false)

  const [value, setValue] = useState(() => getDefaultValue(freeMinutes))

  useEffect(() => {
    setValue(getDefaultValue(freeMinutes))
  }, [freeMinutes])

  return (
    <ListCard>
      <VStack gap={20}>
        <HStack
          fullWidth
          justifyContent="space-between"
          alignItems="center"
          gap={16}
          style={{ minHeight: 40 }}
        >
          <Text cropped weight="semibold">
            <EmojiTextPrefix emoji={emoji} />
            {name}
          </Text>
          {allocatedMinutesPerWeek > 0 ? (
            <Text size={14} color="shy">
              <Text size={16} as="span" color="regular" weight="bold">
                {formatDuration(allocatedMinutesPerWeek, 'min', {
                  maxUnit: 'h',
                })}
              </Text>{' '}
              / week
            </Text>
          ) : (
            <Button
              kind="secondary"
              isRounded
              style={{ opacity: isCreatingGoal ? 0 : 1 }}
              onClick={createGoal}
              isDisabled={isCreatingGoal}
            >
              <HStack alignItems="center" gap={4}>
                <PlusIcon />
                <Text>Goal</Text>
              </HStack>
            </Button>
          )}
        </HStack>
        {isCreatingGoal && (
          <>
            <HoursInput
              value={Math.round(value / MIN_IN_HOUR)}
              onChange={(v) => setValue(v * MIN_IN_HOUR)}
              max={Math.round(freeMinutes / MIN_IN_HOUR)}
              color={hslaColor}
            />
            <UniformColumnGrid gap={20}>
              <Button size="l" onClick={finishCreatingGoal} kind="secondary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateProject({
                    id,
                    fields: {
                      allocatedMinutesPerWeek: value,
                    },
                  })
                  finishCreatingGoal()
                }}
                size="l"
                kind="reversed"
              >
                Create
              </Button>
            </UniformColumnGrid>
          </>
        )}
      </VStack>
    </ListCard>
  )
}
