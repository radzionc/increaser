import { useDeleteProjectMutation } from '@increaser/app/projects/api/userDeleteProjectMutation'
import { TextButton } from '@lib/ui/buttons/TextButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Opener } from '@lib/ui/base/Opener'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import { otherProject } from '@increaser/entities/Project'

export const DeleteProject = () => {
  const { name, id, status } = useCurrentProject()

  const { mutate: deleteProject } = useDeleteProjectMutation()

  const { mutate: updateProject } = useUpdateProjectMutation()

  if (!couldProjectBeDeleted(id)) {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <IconButton
          size="l"
          kind="alert"
          icon={<TrashBinIcon />}
          title="Delete project"
          onClick={onOpen}
        />
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Confirm project deletion"
          onClose={onClose}
          confirmActionText="Delete"
          width={480}
          onConfirm={() => {
            deleteProject({ id })
          }}
        >
          <VStack gap={12}>
            <Text height="large" color="supporting">
              Are you sure you want to delete{' '}
              <Text as="span" color="contrast">
                {name}
              </Text>{' '}
              ? All associated data will be reassigned to the{' '}
              <Text as="span" color="contrast">
                {otherProject.name}
              </Text>{' '}
              project.
            </Text>
            {status !== 'archived' && (
              <Text height="large" color="supporting">
                If you prefer, you can{' '}
                <TextButton
                  as="span"
                  onClick={() => {
                    updateProject({
                      id,
                      fields: { status: 'archived' },
                    })
                    onClose()
                  }}
                >
                  archive this project
                </TextButton>{' '}
                instead.
              </Text>
            )}
          </VStack>
        </ConfirmationModal>
      )}
    />
  )
}
