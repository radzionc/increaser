import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'
import { VisionAttribute } from '@increaser/entities/Vision'
import { useUpdateVisionAttributeMutation } from '../api/useUpdateVisionAttributeMutation'
import { useDeleteVisionAttributeMutation } from '../api/useDeleteVisionAttributeMutation'
import { VisionAttributeNameInput } from './VisionAttributeNameInput'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionImageInput } from './VisionImageInput'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { pick } from '@lib/utils/record/pick'
import { useIsVisionAttributeFormDisabled } from './useIsVisionAttributeFormDisabled'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'

export const EditVisionAttributeForm = () => {
  const visionAttribute = useCurrentVisionAttribute()
  const initialValue = pick(visionAttribute, ['name', 'emoji', 'imageId'])
  const [value, setValue] = useState<VisionAttributeFormShape>(initialValue)

  const { mutate: updateVisionAttribute } = useUpdateVisionAttributeMutation()
  const { mutate: deleteVisionAttribute } = useDeleteVisionAttributeMutation()

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
    <Panel
      withSections
      kind="secondary"
      as="form"
      style={{ width: '100%' }}
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
    >
      <EmojiTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <VisionAttributeNameInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <VisionImageInput
        value={value.imageId ?? null}
        onChange={(imageId) => setValue((prev) => ({ ...prev, imageId }))}
      />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteVisionAttribute({ id: visionAttribute.id })
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
