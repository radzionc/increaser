import React, { ComponentProps, forwardRef } from 'react'
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

type TaskItemProps = ComponentProps<typeof Container>

export const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  (props, ref) => (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container {...props} onClick={onOpen} ref={ref}>
          <TaskPrimaryContent />
        </Container>
      )}
      renderContent={({ onClose }) => (
        <EditTaskFormOverlay onFinish={onClose} />
      )}
    />
  ),
)
