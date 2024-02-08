import styled from 'styled-components'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const taskItemMinHeight = 40

export const TaskItemFrame = styled(ChecklistItemFrame)`
  min-height: ${toSizeUnit(taskItemMinHeight)};
`
