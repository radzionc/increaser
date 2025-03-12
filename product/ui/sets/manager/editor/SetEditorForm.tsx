import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useKeyDown } from '@lib/ui/hooks/useKeyDown'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useAddSetMutation } from '../../api/useAddSetMutation'
import { useUpdateSetMutation } from '../../api/useUpdateSetMutation'
import { useSets } from '../../hooks/useSets'
import { useActiveSet } from '../ActiveSetProvider'
import { useActiveSetType } from '../overview/hooks/useActiveSetType'

import { setEditorConfig } from './config'
import { SetEditorContent } from './SetEditorContent'
import { SetEditorHeader } from './SetEditorHeader'

const Footer = styled(HStack)`
  ${verticalPadding(setEditorConfig.rightPadding)};
  padding-right: ${toSizeUnit(setEditorConfig.rightPadding)};
`

export const SetEditorForm = () => {
  const [activeSet, setActiveSet] = usePresentState(useActiveSet())

  const { start, end, projectId, initialSet } = activeSet

  const type = useActiveSetType()
  const sets = useSets()

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

  useKeyDown('Enter', onSubmit)

  useKeyDown('Escape', onCancel)

  return (
    <>
      <SetEditorHeader />
      <SetEditorContent />
      <Footer
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        <HStack fullWidth justifyContent="end" gap={8}>
          <Button onClick={onCancel} kind="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={onSubmit} isDisabled={isDisabled}>
            Save
          </Button>
        </HStack>
      </Footer>
    </>
  )
}
