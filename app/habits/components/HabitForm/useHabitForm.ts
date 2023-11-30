import { HabitFormShape } from 'habits/components/HabitForm/HabitFormShape'
import { defaultHabitEmojis } from 'habits/Habit'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { usePaletteColorOptions } from 'shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@increaser/utils/array/getRandomElement'
import { useUserState } from 'user/state/UserStateContext'

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
