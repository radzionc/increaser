import { Text } from '@increaser/ui/ui/Text'
import { Tooltip } from '@increaser/ui/ui/Tooltip'
import { IconButton } from '@increaser/ui/ui/buttons/IconButton'
import { MinimizeIcon } from '@increaser/ui/ui/icons/MinimizeIcon'
import Link from 'next/link'
import { Path } from 'router/Path'

export const ShrinkFocusView = () => {
  return (
    <Tooltip
      content={<Text nowrap>Exit full screen</Text>}
      renderOpener={(props) => (
        <Link href={Path.Landing} {...props}>
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
