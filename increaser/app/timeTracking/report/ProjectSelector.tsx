import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { Text } from '@lib/ui/text'
import { order } from '@lib/utils/array/order'
import { useTrackedTime } from './TrackedTimeProvider'
import { sum } from '@lib/utils/array/sum'

export const ProjectSelector = () => {
  const { activeProjectId, setState } = useTrackedTimeReport()
  const { projects } = useTrackedTime()

  const options = [
    null,
    ...order(
      Object.values(projects),
      (p) => sum(p.months.map((m) => m.seconds)),
      'desc',
    ).map((project) => project.id),
  ]

  return (
    <ExpandableSelector
      value={activeProjectId}
      onChange={(activeProjectId) =>
        setState((state) => ({ ...state, activeProjectId }))
      }
      options={options}
      getOptionKey={(option) => (option ? option : 'all')}
      renderOption={(option) => (
        <>
          {option && <Text color="contrast">{projects[option].emoji}</Text>}
          <Text>{option ? projects[option].name : 'All projects'}</Text>
        </>
      )}
    />
  )
}
