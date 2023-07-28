import { useBreak } from 'break/hooks/useBreak'
import styled from 'styled-components'
import { Switch } from '@increaser/ui/ui/Switch/Switch'
import { getVerticalPaddingCSS } from '@increaser/ui/ui/utils/getVerticalPaddingCSS'

const NotificationsSwitch = styled(Switch)`
  ${getVerticalPaddingCSS(8)}
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
