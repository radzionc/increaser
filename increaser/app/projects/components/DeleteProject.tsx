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
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useProject } from '@increaser/ui/projects/hooks/useProject'

export const DeleteProject = () => {
  const projectId = useCurrentProject()
  const { name, id } = shouldBePresent(useProject(projectId))

  const { mutate: deleteProject } = useDeleteProjectMutation()

  const { mutate: updateProject } = useUpdateProjectMutation()

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
                      fields: { status: 'archived' },
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
