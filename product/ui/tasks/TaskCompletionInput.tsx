import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'
import styled from 'styled-components'

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
