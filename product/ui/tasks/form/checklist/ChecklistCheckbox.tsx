import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'

const Container = styled(CheckStatus)`
  ${interactive};
  position: relative;
  ${sameDimensions(tightListItemConfig.lineHeight)};
`

export const ChecklistCheckbox = ({ value, onChange }: InputProps<boolean>) => {
  return (
    <Container isInteractive forwardedAs="label" value={value}>
      <InvisibleHTMLCheckbox value={value} onChange={onChange} />
    </Container>
  )
}
