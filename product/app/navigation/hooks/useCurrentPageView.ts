import {
  AppPageWithView,
  AppPathViewOf,
  appPageViews,
} from '@product/ui/navigation/app'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useCurrentPageView = <P extends AppPageWithView>(
  page: P,
): AppPathViewOf<P> => {
  const router = useRouter()
  const { asPath } = router

  return useMemo(() => {
    const [, view] = asPath.split('/').slice(1)

    if (appPageViews[page].includes(view as never)) {
      return view as AppPathViewOf<P>
    }

    return appPageViews[page][0] as AppPathViewOf<P>
  }, [asPath, page])
}
