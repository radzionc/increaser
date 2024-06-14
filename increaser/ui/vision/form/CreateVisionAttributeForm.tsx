import { useCallback, useMemo, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCreateVisionAttributeMutation } from '../api/useCreateVisionAttributeMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { VisionAttributeStatus } from '@increaser/entities/Vision'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VisionAttributeNameInput } from './VisionAttributeNameInput'
import { VisionAttributeStatusSelector } from './VisionAttributeStatusSelector'
import { VisionImageInput } from './VisionImageInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

export const CreateVisionAttributeForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [name, setName] = useState('')
  const [status, setStatus] = useState<VisionAttributeStatus>('inProgress')
  const [imageId, setImageId] = useState<string | null>(null)

  const { mutate } = useCreateVisionAttributeMutation()

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      name,
      status,
      imageId,
      order: getLastItemOrder(
        Object.values(vision).map((attribute) => attribute.order),
      ),
    })
    onFinish()
  }, [imageId, isDisabled, mutate, name, onFinish, status, vision])

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
      <VisionAttributeNameInput
        autoFocus
        onChange={setName}
        value={name}
        onSubmit={onSubmit}
      />
      <VisionImageInput value={imageId ?? null} onChange={setImageId} />
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <VisionAttributeStatusSelector value={status} onChange={setStatus} />
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
