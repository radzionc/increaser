import { useCallback, useState } from 'react'
import { Principle } from '@increaser/entities/Principle'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PrincipleFormShape } from './PrincipleFormShape'
import { useIsPrincipleFormDisabled } from './useIsPrincipleFormDisabled'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useCurrentPrinciple } from '../CurrentPrincipleProvider'
import { PrincipleCategorySelector } from './PrincipleCategorySelector'
import { ListItemForm } from '../../form/ListItemForm'

export const EditPrincipleForm = () => {
  const principle = useCurrentPrinciple()
  const [value, setValue] = useState<PrincipleFormShape>(
    pick(principle, ['name', 'categoryId', 'description']),
  )

  const { mutate: updatePrinciple } = useUpdateUserEntityMutation('principle')
  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsPrincipleFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Principle, 'id'>> = getUpdatedValues(
      omit(principle, 'id'),
      {
        ...value,
        updatedAt: Date.now(),
      },
    )

    updatePrinciple({
      id: principle.id,
      fields,
    })
    onFinish()
  }, [isDisabled, principle, onFinish, updatePrinciple, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <EmojiTextInputFrame>
        <div>
          <PrincipleCategorySelector
            value={value.categoryId}
            onChange={(categoryId) =>
              setValue((prev) => ({ ...prev, categoryId }))
            }
          />
        </div>

        <EmbeddedTitleInput
          placeholder="Your principle"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
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
      <EditDeleteFormFooter
        onDelete={() => {
          deletePrinciple(principle.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
