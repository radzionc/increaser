import { IconButton } from '@lib/ui/buttons/IconButton'
import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import styled from 'styled-components'

export const FocusIconButton = styled(IconButton)`
  ${sameDimensions(
    checklistItemContentMinHeight + checklistItemVerticalPadding * 2,
  )};
`
