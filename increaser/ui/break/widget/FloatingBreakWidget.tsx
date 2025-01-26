import { HStack } from '@lib/ui/css/stack'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useBreakDuration } from '../duration/state/useBreakDuration'
import { FloatingWidgetContainer } from '../../floatingWidget/FloatingWidgetContainer'
import { ManageFloatingWidgetPosition } from '../../floatingWidget/ManageFloatingWidgetPosition'
import { FloatingWidgetHeader } from '../../floatingWidget/FloatingWidgetHeader'

export const FloatingBreakWidget = () => {
  const [breakDuration, setBreakDuration] = useBreakDuration()

  if (!breakDuration) {
    return null
  }

  return (
    <FloatingWidgetContainer>
      <FloatingWidgetHeader>
        {breakDuration}-minute break
        <HStack>
          <ManageFloatingWidgetPosition />
          <IconButton
            kind="secondary"
            title="Stop break"
            onClick={() => setBreakDuration(null)}
            icon={<CloseIcon />}
          />
        </HStack>
      </FloatingWidgetHeader>
      Break will be here!
    </FloatingWidgetContainer>
  )
}
