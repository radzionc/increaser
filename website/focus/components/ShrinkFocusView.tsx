import { Text } from '@increaser/ui/text'
import { Tooltip } from '@increaser/ui/tooltips/Tooltip'
import { IconButton } from '@increaser/ui/buttons/IconButton'
import { MinimizeIcon } from '@increaser/ui/icons/MinimizeIcon'
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
