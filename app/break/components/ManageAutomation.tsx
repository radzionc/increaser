import { useBreak } from 'break/hooks/useBreak'
import styled from 'styled-components'
import { Switch } from '@increaser/ui/inputs/Switch/Switch'
import { verticalPadding } from '@increaser/ui/css/verticalPadding'

const NotificationsSwitch = styled(Switch)`
  ${verticalPadding(8)}
`

export const ManageAutomation = () => {
  const { hasAutomaticBreak, setHasAutomaticBreak } = useBreak()

  return (
    <NotificationsSwitch
      label="Automatic breaks"
      onChange={setHasAutomaticBreak}
      value={hasAutomaticBreak}
    />
  )
}
