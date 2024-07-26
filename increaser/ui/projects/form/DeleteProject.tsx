import { TextButton } from '@lib/ui/buttons/TextButton'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Opener } from '@lib/ui/base/Opener'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import { otherProjectId } from '@increaser/entities/Project'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { Button } from '@lib/ui/buttons/Button'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'

export const DeleteProject = () => {
  const { name, id, status } = useCurrentProject()

  const { mutate: deleteProject } = useDeleteUserEntityMutation('project')

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  const { projects } = useAssertUserState()

  if (!couldProjectBeDeleted(id)) {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button kind="alert" type="button" onClick={onOpen}>
          Delete
        </Button>
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Confirm project deletion"
          onClose={onClose}
          confirmActionText="Delete"
          width={480}
          onConfirm={() => {
            deleteProject(id)
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
                {projects[otherProjectId].name}
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
                      fields: {
                        status: 'archived',
                        order: getLastItemOrder(
                          Object.values(projects).map(
                            (project) => project.order,
                          ),
                        ),
                      },
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
