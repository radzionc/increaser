import { useCallback, useState } from 'react'
import { NoValueFinishProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'
import { otherProject } from '@increaser/entities/Project'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useIdeas } from '../hooks/useIdeas'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

type CreateIdeaFormProps = NoValueFinishProps & {
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
      <CreateFormFooter
        isPending={isPending}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
