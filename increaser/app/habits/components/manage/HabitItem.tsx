import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { EditHabitForm } from './form/EditHabitForm'
import { HabitItemContent } from './HabitItemContent'
import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const HabitItem = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen} verticalOffset={0}>
          <HabitItemContent />
        </Container>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <EditHabitForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
