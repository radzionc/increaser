import { Modal } from '@lib/ui/modal'
import { ClosableComponentProps } from '@lib/ui/props'
import { useCallback } from 'react'
import { useStopFocus } from '../../../hooks/useStopFocus'
import { EndTimeEditorIntervalProvider } from './EndTimeEditorIntervalProvider'
import { FocusEndTimeInput } from './FocusEndTimeInput'
import { useCurrentFocusEndTime } from './state/CurrentFocusEndTime'
import { editAndFinishTitle } from './config'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'

import { useKeyDown } from '@lib/ui/hooks/useKeyDown'
import { ModalContent } from '@lib/ui/modal/ModalContent'

export const FinishFocusOverlay = ({ onClose }: ClosableComponentProps) => {
  const [end] = useCurrentFocusEndTime()

  const stop = useStopFocus()

  const handleSubmit = useCallback(() => {
    stop({
      end,
    })
  }, [stop, end])

  useKeyDown('Enter', handleSubmit)

  return (
    <Modal
      placement="top"
      width={400}
      title={editAndFinishTitle}
      onClose={onClose}
      footer={<EditFormFooter submitText="Finish" onCancel={onClose} />}
      as="form"
      {...getFormProps({
        onSubmit: handleSubmit,
      })}
    >
      <ModalContent>
        <EndTimeEditorIntervalProvider>
          <FocusEndTimeInput />
        </EndTimeEditorIntervalProvider>
      </ModalContent>
    </Modal>
  )
}
