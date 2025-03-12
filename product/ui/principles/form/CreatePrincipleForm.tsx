import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { InitialValueProp, OnFinishProp } from '@lib/ui/props'
import { Principle } from '@product/entities/Principle'
import { otherProjectId } from '@product/entities/Project'
import { getId } from '@product/entities-utils/shared/getId'
import { useCallback, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'

import { PrincipleFormFields } from './PrincipleFormFields'
import { PrincipleFormShape } from './PrincipleFormShape'
import { useIsPrincipleFormDisabled } from './useIsPrincipleFormDisabled'

type CreatePrincipleFormProps = OnFinishProp<Principle, 'optional'> &
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
