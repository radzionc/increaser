import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { EditProjectForm } from './form/EditProjectForm'
import { ProjectItemContent } from './ProjectItemContent'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const ProjectItem = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container
          onClick={onOpen}
          verticalOffset={0}
          horizontalOffset={tightListItemConfig.horizontalOffset}
        >
          <ProjectItemContent />
        </Container>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <EditProjectForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
