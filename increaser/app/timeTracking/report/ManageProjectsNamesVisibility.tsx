import { IconButton } from '@lib/ui/buttons/IconButton'
import { useTrackedTime } from './TrackedTimeProvider'
import { EyeOffIcon } from '@lib/ui/icons/EyeOffIcon'
import { EyeIcon } from '@lib/ui/icons/EyeIcon'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import styled from 'styled-components'

const Container = styled(IconButton)`
  ${sameDimensions(40)}
`

export const ManageProjectsNamesVisibility = () => {
  const { hideProjectNames, setState } = useTrackedTime()

  const title = hideProjectNames ? 'Show project names' : 'Hide project names'

  return (
    <Tooltip
      content={title}
      renderOpener={(props) => (
        <div {...props}>
          <Container
            title={title}
            onClick={() =>
              setState((state) => ({
                ...state,
                hideProjectNames: !state.hideProjectNames,
              }))
            }
            icon={hideProjectNames ? <EyeOffIcon /> : <EyeIcon />}
          />
        </div>
      )}
    />
  )
}
