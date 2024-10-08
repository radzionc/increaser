import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'

const Container = styled(CheckStatus)`
  ${interactive};
  position: relative;
  ${sameDimensions(tightListItemConfig.lineHeight)};
`

export const TaskCompletionInput = ({
  value,
  onChange,
  ...rest
}: InputProps<boolean> & ComponentProps<typeof Container>) => {
  return (
    <Container isInteractive forwardedAs="label" value={value} {...rest}>
      <InvisibleHTMLCheckbox value={value} onChange={onChange} />
    </Container>
  )
}
