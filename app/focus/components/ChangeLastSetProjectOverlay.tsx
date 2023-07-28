import { ChangeProjectOverlay } from 'projects/components/ChangeProjectOverlay'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useUpdateLastSetMutation } from 'sets/hooks/useUpdateLastSetMutation'
import { ClosableComponentProps } from 'shared/props'
import { getLast } from 'shared/utils/getLast'

interface Props extends ClosableComponentProps {}

export const ChangeLastSetProjectOverlay = ({ onClose }: Props) => {
  const sets = useTodaySets()
  const set = getLast(sets)

  const { mutate: updateLastSet } = useUpdateLastSetMutation()

  return (
    <ChangeProjectOverlay
      initialValue={set.projectId}
      onClose={onClose}
      onSubmit={(projectId) => {
        updateLastSet({ ...set, projectId })
        onClose()
      }}
    />
  )
}
