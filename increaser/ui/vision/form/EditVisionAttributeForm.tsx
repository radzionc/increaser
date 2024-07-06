import { FormEvent, useCallback, useMemo, useState } from 'react'
import { useKey } from 'react-use'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { useCurrentVisionAttribute } from '../CurrentVisionAttributeProvider'
import {
  VisionAttribute,
  VisionAttributeStatus,
} from '@increaser/entities/Vision'
import { useUpdateVisionAttributeMutation } from '../api/useUpdateVisionAttributeMutation'
import { useDeleteVisionAttributeMutation } from '../api/useDeleteVisionAttributeMutation'
import { VisionAttributeNameInput } from './VisionAttributeNameInput'
import { VisionAttributeStatusSelector } from './VisionAttributeStatusSelector'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionImageInput } from './VisionImageInput'

export const EditVisionAttributeForm = () => {
  const visionAttribute = useCurrentVisionAttribute()
  const [name, setName] = useState(visionAttribute.name)
  const [status, setStatus] = useState<VisionAttributeStatus>(
    visionAttribute.status,
  )
  const [imageId, setImageId] = useState(visionAttribute.imageId)

  const { mutate: updateVisionAttribute } = useUpdateVisionAttributeMutation()
  const { mutate: deleteVisionAttribute } = useDeleteVisionAttributeMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useKey('Escape', onFinish)

  const isDisabled = useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])

  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<VisionAttribute, 'id'>> = {}
    if (name !== visionAttribute.name) {
      fields.name = name
    }
    if (status !== visionAttribute.status) {
      fields.status = status
    }
    if (imageId !== visionAttribute.imageId) {
      fields.imageId = imageId
    }

    updateVisionAttribute({
      id: visionAttribute.id,
      fields,
    })
    onFinish()
  }

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      style={{ width: '100%' }}
      onSubmit={preventDefault<FormEvent<HTMLFormElement>>(() =>
        handleSubmit(),
      )}
    >
      <VStack gap={28}>
        <VisionAttributeNameInput
          autoFocus
          onChange={setName}
          value={name}
          onSubmit={handleSubmit}
        />
        <VStack alignItems="start">
          <VisionAttributeStatusSelector value={status} onChange={setStatus} />
        </VStack>
      </VStack>
      <VisionImageInput value={imageId ?? null} onChange={setImageId} />

      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        <Button
          kind="alert"
          type="button"
          onClick={() => {
            deleteVisionAttribute({ id: visionAttribute.id })
            onFinish()
          }}
        >
          Delete
        </Button>
        <HStack alignItems="center" gap={8}>
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
