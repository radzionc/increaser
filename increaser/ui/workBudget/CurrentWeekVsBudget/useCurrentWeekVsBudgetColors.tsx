import { useTheme } from 'styled-components'

export const useCurrentWeekVsBudgetColors = () => {
  const { colors } = useTheme()

  return {
    budget: colors.textShy,
    done: colors.primary,
  } as const
}
