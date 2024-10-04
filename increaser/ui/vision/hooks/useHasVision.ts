import { useUser } from '@increaser/ui/user/state/user'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const useHasVision = () => {
  const { vision } = useUser()
  return !isRecordEmpty(vision)
}
