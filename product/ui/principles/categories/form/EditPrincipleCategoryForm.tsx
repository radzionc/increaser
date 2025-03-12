import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { OnFinishProp } from '@lib/ui/props'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { otherPrincipleCategoryId } from '@product/entities/PrincipleCategory'
import { useCallback, useMemo, useState } from 'react'

import { EmojiInput } from '../../../form/emoji-input/EmojiInput'
import { EmojiTextInputFrame } from '../../../form/EmojiTextInputFrame'
import { ListItemForm } from '../../../form/ListItemForm'
import { PanelFormCloseButton } from '../../../form/panel/PanelFormCloseButton'
import { PanelFormDeleteButton } from '../../../form/panel/PanelFormDeleteButton'
import { useDeleteUserEntityMutation } from '../../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentPrincipleCategory } from '../CurrentPrincipleCategoryProvider'

import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'

export const EditPricnipleCategoryForm = ({ onFinish }: OnFinishProp) => {
  const principleCategory = useCurrentPrincipleCategory()
  const { id } = principleCategory
  const initialValue = useMemo(
    () => pick(principleCategory, ['name', 'emoji']),
    [principleCategory],
  )
  const [value, setValue] = useState<PrincipleCategoryFormShape>(initialValue)

  const { mutate: updateEntity } =
    useUpdateUserEntityMutation('principleCategory')

  const { mutate: deleteEntity } =
    useDeleteUserEntityMutation('principleCategory')

  useLazySync<Partial<PrincipleCategoryFormShape>>({
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
        updateEntity({
          id,
          fields,
        }),
      [id, updateEntity],
    ),
  })

  return (
    <ListItemForm onClose={onFinish}>
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
        />

        <PanelFormCloseButton onClick={onFinish} />
      </EmojiTextInputFrame>
      {otherPrincipleCategoryId !== principleCategory.id && (
        <HStack fullWidth>
          <PanelFormDeleteButton
            onClick={() => {
              deleteEntity(id)
              onFinish()
            }}
          />
        </HStack>
      )}
    </ListItemForm>
  )
}
