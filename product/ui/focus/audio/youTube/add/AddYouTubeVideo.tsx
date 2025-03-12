import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'

import { AddYouTubeVideoOverlay } from './AddYouTubeVideoOverlay'

export const AddYouTubeVideo = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button size="s" onClick={onOpen}>
          <HStack gap={8} alignItems="center">
            <PlusIcon />
            Add a video
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <AddYouTubeVideoOverlay onClose={onClose} />
      )}
    />
  )
}
