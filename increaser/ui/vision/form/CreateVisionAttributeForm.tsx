import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCreateVisionAttributeMutation } from '../api/useCreateVisionAttributeMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VisionImageInput } from './VisionImageInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { VisionAttributeFormShape } from './VisionAttributeFormShape'
import { useIsVisionAttributeFormDisabled } from './useIsVisionAttributeFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { PanelTitleInput } from '@lib/ui/inputs/PanelTitleInput'

export const CreateVisionAttributeForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [value, setValue] = useState<VisionAttributeFormShape>({
    name: '',
    imageId: null,
    emoji: randomlyPick(defaultEmojis),
  })

  const { mutate } = useCreateVisionAttributeMutation()

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
        <PanelTitleInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <VisionImageInput
        onChange={(imageId) => setValue((prev) => ({ ...prev, imageId }))}
        value={value.imageId ?? null}
      />
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <HStack alignItems="center" gap={8}>
          <Button onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Submit</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
