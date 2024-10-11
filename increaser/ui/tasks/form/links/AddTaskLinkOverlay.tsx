import { TaskLink } from '@increaser/entities/Task'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { Modal } from '@lib/ui/modal'
import { OptionalValueFinishProps } from '@lib/ui/props'
import { useState } from 'react'
import { useIsTaskLinkFormDisabled } from './useIsTaskLinkFormDisabled'
import { TaskLinkFormFields } from './TaskLinkFormFields'
import { ModalContent } from '@lib/ui/modal/ModalContent'

export const AddTaskLinkOverlay = ({
  onFinish,
}: OptionalValueFinishProps<TaskLink>) => {
  const [value, setValue] = useState<TaskLink>({
    url: '',
    name: '',
  })

  const isDisabled = useIsTaskLinkFormDisabled(value)

  return (
    <Modal
      title="Add a link to your task"
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
        <CreateFormFooter isDisabled={isDisabled} onCancel={() => onFinish()} />
      }
    >
      <ModalContent>
        <TaskLinkFormFields value={value} onChange={setValue} />
      </ModalContent>
    </Modal>
  )
}
