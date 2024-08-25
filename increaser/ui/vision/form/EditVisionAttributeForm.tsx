import { useCallback, useState } from 'react'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'
import { VisionAttribute } from '@increaser/entities/Vision'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { pick } from '@lib/utils/record/pick'
import { useIsVisionAttributeFormDisabled } from './useIsVisionAttributeFormDisabled'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { VisionAttributeFormFields } from './VisionAttributeFormFields'

export const EditVisionAttributeForm = () => {
  const visionAttribute = useCurrentVisionAttribute()
  const initialValue = pick(visionAttribute, [
    'name',
    'emoji',
    'imageId',
    'description',
  ])
  const [value, setValue] = useState<VisionAttributeFormShape>({
    ...initialValue,
    description: initialValue.description ?? null,
  })

  const { mutate: updateVisionAttribute } =
    useUpdateUserEntityMutation('visionAttribute')
  const { mutate: deleteVisionAttribute } =
    useDeleteUserEntityMutation('visionAttribute')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsVisionAttributeFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<VisionAttribute, 'id'>> = getUpdatedValues(
      initialValue,
      value,
    )

    updateVisionAttribute({
      id: visionAttribute.id,
      fields,
    })
    onFinish()
  }, [
    initialValue,
    isDisabled,
    onFinish,
    updateVisionAttribute,
    value,
    visionAttribute.id,
  ])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <VisionAttributeFormFields
        value={value}
        onChange={setValue}
        onSubmit={onSubmit}
      />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteVisionAttribute(visionAttribute.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
