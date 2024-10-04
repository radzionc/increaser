import { useUser } from '@increaser/ui/user/state/user'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const useHasHabits = () => {
  const { habits } = useUser()

  return !isRecordEmpty(habits)
}
