import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnFinishProp } from '@lib/ui/props'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { useCallback, useMemo, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentPrinciple } from '../CurrentPrincipleProvider'

import { PrincipleFormFields } from './PrincipleFormFields'
import { PrincipleFormShape } from './PrincipleFormShape'

export const EditPrincipleForm = ({ onFinish }: OnFinishProp) => {
  const principle = useCurrentPrinciple()
  const { id } = principle

  const initialValue = useMemo(
    () => pick(principle, ['name', 'categoryId', 'description']),
    [principle],
  )
  const [value, setValue] = useState<PrincipleFormShape>(initialValue)

  const { mutate: updatePrinciple } = useUpdateUserEntityMutation('principle')
  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  useLazySync<Partial<PrincipleFormShape>>({
    value: useMemo(
      () =>
        getUpdatedValues({
          before: initialValue,
          after: value,
        }),
      [initialValue, value],
    ),
    sync: useCallback(
      (fields) =>
        updatePrinciple({
          id,
          fields,
        }),
      [id, updatePrinciple],
    ),
  })

  return (
    <ListItemForm onClose={onFinish}>
      <PrincipleFormFields
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onSubmit={onFinish}
        onClose={onFinish}
      />
      <HStack fullWidth>
        <PanelFormDeleteButton
          onClick={() => {
            deletePrinciple(id)
            onFinish()
          }}
        />
      </HStack>
    </ListItemForm>
  )
}
