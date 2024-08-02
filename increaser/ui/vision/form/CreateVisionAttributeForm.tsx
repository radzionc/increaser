import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VisionImageInput } from './VisionImageInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { useIsVisionAttributeFormDisabled } from './useIsVisionAttributeFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'

export const CreateVisionAttributeForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [value, setValue] = useState<VisionAttributeFormShape>({
    name: '',
    imageId: null,
    emoji: randomlyPick(defaultEmojis),
  })

  const { mutate } = useCreateUserEntityMutation('visionAttribute')

  const isDisabled = useIsVisionAttributeFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
      order: getLastItemOrder(
        Object.values(vision).map((attribute) => attribute.order),
      ),
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value, vision])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <EmojiTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <EmbeddedTitleInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <VisionImageInput
        onChange={(imageId) => setValue((prev) => ({ ...prev, imageId }))}
        value={value.imageId ?? null}
      />
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
