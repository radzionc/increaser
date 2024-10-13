import { useCallback, useMemo, useState } from 'react'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { VisionAttributeFormFields } from './VisionAttributeFormFields'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'

export const EditVisionAttributeForm = () => {
  const visionAttribute = useCurrentVisionAttribute()
  const { id } = visionAttribute
  const initialValue = useMemo(
    () => pick(visionAttribute, ['name', 'emoji', 'imageId', 'description']),
    [visionAttribute],
  )
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

  useLazySync<Partial<VisionAttributeFormShape>>({
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
        updateVisionAttribute({
          id,
          fields,
        }),
      [id, updateVisionAttribute],
    ),
  })

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
      <VisionAttributeFormFields
        onClose={onFinish}
        value={value}
        onChange={setValue}
      />
      <HStack fullWidth>
        <PanelFormDeleteButton
          onClick={() => {
            deleteVisionAttribute(id)
            onFinish()
          }}
        />
      </HStack>
    </Panel>
  )
}
