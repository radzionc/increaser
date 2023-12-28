import { getLastItem } from '@lib/utils/array/getLastItem'
import { ChangeProjectOverlay } from '@increaser/app/projects/components/ChangeProjectOverlay'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useUpdateLastSetMutation } from '@increaser/app/sets/hooks/useUpdateLastSetMutation'
import { ClosableComponentProps } from '@lib/ui/props'

interface Props extends ClosableComponentProps {}

export const ChangeLastSetProjectOverlay = ({ onClose }: Props) => {
  const sets = useTodaySets()
  const set = getLastItem(sets)

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
