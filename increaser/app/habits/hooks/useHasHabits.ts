import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const useHasHabits = () => {
  const { habits } = useAssertUserState()

  return !isRecordEmpty(habits)
}
