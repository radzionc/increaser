import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'

import { useTrackTime } from './state/TrackTimeContext'
import { DeleteSetAction } from './DeleteSetAction'
import { AddSetPrompt } from './AddSetPrompt'
import { SubmitSetAction } from './SubmitSetAction'

export const TrackTimeFooter = () => {
  const { setState, currentSet } = useTrackTime()

  return (
    <HStack gap={12} wrap="wrap" fullWidth justifyContent="space-between">
      {currentSet?.index === undefined ? <div /> : <DeleteSetAction />}
      {currentSet ? (
        <HStack gap={12}>
          <Button
            onClick={() =>
              setState((state) => ({
                ...state,
                currentSet: null,
              }))
            }
            kind="secondary"
          >
            Cancel
          </Button>
          <SubmitSetAction />
        </HStack>
      ) : (
        <AddSetPrompt />
      )}
    </HStack>
  )
}
