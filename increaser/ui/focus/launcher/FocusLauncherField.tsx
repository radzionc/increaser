import { panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ChildrenProp, LabelProp } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import styled from 'styled-components'

const Label = styled.div`
  ${text({
    color: 'supporting',
    weight: 600,
    size: 12,
  })}
  padding-left: ${toSizeUnit(panelDefaultPadding)};
`

export const FocusLauncherField = ({
  label,
  children,
}: LabelProp & ChildrenProp) => {
  return (
    <VStack gap={8}>
      <Label>{label}</Label>
      {children}
    </VStack>
  )
}
