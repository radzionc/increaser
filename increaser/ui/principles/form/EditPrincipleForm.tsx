import { useCallback, useState } from 'react'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PrincipleFormShape } from './PrincipleFormShape'
import { useIsPrincipleFormDisabled } from './useIsPrincipleFormDisabled'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useCurrentPrinciple } from '../CurrentPrincipleProvider'
import { ListItemForm } from '../../form/ListItemForm'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PrincipleFormFields } from './PrincipleFormFields'

export const EditPrincipleForm = () => {
  const principle = useCurrentPrinciple()
  const { id } = principle
  const initialValue = pick(principle, ['name', 'categoryId', 'description'])
  const [value, setValue] = useState<PrincipleFormShape>(initialValue)

  const { mutate: updatePrinciple } = useUpdateUserEntityMutation('principle')
  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsPrincipleFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields = getUpdatedValues({
      before: initialValue,
      after: value,
    })

    if (fields) {
      updatePrinciple({
        id: principle.id,
        fields,
      })
    }

    onFinish()
  }, [initialValue, isDisabled, onFinish, principle.id, updatePrinciple, value])

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
      />
      <HStack fullWidth>
        <Button
          kind="alert"
          type="button"
          onClick={() => {
            deletePrinciple(id)
            onFinish()
          }}
        >
          Delete
        </Button>
      </HStack>
    </ListItemForm>
  )
}
