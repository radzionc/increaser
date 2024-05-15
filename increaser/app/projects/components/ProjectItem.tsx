import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { Opener } from '@lib/ui/base/Opener'
import { centerContent } from '@lib/ui/css/centerContent'
import { cropText } from '@lib/ui/css/cropText'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { EditProjectForm } from './ProjectForm/EditProjectForm'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { Circle } from '@lib/ui/layout/Circle'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import {
  SelectContainer,
  selectContainerMinHeight,
} from '@lib/ui/select/SelectContainer'

const Container = styled(Panel)`
  font-size: 14px;
`

const EditButton = styled(SelectContainer)`
  ${interactive};
  ${sameDimensions(selectContainerMinHeight)};
  ${centerContent};
  ${transition};
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

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
  const { name, emoji, hslaColor } = useCurrentProject()

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container kind="secondary">
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
              <HStack alignItems="center" gap={8}>
                <ProjectStatusSelector />
                <EditButton onClick={onOpen}>
                  <EditIcon />
                </EditButton>
              </HStack>
            </HStack>
          </Container>
        )
      }
      renderContent={({ onClose }) => <EditProjectForm onFinish={onClose} />}
    />
  )
}
