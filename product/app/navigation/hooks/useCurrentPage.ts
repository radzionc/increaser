import { mirrorRecord } from '@lib/utils/record/mirrorRecord'
import { AppPage, appPagePath } from '@product/ui/navigation/app'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useCurrentPage = (): AppPage => {
  const router = useRouter()
  const { asPath } = router

  return useMemo(() => {
    const [path] = asPath.split('/').slice(1)
    const page = mirrorRecord(appPagePath)[path]
    if (!page) {
      throw new Error(`Invalid path=${path}`)
    }

    return page
  }, [asPath])
}
