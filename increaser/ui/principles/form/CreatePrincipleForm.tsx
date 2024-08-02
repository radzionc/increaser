import { useCallback, useRef, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { PrincipleFormShape } from './PrincipleFormShape'
import { useIsPrincipleFormDisabled } from './useIsPrincipleFormDisabled'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { otherProjectId } from '@increaser/entities/Project'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { PrincipleCategorySelector } from './PrincipleCategorySelector'
import { ListItemForm } from '../../form/ListItemForm'

export const CreatePrincipleForm = ({ onFinish }: FinishableComponentProps) => {
  const [value, setValue] = useState<PrincipleFormShape>({
    name: '',
    description: '',
    categoryId: otherProjectId,
  })
  const { mutate } = useCreateUserEntityMutation('principle')

  const isDisabled = useIsPrincipleFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
      updatedAt: Date.now(),
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <EmojiTextInputFrame>
        <div>
          <PrincipleCategorySelector
            autoFocus
            value={value.categoryId}
            onChange={(categoryId) => {
              setValue((prev) => ({ ...prev, categoryId }))
              nameInputRef.current?.focus()
            }}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Your principle"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>

      <EmbeddedDescriptionInput
        label="Description"
        placeholder="Describe your principle"
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
        value={value.description}
      />
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
