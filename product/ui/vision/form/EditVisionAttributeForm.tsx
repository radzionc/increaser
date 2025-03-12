import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnFinishProp } from '@lib/ui/props'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { useCallback, useMemo, useState } from 'react'

import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'

import { VisionAttributeFormFields } from './VisionAttributeFormFields'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'

export const EditVisionAttributeForm = ({ onFinish }: OnFinishProp) => {
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
