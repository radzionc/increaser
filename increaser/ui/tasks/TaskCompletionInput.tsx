import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'

const Container = styled(CheckStatus)`
  ${interactive};
  position: relative;
  ${sameDimensions(tightListItemConfig.lineHeight)};
`

export const TaskCompletionInput = ({
  value,
  onChange,
}: InputProps<boolean>) => {
  return (
    <Container isInteractive forwardedAs="label" value={value}>
      <InvisibleHTMLCheckbox value={value} onChange={onChange} />
    </Container>
  )
}
