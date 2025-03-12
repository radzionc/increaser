import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCallback } from 'react'

import { EditTaskFormContent } from './EditTaskFormContent'

export const EditTaskForm = () => {
  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  return <EditTaskFormContent onFinish={onFinish} />
}
