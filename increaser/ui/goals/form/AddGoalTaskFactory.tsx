import { Opener } from '@lib/ui/base/Opener'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ValueFinishProps } from '@lib/ui/props'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { selectContainerMinHeight } from '@lib/ui/select/SelectContainer'
import { getColor } from '@lib/ui/theme/getters'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Container = styled(Button)`
  height: ${toSizeUnit(selectContainerMinHeight)};
  color: ${getColor('contrast')};
  font-weight: 500;
  ${horizontalPadding(12)};
  margin-left: -${toSizeUnit(tightListItemConfig.horizontalOffset)};
`

export const AddGoalTaskFactory = ({ onFinish }: ValueFinishProps<string>) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen} kind="ghost">
          <HStack alignItems="center" gap={8}>
            <PlusIcon />
            <Text>Add a task</Text>
          </HStack>
        </Container>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskFactoryForm
            onFinish={(taskFactory) => {
              onClose()
              if (taskFactory) {
                onFinish(taskFactory.id)
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
