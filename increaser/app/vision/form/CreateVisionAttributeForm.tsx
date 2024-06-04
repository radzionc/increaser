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

export const CreateVisionAttributeForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [name, setName] = useState('')
  const [status, setStatus] = useState<VisionAttributeStatus>('inProgress')
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const { mutate } = useCreateVisionAttributeMutation()

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    const orders = Object.values(vision).map((attribute) => attribute.order)
    const order = orders.length ? Math.max(...orders) + 1 : 0
    mutate({
      id: getId(),
      name,
      status,
      order,
    })
    onFinish()
  }, [isDisabled, mutate, name, onFinish, status, vision])

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
      <VisionImageInput value={imageUrl ?? null} onChange={setImageUrl} />
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
