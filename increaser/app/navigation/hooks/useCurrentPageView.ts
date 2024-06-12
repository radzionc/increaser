import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  AppPageWithView,
  AppPathViewOf,
  appPageViews,
} from '@increaser/ui/navigation/app'

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

    throw new Error(`Invalid view=${view} for page=${page}`)
  }, [asPath, page])
}
