import { useCallback, useState } from 'react'
import { NoValueFinishProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useUser } from '@increaser/ui/user/state/user'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { useIsVisionAttributeFormDisabled } from './useIsVisionAttributeFormDisabled'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { VisionAttributeFormFields } from './VisionAttributeFormFields'

export const CreateVisionAttributeForm = ({ onFinish }: NoValueFinishProps) => {
  const { vision } = useUser()
  const [value, setValue] = useState<VisionAttributeFormShape>({
    name: '',
    imageId: null,
    emoji: randomlyPick(defaultEmojis),
    description: null,
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
      <VisionAttributeFormFields
        value={value}
        onChange={setValue}
        onSubmit={onSubmit}
        onClose={onFinish}
      />
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
