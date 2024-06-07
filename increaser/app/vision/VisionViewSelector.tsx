import {
  VisionView,
  getVisionPath,
  visionViews,
} from '@increaser/ui/navigation/AppPath'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useRouter } from 'next/router'

const visionViewName: Record<VisionView, string> = {
  my: 'My Vision',
  ideas: 'Vision Ideas',
}

export const VisionViewSelector = () => {
  const { pathname, push } = useRouter()

  const view = getLastItem(pathname.split('/')) as VisionView

  return (
    <PageTitleNavigation
      value={view}
      options={visionViews}
      onChange={(view) => push(getVisionPath(view))}
      getOptionName={(option) => visionViewName[option]}
    />
  )
}
