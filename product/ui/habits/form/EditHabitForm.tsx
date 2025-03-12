import { Panel } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { OnFinishProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { relativeDayFormat } from '@lib/utils/time/relativeDayFormat'
import { PanelFormDeleteButton } from '@product/ui/form/panel/PanelFormDeleteButton'
import { useCurrentHabit } from '@product/ui/habits/CurrentHabitProvider'
import { HabitFormShape } from '@product/ui/habits/form/HabitFormShape'
import { useDeleteUserEntityMutation } from '@product/ui/userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '@product/ui/userEntity/api/useUpdateUserEntityMutation'
import { useCallback, useMemo, useState } from 'react'

import { HabitFormFields } from './HabitFormFields'
import { ManageHabitStatus } from './ManageHabitStatus'
import { ResetHabit } from './ResetHabit'

export const EditHabitForm = ({ onFinish }: OnFinishProp) => {
  const habit = useCurrentHabit()
  const { id } = habit

  const initialValue = useMemo(
    () => pick(habit, ['name', 'emoji', 'plan']),
    [habit],
  )

  const [value, setValue] = useState<HabitFormShape>(initialValue)

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')
  const { mutate: deleteHabit } = useDeleteUserEntityMutation('habit')

  useLazySync<Partial<HabitFormShape>>({
    value: useMemo(
      () =>
        getUpdatedValues({
          before: initialValue,
          after: value,
        }),
      [initialValue, value],
    ),
    sync: useCallback(
      (fields) =>
        updateHabit({
          id,
          fields,
        }),
      [id, updateHabit],
    ),
  })

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
      <HabitFormFields
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      <VStack gap={16}>
        {habit.startedAt && (
          <LabeledValue
            name={
              <Text centerVertically style={{ gap: 6 }}>
                <ClockIcon /> Started tracking
              </Text>
            }
          >
            {relativeDayFormat(habit.startedAt, 'd MMMM yyyy')}
          </LabeledValue>
        )}
        <HStack gap={8} fullWidth>
          <ManageHabitStatus />
          <ResetHabit />
          <PanelFormDeleteButton
            onClick={() => {
              deleteHabit(id)
              onFinish()
            }}
          />
        </HStack>
      </VStack>
    </Panel>
  )
}
