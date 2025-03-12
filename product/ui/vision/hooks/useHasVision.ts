import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { useUser } from '@product/ui/user/state/user'

export const useHasVision = () => {
  const { vision } = useUser()
  return !isRecordEmpty(vision)
}
