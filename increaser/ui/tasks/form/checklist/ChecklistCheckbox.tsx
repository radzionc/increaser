import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'
import { InputProps } from '@lib/ui/props'

const Container = styled(CheckStatus)`
  ${interactive};
  position: relative;
  ${sameDimensions(checklistItemContentMinHeight)};
`

export const ChecklistCheckbox = ({ value, onChange }: InputProps<boolean>) => {
  return (
    <Container isInteractive forwardedAs="label" value={value}>
      <InvisibleHTMLCheckbox value={value} onChange={onChange} />
    </Container>
  )
}
