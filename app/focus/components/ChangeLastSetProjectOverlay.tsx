import { getLastItem } from '@increaser/utils/array/getLastItem'
import { ChangeProjectOverlay } from 'projects/components/ChangeProjectOverlay'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useUpdateLastSetMutation } from 'sets/hooks/useUpdateLastSetMutation'
import { ClosableComponentProps } from '@increaser/ui/props'

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
