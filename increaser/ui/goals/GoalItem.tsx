import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { EditGoalForm } from './form/EditGoalForm'
import { GoalItemContent } from './GoalItemContent'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

const Container = styled(Hoverable)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  text-align: start;
  width: 100%;
`

export const GoalItem = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen} verticalOffset={0}>
          <GoalItemContent />
        </Container>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <EditGoalForm onClose={onClose} />
        </PanelModal>
      )}
    />
  )
}
