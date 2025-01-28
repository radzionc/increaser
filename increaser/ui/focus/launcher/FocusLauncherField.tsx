import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ActionProp, ChildrenProp, LabelProp } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import styled from 'styled-components'

const Label = styled.div`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  ${text({
    color: 'supporting',
    weight: 600,
    size: 12,
  })}
  padding-left: ${toSizeUnit(panelDefaultPadding)};
  min-height: 32px;
`

export const FocusLauncherField = ({
  label,
  children,
  action,
}: LabelProp & ChildrenProp & Partial<ActionProp>) => {
  return (
    <VStack>
      <Label>
        {label}
        {action}
      </Label>
      {children}
    </VStack>
  )
}
