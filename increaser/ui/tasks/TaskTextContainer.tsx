import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

export const TaskTextContainer = styled(Text)`
  line-height: ${toSizeUnit(checklistItemContentMinHeight)};
  word-break: break-word;
`
