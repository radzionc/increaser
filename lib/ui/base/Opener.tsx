import { ReactNode } from 'react'
import { useBoolean } from '../hooks/useBoolean'
import { ClosableComponentProps } from '../props'

interface RenderOpenerParams {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

type OpenerProps = {
  initialIsOpen?: boolean
  renderOpener: (params: RenderOpenerParams) => ReactNode
  renderContent: (params: ClosableComponentProps) => ReactNode
}

export const Opener = ({
  renderOpener,
  renderContent: Content,
  initialIsOpen = false,
}: OpenerProps) => {
  const [isOpen, { set: onOpen, unset: onClose }] = useBoolean(initialIsOpen)

  return (
    <>
      {renderOpener({ onOpen, onClose, isOpen })}
      {isOpen && <Content onClose={onClose} />}
    </>
  )
}
