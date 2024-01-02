import { Text } from '@lib/ui/text'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { MinimizeIcon } from '@lib/ui/icons/MinimizeIcon'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import Link from 'next/link'
import { AppPath } from '@increaser/ui/navigation/AppPath'

export const ShrinkFocusView = () => {
  return (
    <Tooltip
      content={<Text nowrap>Exit full screen</Text>}
      renderOpener={(props) => (
        <Link href={AppPath.Home} {...props}>
          <IconButton
            as="div"
            kind="secondary"
            title="Exit full screen"
            icon={<MinimizeIcon />}
          />
        </Link>
      )}
    />
  )
}
