import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'
import { VisionAttribute } from '@increaser/entities/Vision'
import { useUpdateVisionAttributeMutation } from '../api/useUpdateVisionAttributeMutation'
import { useDeleteVisionAttributeMutation } from '../api/useDeleteVisionAttributeMutation'
import { VisionAttributeNameInput } from './VisionAttributeNameInput'
import { VisionAttributeStatusSelector } from './VisionAttributeStatusSelector'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionImageInput } from './VisionImageInput'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { pick } from '@lib/utils/record/pick'
import { useIsVisionAttributeFormDisabled } from './useIsVisionAttributeFormDisabled'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'

export const EditVisionAttributeForm = () => {
  const visionAttribute = useCurrentVisionAttribute()
  const [value, setValue] = useState<VisionAttributeFormShape>({
    ...pick(visionAttribute, ['name', 'status', 'emoji', 'imageId']),
  })

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
      omit(visionAttribute, 'id'),
      value,
    )

    updateVisionAttribute({
      id: visionAttribute.id,
      fields,
    })
    onFinish()
  }, [isDisabled, onFinish, updateVisionAttribute, value, visionAttribute])

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
      <VStack alignItems="start">
        <VisionAttributeStatusSelector
          value={value.status}
          onChange={(status) => setValue((prev) => ({ ...prev, status }))}
        />
      </VStack>
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
