import { useCallback, useState } from 'react'
import { NoValueFinishProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { PrincipleFormShape } from './PrincipleFormShape'
import { useIsPrincipleFormDisabled } from './useIsPrincipleFormDisabled'
import { otherProjectId } from '@increaser/entities/Project'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { PrincipleFormFields } from './PrincipleFormFields'

export const CreatePrincipleForm = ({ onFinish }: NoValueFinishProps) => {
  const [value, setValue] = useState<PrincipleFormShape>({
    name: '',
    description: '',
    categoryId: otherProjectId,
  })
  const { mutate } = useCreateUserEntityMutation('principle')

  const isDisabled = useIsPrincipleFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
      updatedAt: Date.now(),
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <PrincipleFormFields
        value={value}
        onChange={setValue}
        onSubmit={onSubmit}
        onClose={onFinish}
        categorySelectorAutoFocus
      />
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
