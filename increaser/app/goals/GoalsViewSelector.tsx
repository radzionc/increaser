import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'
import { appPageViews, getAppPath } from '@increaser/ui/navigation/app'

export const GoalsViewSelector = () => {
  const view = useCurrentPageView('goals')
  const { push } = useRouter()

  return (
    <RadioInput
      minOptionHeight={40}
      value={view}
      options={appPageViews.goals}
      onChange={(view) => push(getAppPath('goals', view))}
      renderOption={capitalizeFirstLetter}
    />
  )
}
