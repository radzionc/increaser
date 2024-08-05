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
import { Panel } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { useActiveSet } from '../ActiveSetProvider'
import { useActiveSetType } from '../overview/hooks/useActiveSetType'
import { useAddSetMutation } from '../../api/useAddSetMutation'
import { dayOverviewConfig } from '../overview/config'
import { useDeleteSetMutation } from '../../api/useDeleteSetMutation'
import { useUpdateSetMutation } from '../../api/useUpdateSetMutation'

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
        isDisabled={isDisabled}
      />
    </Container>
  )
}
