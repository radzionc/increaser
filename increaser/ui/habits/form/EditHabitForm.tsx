import { useCallback, useMemo, useState } from 'react'
import { HabitFormShape } from '@increaser/ui/habits/form/HabitFormShape'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '@increaser/ui/userEntity/api/useDeleteUserEntityMutation'
import { pick } from '@lib/utils/record/pick'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { PanelFormDeleteButton } from '@increaser/ui/form/panel/PanelFormDeleteButton'
import { NoValueFinishProps } from '@lib/ui/props'
import { HabitFormFields } from './HabitFormFields'
import { ResetHabit } from './ResetHabit'
import { ManageHabitStatus } from './ManageHabitStatus'

export const EditHabitForm = ({ onFinish }: NoValueFinishProps) => {
  const habit = useCurrentHabit()
  const { id } = habit

  const initialValue = useMemo(
    () => pick(habit, ['name', 'emoji', 'color']),
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
      <HStack gap={8} fullWidth>
        <PanelFormDeleteButton
          onClick={() => {
            deleteHabit(id)
            onFinish()
          }}
        />
        <ResetHabit />
        <ManageHabitStatus />
      </HStack>
    </Panel>
  )
}
