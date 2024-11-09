import { IconButton } from '@lib/ui/buttons/IconButton'
import { EyeOffIcon } from '@lib/ui/icons/EyeOffIcon'
import { EyeIcon } from '@lib/ui/icons/EyeIcon'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useShouldHideProjectNames } from './useShouldHideProjectNames'

export const HideProjectNamesSelector = () => {
  const [value, setValue] = useShouldHideProjectNames()

  const title = value ? 'Show project names' : 'Hide project names'

  return (
    <Tooltip
      content={title}
      renderOpener={(props) => (
        <div {...props}>
          <IconButton
            size="l"
            kind="secondary"
            title={title}
            onClick={() => setValue(!value)}
            icon={value ? <EyeOffIcon /> : <EyeIcon />}
          />
        </div>
      )}
    />
  )
}
