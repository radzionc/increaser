import { Opener } from '@lib/ui/base/Opener'
import { TextButton } from '@lib/ui/buttons/TextButton'
import { VStack } from '@lib/ui/css/stack'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Text } from '@lib/ui/text'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { otherProjectId } from '@product/entities/Project'
import { couldProjectBeDeleted } from '@product/entities-utils/project/couldProjectBeDeleted'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import { useUser } from '@product/ui/user/state/user'

import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'

export const DeleteProject = () => {
  const { name, id, status } = useCurrentProject()

  const { mutate: deleteProject } = useDeleteUserEntityMutation('project')

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  const { projects } = useUser()

  if (!couldProjectBeDeleted(id)) {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => <PanelFormDeleteButton onClick={onOpen} />}
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
            <Text height="l" color="supporting">
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
              <Text height="l" color="supporting">
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
