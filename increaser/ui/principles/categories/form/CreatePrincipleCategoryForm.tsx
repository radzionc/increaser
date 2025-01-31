import { useCallback, useRef, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useCreateUserEntityMutation } from '../../../userEntity/api/useCreateUserEntityMutation'
import { useIsPrincipleCategoryFormDisabled } from './useIsPrincipleCategoryFormDisabled'
import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'
import { EmojiTextInputFrame } from '../../../form/EmojiTextInputFrame'
import { ListItemForm } from '../../../form/ListItemForm'
import { EmojiInput } from '../../../form/emoji-input/EmojiInput'
import { PrincipleCategory } from '@increaser/entities/PrincipleCategory'
import { OnFinishProp } from '@lib/ui/props'

export const CreatePrincipleCategoryForm = ({
  onFinish,
}: OnFinishProp<PrincipleCategory, 'optional'>) => {
  const [value, setValue] = useState<PrincipleCategoryFormShape>({
    name: '',
    emoji: randomlyPick(defaultEmojis),
  })
  const { mutate } = useCreateUserEntityMutation('principleCategory', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsPrincipleCategoryFormDisabled(value)

  const onSubmit = useCallback(() => {
    mutate({
      id: getId(),
      ...value,
    })
  }, [mutate, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

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
          placeholder="Category name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>
      <CancelSubmitFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
