import { DnDItemStatus } from '@lib/dnd/DnDItemStatus'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { TaskItem } from './TaskItem'
import { match } from '@lib/utils/match'

export const DraggableTaskItem = styled(TaskItem)<{ status: DnDItemStatus }>`
  ${({ status }) =>
    match(status, {
      idle: () => css``,
      overlay: () => css`
        cursor: grabbing;
        border-color: ${getColor('mistExtra')};
        &:hover {
          border-color: ${getColor('mistExtra')};
        }
      `,
      placeholder: () => css`
        opacity: 0.4;
      `,
    })}
`
