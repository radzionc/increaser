import { useDeleteProjectMutation } from 'projects/api/userDeleteProjectMutation'
import { useUpdateProjectMutation } from 'projects/api/useUpdateProjectMutation'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { TextButton } from '@increaser/ui/ui/buttons/TextButton'
import { TrashBinIcon } from '@increaser/ui/icons/TrashBinIcon'
import { ConfirmationModal } from '@increaser/ui/modal/ConfirmationModal'
import { Opener } from '@increaser/ui/ui/Opener'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useCurrentProject } from './ProjectView/CurrentProjectProvider'

export const DeleteProject = () => {
  const { name, id, status } = useCurrentProject()

  const { mutate: deleteProject } = useDeleteProjectMutation()

  const { mutate: updateProject } = useUpdateProjectMutation()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <IconButton
          title="Delete"
          kind="alert"
          icon={<TrashBinIcon />}
          onClick={onOpen}
        />
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Delete project"
          onClose={onClose}
          confirmActionText="Delete"
          onConfirm={() => {
            deleteProject({ id })
          }}
        >
          <VStack gap={12}>
            <Text color="supporting">
              Are you sure you want to delete{' '}
              <Text as="span" color="regular">
                {name}?
              </Text>{' '}
              This action will remove all the analytics related to the project.
            </Text>
            {status === 'ACTIVE' && (
              <Text color="supporting">
                To keep the data but hide the project from other parts of the
                app -{' '}
                <TextButton
                  onClick={() => {
                    updateProject({
                      id,
                      fields: { status: 'INACTIVE' },
                    })
                    onClose()
                  }}
                  text="make it inactive."
                />
              </Text>
            )}
          </VStack>
        </ConfirmationModal>
      )}
    />
  )
}
