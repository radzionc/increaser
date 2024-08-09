import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const useHasVision = () => {
  const { vision } = useAssertUserState()
  return !isRecordEmpty(vision)
}
