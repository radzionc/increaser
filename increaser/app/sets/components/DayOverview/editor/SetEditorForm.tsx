import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { SetEditorContent } from './SetEditorContent'
import { SetEditorHeader } from './SetEditorHeader'
import { SetEditorProject } from './SetEditorProject'
import { useMemo } from 'react'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useAddSetMutation } from '../../../hooks/useAddSetMutation'
import { useUpdateSetMutation } from '../../../hooks/useUpdateSetMutation'
import { useActiveSet } from '../ActiveSetProvider'
import { useActiveSetType } from '../hooks/useActiveSetType'
import { Panel } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { dayOverviewConfig } from '../config'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { useDeleteSetMutation } from '../../../hooks/useDeleteSetMutation'

const Container = styled(Panel)`
  height: 100%;
`

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

  const onSubmit = () => {
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

    setActiveSet(null)
  }

  return (
    <Container
      as="form"
      padding={dayOverviewConfig.horizontalPadding}
      withSections
      kind="secondary"
      {...getFormProps({
        onClose: () => setActiveSet(null),
        isDisabled,
        onSubmit,
      })}
    >
      <SetEditorHeader />
      <SetEditorProject />
      <SetEditorContent />
      <EditDeleteFormFooter
        onDelete={
          type === 'edit'
            ? () => {
                deleteSet(activeSet)
                setActiveSet(null)
              }
            : undefined
        }
        onCancel={() => setActiveSet(null)}
        isDisabled={isDisabled}
      />
    </Container>
  )
}
