import { useCallback, useMemo, useState } from 'react'
import { otherPrincipleCategoryId } from '@increaser/entities/PrincipleCategory'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmojiTextInputFrame } from '../../../form/EmojiTextInputFrame'
import { useCurrentPrincipleCategory } from '../CurrentPrincipleCategoryProvider'
import { useUpdateUserEntityMutation } from '../../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../../userEntity/api/useDeleteUserEntityMutation'
import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'
import { ListItemForm } from '../../../form/ListItemForm'
import { EmojiInput } from '../../../form/emoji-input/EmojiInput'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PanelFormCloseButton } from '../../../form/panel/PanelFormCloseButton'

export const EditPricnipleCategoryForm = () => {
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

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

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
          <Button
            kind="alert"
            type="button"
            onClick={() => {
              deleteEntity(id)
              onFinish()
            }}
          >
            Delete
          </Button>
        </HStack>
      )}
    </ListItemForm>
  )
}
