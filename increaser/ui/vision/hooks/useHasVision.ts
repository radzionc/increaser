import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const myVisionViews = ['board', 'edit']
export type MyVisionView = (typeof myVisionViews)[number]

export const useHasVision = () => {
  const { vision } = useAssertUserState()
  return !isRecordEmpty(vision)
}
