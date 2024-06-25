import { useCallback, useEffect } from 'react'

import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditTaskFormContent } from './EditTaskFormContent'

export const EditTaskForm = () => {
  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useEffect(() => {
    return () => {
      onFinish()
    }
  }, [onFinish])

  return <EditTaskFormContent style={{ width: '100%' }} onFinish={onFinish} />
}
