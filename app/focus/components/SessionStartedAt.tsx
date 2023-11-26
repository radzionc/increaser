import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { ShyTextButton } from '@increaser/ui/buttons/ShyTextButton'
import { Opener } from '@increaser/ui/base/Opener'
import { Text } from '@increaser/ui/text'

import { UpdateSetProjectOverlay } from './UpdateSetProjectOverlay'
import { UpdateSetStartTimeOverlay } from './UpdateSetStartTimeOverlay'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

export const SesssionStartedAt = () => {
  const { currentSet: optionalCurrentSet, updateStartTime } = useFocus()
  const { startedAt, projectId } = shouldBeDefined(optionalCurrentSet)

  const { projectsRecord } = useProjects()
  const project = projectsRecord[projectId]

  return (
    <Text as="div" color="shy" size={14}>
      <Opener
        renderOpener={({ onOpen }) => (
          <ShyTextButton onClick={onOpen} text={project.name} />
        )}
        renderContent={({ onClose }) => (
          <UpdateSetProjectOverlay onClose={onClose} />
        )}
      />{' '}
      session started at{' '}
      <Opener
        renderOpener={({ onOpen }) => (
          <ShyTextButton
            onClick={onOpen}
            text={new Date(startedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
        )}
        renderContent={({ onClose }) => (
          <UpdateSetStartTimeOverlay
            onClose={onClose}
            onSubmit={(value) => {
              updateStartTime(value)
              onClose()
            }}
          />
        )}
      />
    </Text>
  )
}
