import { useCallback, useState } from 'react'
import {
  otherPrincipleCategoryId,
  PrincipleCategory,
} from '@increaser/entities/PrincipleCategory'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmojiTextInputFrame } from '../../../form/EmojiTextInputFrame'
import { useCurrentPrincipleCategory } from '../CurrentPrincipleCategoryProvider'
import { useUpdateUserEntityMutation } from '../../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../../userEntity/api/useDeleteUserEntityMutation'
import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'
import { useIsPrincipleCategoryFormDisabled } from './useIsPrincipleCategoryFormDisabled'
import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'
import { ListItemForm } from '../../../form/ListItemForm'
import { EmojiInput } from '../../../form/emoji-input/EmojiInput'

export const EditPricnipleCategoryForm = () => {
  const principleCategory = useCurrentPrincipleCategory()
  const [value, setValue] = useState<PrincipleCategoryFormShape>(
    pick(principleCategory, ['name', 'emoji']),
  )

  const { mutate: updatePrincipleCategory } =
    useUpdateUserEntityMutation('principleCategory')

  const { mutate: deletePrincipleCategory } =
    useDeleteUserEntityMutation('principleCategory')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsPrincipleCategoryFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<PrincipleCategory, 'id'>> = getUpdatedValues(
      omit(principleCategory, 'id'),
      value,
    )

    updatePrincipleCategory({
      id: principleCategory.id,
      fields,
    })
    onFinish()
  }, [isDisabled, principleCategory, onFinish, updatePrincipleCategory, value])

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
        />
      </EmojiTextInputFrame>
      {otherPrincipleCategoryId === principleCategory.id ? (
        <EditFormFooter onCancel={onFinish} isDisabled={isDisabled} />
      ) : (
        <EditDeleteFormFooter
          onDelete={() => {
            deletePrincipleCategory(principleCategory.id)
            onFinish()
          }}
          onCancel={onFinish}
          isDisabled={isDisabled}
        />
      )}
    </ListItemForm>
  )
}
