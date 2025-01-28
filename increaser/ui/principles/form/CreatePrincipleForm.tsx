import { useCallback, useState } from 'react'
import { InitialValueProp, OnFinishOptionalValueProp } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { PrincipleFormShape } from './PrincipleFormShape'
import { useIsPrincipleFormDisabled } from './useIsPrincipleFormDisabled'
import { otherProjectId } from '@increaser/entities/Project'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { PrincipleFormFields } from './PrincipleFormFields'
import { Principle } from '@increaser/entities/Principle'

type CreatePrincipleFormProps = OnFinishOptionalValueProp<Principle> &
  Partial<InitialValueProp<Partial<PrincipleFormShape>>> & {
    submitText?: string
  }

export const CreatePrincipleForm = ({
  onFinish,
  initialValue,
  submitText,
}: CreatePrincipleFormProps) => {
  const [value, setValue] = useState<PrincipleFormShape>({
    name: '',
    description: '',
    categoryId: otherProjectId,
    ...initialValue,
  })
  const { mutate } = useCreateUserEntityMutation('principle', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsPrincipleFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
      updatedAt: Date.now(),
    })
  }, [isDisabled, mutate, value])

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
        categorySelectorAutoFocus={!initialValue?.categoryId}
      />
      <CancelSubmitFormFooter
        submitText={submitText}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
