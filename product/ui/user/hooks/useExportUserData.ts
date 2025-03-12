import { omit } from '@lib/utils/record/omit'
import { recordMap } from '@lib/utils/record/recordMap'
import { userReadonlyFields } from '@product/entities/User'
import { getPublicBucketUserFileKey } from '@product/public/getPublicBucketUserFileKey'
import { useCallback } from 'react'

import { useUser } from '../state/user'

export const useExportUserData = () => {
  const user = useUser()

  return useCallback(() => {
    const { vision, ...rest } = omit(
      user,
      ...userReadonlyFields,
      'country',
      'completedEducation',
      'isAnonymous',
      'name',
      'viewedNewFeaturesAt',
      'completedTasksDeletedAt',
      'ignoreEmails',
      'timeZone',
    )
    const result: any = { ...rest }

    result.vision = recordMap(vision, (item) => {
      if (!item.imageId) return item

      return {
        ...item,
        imageUrl: getPublicBucketUserFileKey(user.id, item.imageId),
      }
    })

    const json = JSON.stringify(result, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `increaser.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [user])
}
