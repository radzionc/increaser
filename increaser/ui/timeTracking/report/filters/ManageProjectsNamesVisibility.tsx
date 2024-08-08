import { IconButton } from '@lib/ui/buttons/IconButton'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { EyeOffIcon } from '@lib/ui/icons/EyeOffIcon'
import { EyeIcon } from '@lib/ui/icons/EyeIcon'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'

export const ManageProjectsNamesVisibility = () => {
  const { shouldHideProjectNames, setState } = useTrackedTime()

  const title = shouldHideProjectNames
    ? 'Show project names'
    : 'Hide project names'

  return (
    <Tooltip
      content={title}
      renderOpener={(props) => (
        <div {...props}>
          <IconButton
            kind="secondary"
            title={title}
            onClick={() =>
              setState((state) => ({
                ...state,
                shouldHideProjectNames: !state.shouldHideProjectNames,
              }))
            }
            icon={shouldHideProjectNames ? <EyeOffIcon /> : <EyeIcon />}
          />
        </div>
      )}
    />
  )
}
