import {
  GoalsView,
  getGoalsPath,
  goalsViews,
} from '@increaser/ui/navigation/AppPath'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useRouter } from 'next/router'

export const GoalsViewSelector = () => {
  const { pathname, push } = useRouter()

  const view = getLastItem(pathname.split('/')) as GoalsView

  return (
    <RadioInput
      minOptionHeight={40}
      value={view}
      options={goalsViews}
      onChange={(view) => push(getGoalsPath(view))}
      renderOption={capitalizeFirstLetter}
    />
  )
}
