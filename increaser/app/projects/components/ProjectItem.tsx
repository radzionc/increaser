import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { Opener } from '@lib/ui/base/Opener'
import { centerContent } from '@lib/ui/css/centerContent'
import { cropText } from '@lib/ui/css/cropText'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { EditProjectForm } from './ProjectForm/EditProjectForm'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { Circle } from '@lib/ui/layout/Circle'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import { ExpandablePanel } from '@lib/ui/panel/ExpandablePanel'
import { DeleteProject } from './DeleteProject'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { couldProjectStatusBeChanged } from '@increaser/entities-utils/project/couldProjectStatusBeChanged'

const IdentifierContainer = styled.div`
  background: ${getColor('foreground')};
  border: 1px solid ${getColor('mist')};
  ${centerContent};
  ${round};
  color: ${getColor('contrast')};
  ${sameDimensions(28)}
  font-size: 14px;
`

const Content = styled(HStack)`
  ${cropText};
`

export const ProjectItem = () => {
  const { name, emoji, hslaColor, id } = useCurrentProject()

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <ExpandablePanel
            kind="secondary"
            header={
              <HStack
                fullWidth
                alignItems="center"
                justifyContent="space-between"
                wrap="wrap"
                gap={8}
              >
                <Content alignItems="center" gap={8}>
                  <IdentifierContainer>{emoji}</IdentifierContainer>
                  <IdentifierContainer>
                    <Circle size={14} background={hslaColor} />
                  </IdentifierContainer>

                  <Text color="contrast" cropped weight="semibold">
                    {name}
                  </Text>
                </Content>
              </HStack>
            }
            renderContent={() => (
              <HStack alignItems="center" gap={8}>
                {couldProjectStatusBeChanged(id) && <ProjectStatusSelector />}
                <IconButton
                  title="Edit project"
                  size="l"
                  onClick={onOpen}
                  icon={<EditIcon />}
                />
                <DeleteProject />
              </HStack>
            )}
          />
        )
      }
      renderContent={({ onClose }) => <EditProjectForm onFinish={onClose} />}
    />
  )
}
