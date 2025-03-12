import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { OnFinishProp } from '@lib/ui/props'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { PrincipleCategory } from '@product/entities/PrincipleCategory'
import { getId } from '@product/entities-utils/shared/getId'
import { useCallback, useRef, useState } from 'react'

import { EmojiInput } from '../../../form/emoji-input/EmojiInput'
import { EmojiTextInputFrame } from '../../../form/EmojiTextInputFrame'
import { ListItemForm } from '../../../form/ListItemForm'
import { useCreateUserEntityMutation } from '../../../userEntity/api/useCreateUserEntityMutation'

import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'
import { useIsPrincipleCategoryFormDisabled } from './useIsPrincipleCategoryFormDisabled'

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
