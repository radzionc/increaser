import { TaskLink } from '@increaser/entities/Task'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { Modal } from '@lib/ui/modal'
import { OnFinishProp } from '@lib/ui/props'
import { useState } from 'react'
import { useIsTaskLinkFormDisabled } from './useIsTaskLinkFormDisabled'
import { TaskLinkFormFields } from './TaskLinkFormFields'
import { ModalContent } from '@lib/ui/modal/ModalContent'

export const AddTaskLinkOverlay = ({
  onFinish,
}: OnFinishProp<TaskLink, 'optional'>) => {
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
        <CancelSubmitFormFooter
          isDisabled={isDisabled}
          onCancel={() => onFinish()}
        />
      }
    >
      <ModalContent>
        <TaskLinkFormFields value={value} onChange={setValue} />
      </ModalContent>
    </Modal>
  )
}
