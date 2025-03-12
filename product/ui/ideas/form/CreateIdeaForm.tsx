import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { OnFinishProp } from '@lib/ui/props'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { otherProject } from '@product/entities/Project'
import { getId } from '@product/entities-utils/shared/getId'
import { useCallback, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { useIdeas } from '../hooks/useIdeas'

import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'

type CreateIdeaFormProps = OnFinishProp & {
  initialValue?: Partial<IdeaFormShape>
}

export const CreateIdeaForm = ({
  onFinish,
  initialValue,
}: CreateIdeaFormProps) => {
  const ideas = useIdeas()

  const [value, setValue] = useState<IdeaFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
    ...initialValue,
  })
  const { mutate, isPending } = useCreateUserEntityMutation('idea', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsIdeaFormDisabled(value)

  const onSubmit = useCallback(() => {
    const order = getLastItemOrder(
      Object.values(ideas).map((task) => task.order),
    )

    mutate({
      id: getId(),
      order,
      ...value,
    })
  }, [ideas, mutate, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onSubmit={isDisabled ? undefined : onSubmit}
        hasProjectAutoFocus={!initialValue?.projectId}
        onClose={onFinish}
        titlePlaceholder="Idea name"
      />
      <CancelSubmitFormFooter
        isPending={isPending}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
