import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ValueProp } from '@lib/ui/props'
import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { defaultPrincipleCategories } from '@product/entities/PrincipleCategory'
import { PrincipleIdea } from '@product/entities-utils/principle/principleIdeas'
import { useUser } from '@product/ui/user/state/user'

import { useCreateUserEntityMutation } from '../userEntity/api/useCreateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../userEntity/api/useDeleteUserEntityMutation'

export const AddPrincipleIdea = ({
  value: { id, description, name, categoryId },
}: ValueProp<PrincipleIdea>) => {
  const { principles, principleCategories } = useUser()
  const { mutate: createPrinciple } = useCreateUserEntityMutation('principle')
  const { mutate: createPrincipleCategory } =
    useCreateUserEntityMutation('principleCategory')

  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  const isAdded = id in principles

  const category = shouldBePresent(
    findBy(defaultPrincipleCategories, 'id', categoryId),
  )

  return (
    <Button
      onClick={() => {
        if (isAdded) {
          deletePrinciple(id)
        } else {
          const principle = {
            id,
            name,
            description,
            categoryId,
            updatedAt: Date.now(),
          }
          if (!(categoryId in principleCategories)) {
            createPrincipleCategory(category, {
              onSuccess: () => {
                createPrinciple(principle)
              },
            })
          } else {
            createPrinciple(principle)
          }
        }
      }}
      size="s"
      kind={isAdded ? 'primary' : 'secondary'}
      isRounded
    >
      <HStack alignItems="center" gap={8}>
        <IconWrapper>{isAdded ? <CheckIcon /> : <PlusIcon />}</IconWrapper>
        {isAdded ? 'Added' : 'Add'}
      </HStack>
    </Button>
  )
}
