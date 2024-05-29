import { useMemo, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { useCreateVisionAttributeMutation } from '../api/useCreateVisionAttributeMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { VisionAttributeStatus } from '@increaser/entities/Vision'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const CreateVisionAttributeForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const { vision } = useAssertUserState()
  const [name, setName] = useState('')
  const [status, setStatus] = useState<VisionAttributeStatus>('inProgress')

  const { mutate } = useCreateVisionAttributeMutation()

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit: () => {
          const orders = Object.values(vision).map(
            (attribute) => attribute.order,
          )
          const order = orders.length ? Math.min(...orders) - 1 : 0
          mutate({
            id: getId(),
            name,
            status,
            order,
          })
        },
      })}
    >
      <VStack>
        <TaskNameInput
          placeholder="Task name"
          autoFocus
          onChange={setName}
          value={name}
          onSubmit={handleSubmit}
        />
      </VStack>
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <TaskProjectSelector value={projectId} onChange={setProjectId} />
        <HStack alignItems="center" gap={8}>
          <Button onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Add task</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
