import { SetEditorContent } from './SetEditorContent'
import { SetEditorHeader } from './SetEditorHeader'
import { SetEditorProject } from './SetEditorProject'
import { useCallback, useEffect, useMemo } from 'react'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useActiveSet } from '../ActiveSetProvider'
import { useActiveSetType } from '../overview/hooks/useActiveSetType'
import { useAddSetMutation } from '../../api/useAddSetMutation'
import { useDeleteSetMutation } from '../../api/useDeleteSetMutation'
import { useUpdateSetMutation } from '../../api/useUpdateSetMutation'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'

export const SetEditorForm = () => {
  const [activeSet, setActiveSet] = usePresentState(useActiveSet())

  const { start, end, projectId, initialSet } = activeSet

  const type = useActiveSetType()
  const { sets } = useAssertUserState()

  const isDisabled = useMemo(() => {
    const hasIntersection = sets.some((set) => {
      if (initialSet && areEqualIntervals(initialSet, set)) {
        return false
      }

      return areIntersecting(set, { start, end })
    })
    if (hasIntersection) {
      return 'This session intersects with another session'
    }

    return false
  }, [end, initialSet, sets, start])

  const { mutate: addSet } = useAddSetMutation()
  const { mutate: updateSet } = useUpdateSetMutation()
  const { mutate: deleteSet } = useDeleteSetMutation()

  const onCancel = useCallback(() => {
    setActiveSet(null)
  }, [setActiveSet])

  const onSubmit = useCallback(() => {
    if (isDisabled) return
    const set = {
      start,
      end,
      projectId,
    }
    if (type === 'new') {
      addSet(set)
    } else {
      updateSet({
        old: shouldBePresent(initialSet),
        new: set,
      })
    }

    onCancel()
  }, [
    addSet,
    end,
    initialSet,
    isDisabled,
    onCancel,
    projectId,
    start,
    type,
    updateSet,
  ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onSubmit()
      } else if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel, onSubmit])

  const onDelete = () => {
    deleteSet(shouldBePresent(initialSet))
  }

  return (
    <>
      <SetEditorHeader />
      <SetEditorProject />
      <SetEditorContent />
      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        {initialSet ? (
          <Button kind="alert" type="button" onClick={onDelete}>
            Delete
          </Button>
        ) : (
          <div />
        )}
        <HStack alignItems="center" gap={8}>
          <Button type="button" onClick={onCancel} kind="secondary">
            Cancel
          </Button>
          <Button onClick={onSubmit} isDisabled={isDisabled}>
            Save
          </Button>
        </HStack>
      </HStack>
    </>
  )
}
