import { useCallback, useRef, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useCreateUserEntityMutation } from '../../../userEntity/api/useCreateUserEntityMutation'
import { useIsPrincipleCategoryFormDisabled } from './useIsPrincipleCategoryFormDisabled'
import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'
import { EmojiTextInputFrame } from '../../../form/EmojiTextInputFrame'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'

export const CreatePrincipleCategoryForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const [value, setValue] = useState<PrincipleCategoryFormShape>({
    name: '',
    emoji: randomlyPick(defaultEmojis),
  })
  const { mutate } = useCreateUserEntityMutation('principleCategory')

  const isDisabled = useIsPrincipleCategoryFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
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
          placeholder="Category name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </Panel>
  )
}
