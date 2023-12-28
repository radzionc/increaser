import { HabitFormShape } from '@increaser/app/habits/components/HabitForm/HabitFormShape'
import { defaultHabitEmojis } from '@increaser/app/habits/Habit'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@lib/utils/array/getRandomElement'
import { useUserState } from '@increaser/app/user/state/UserStateContext'

interface UseHabitFormParams {
  initialValues?: Partial<HabitFormShape>
}

const defaultParams: UseHabitFormParams = {
  initialValues: {},
}

export const useHabitForm = ({
  initialValues,
}: UseHabitFormParams = defaultParams) => {
  const { state } = useUserState()

  const habits = useMemo(() => state?.habits || [], [state?.habits])

  const { defaultColorOption } = usePaletteColorOptions(Object.values(habits))

  const getDefaultValues = useCallback(
    () => ({
      name: '',
      emoji: getRandomElement(defaultHabitEmojis),
      color: defaultColorOption,
      ...initialValues,
    }),
    [defaultColorOption, initialValues],
  )

  const form = useForm<HabitFormShape>({
    mode: 'onSubmit',
    defaultValues: getDefaultValues(),
  })

  return {
    form,
    getDefaultValues,
  } as const
}
