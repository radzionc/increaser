import { useBreak } from '@increaser/app/break/hooks/useBreak'
import styled from 'styled-components'
import { Switch } from '@lib/ui/inputs/Switch/Switch'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

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
