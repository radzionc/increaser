import React from 'react'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { taskBoardConfig } from '../config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { TaskPrimaryContent } from '../../TaskPrimaryContent'
import { Opener } from '@lib/ui/base/Opener'
import { EditTaskFormOverlay } from '../../form/EditTaskFormOverlay'

const Container = styled.div`
  background: ${getColor('foreground')};
  padding: ${toSizeUnit(taskBoardConfig.itemHorizontalPadding)};
  ${borderRadius.s};
  ${interactive};
  border: 2px solid transparent;
  line-height: 1.5;

  &:hover {
    border-color: ${getColor('primary')};
  }
`

export const TaskItem = () => (
  <Opener
    renderOpener={({ onOpen }) => (
      <Container onClick={onOpen}>
        <TaskPrimaryContent />
      </Container>
    )}
    renderContent={({ onClose }) => <EditTaskFormOverlay onFinish={onClose} />}
  />
)
