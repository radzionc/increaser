import { HStack } from '@lib/ui/layout/Stack'
import { DeleteSetAction } from './DeleteSetAction'
import { SubmitSetAction } from './SubmitSetAction'
import { useActiveSetType } from '../hooks/useActiveSetType'

export const SetEdtitorFooter = () => {
  const type = useActiveSetType()

  return (
    <HStack gap={4} wrap="wrap" fullWidth justifyContent="space-between">
      {type === 'new' ? <div /> : <DeleteSetAction />}
      <SubmitSetAction />
    </HStack>
  )
}
