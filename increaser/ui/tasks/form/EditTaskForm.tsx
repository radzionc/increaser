import { useCallback } from 'react'

import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditTaskFormContent } from './EditTaskFormContent'

export const EditTaskForm = () => {
  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  return <EditTaskFormContent style={{ width: '100%' }} onFinish={onFinish} />
}
