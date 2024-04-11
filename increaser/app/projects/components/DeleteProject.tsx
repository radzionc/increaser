import { useDeleteProjectMutation } from '@increaser/app/projects/api/userDeleteProjectMutation'
import { useUpdateProjectMutation } from '@increaser/app/projects/api/useUpdateProjectMutation'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { TextButton } from '@lib/ui/buttons/TextButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Opener } from '@lib/ui/base/Opener'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

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
              <Text as="span" color="regular">
                {name}?
              </Text>{' '}
              This action will permanently remove all data related to the
              project, including tracked time.
            </Text>
            {status === 'active' && (
              <Text height="large" color="supporting">
                To retain the data, consider{' '}
                <TextButton
                  as="span"
                  onClick={() => {
                    updateProject({
                      id,
                      fields: { status: 'inactive' },
                    })
                    onClose()
                  }}
                >
                  archiving the project
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
