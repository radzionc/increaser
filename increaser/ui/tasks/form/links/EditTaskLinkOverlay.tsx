import { TaskLink } from '@increaser/entities/Task'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { Modal } from '@lib/ui/modal'
import { OptionalValueFinishProps } from '@lib/ui/props'
import { useState } from 'react'
import { useIsTaskLinkFormDisabled } from './useIsTaskLinkFormDisabled'
import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'
import { TaskLinkFormFields } from './TaskLinkFormFields'
import { ModalContent } from '@lib/ui/modal/ModalContent'

type EditTaskOverlayProps = OptionalValueFinishProps<TaskLink> & {
  initialValue: TaskLink
}

export const EditTaskLinkOverlay = ({
  onFinish,
  initialValue,
}: EditTaskOverlayProps) => {
  const [value, setValue] = useState<TaskLink>(initialValue)

  const isDisabled = useIsTaskLinkFormDisabled(value)

  return (
    <Modal
      title="Edit link"
      targetWidth={480}
      onClose={() => onFinish()}
      as="form"
      placement="top"
      {...getFormProps({
        onClose: () => onFinish(),
        isDisabled,
        onSubmit: () => onFinish(value),
      })}
      footer={
        <EditFormFooter isDisabled={isDisabled} onCancel={() => onFinish()} />
      }
    >
      <ModalContent>
        <TaskLinkFormFields value={value} onChange={setValue} />
      </ModalContent>
    </Modal>
  )
}
