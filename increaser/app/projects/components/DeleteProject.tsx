import { useDeleteProjectMutation } from '@increaser/app/projects/api/userDeleteProjectMutation'
import { TextButton } from '@lib/ui/buttons/TextButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Opener } from '@lib/ui/base/Opener'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'
import {
  SelectContainer,
  selectContainerMinHeight,
} from '@lib/ui/select/SelectContainer'
import styled from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { transition } from '@lib/ui/css/transition'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'

const Button = styled(SelectContainer)`
  ${interactive};
  ${sameDimensions(selectContainerMinHeight)};
  ${centerContent};
  ${transition};
  color: ${getColor('alert')};
  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

export const DeleteProject = () => {
  const { name, id, status } = useCurrentProject()

  const { mutate: deleteProject } = useDeleteProjectMutation()

  const { mutate: updateProject } = useUpdateProjectMutation()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button onClick={onOpen}>
          <TrashBinIcon />
        </Button>
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
