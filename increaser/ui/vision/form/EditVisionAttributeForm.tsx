import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'
import { VisionAttribute } from '@increaser/entities/Vision'
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
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'

export const EditVisionAttributeForm = () => {
  const visionAttribute = useCurrentVisionAttribute()
  const initialValue = pick(visionAttribute, ['name', 'emoji', 'imageId'])
  const [value, setValue] = useState<VisionAttributeFormShape>(initialValue)

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
        <EmbeddedTitleInput
          placeholder="Describe your life aspiration"
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
          deleteVisionAttribute(visionAttribute.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
