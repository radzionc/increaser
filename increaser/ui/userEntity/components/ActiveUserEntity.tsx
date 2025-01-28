import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ValueProp, OnFinishNoValueProp } from '@lib/ui/props'
import { ReactNode, useCallback, useEffect } from 'react'

type ActiveUserEntityProps<T> = {
  render: (props: OnFinishNoValueProp & ValueProp<T>) => ReactNode
  items: Record<string, T>
}

export function ActiveUserEntity<T>({
  render,
  items,
}: ActiveUserEntityProps<T>) {
  const [activeItemId, setActiveItemId] = useActiveItemId()

  const value = activeItemId ? items[activeItemId] : null

  useEffect(() => {
    if (activeItemId && !value) {
      setActiveItemId(null)
    }
  }, [activeItemId, setActiveItemId, value])

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  if (!value) {
    return null
  }

  return (
    <PanelModal onFinish={onFinish}>{render({ onFinish, value })}</PanelModal>
  )
}
