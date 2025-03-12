import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { defaultFocusSounds } from '@product/entities/FocusSound'

import { getUserByEmail, updateUser } from '../user'

export const resetYouTubeSounds = async () => {
  const { id } = shouldBePresent(
    await getUserByEmail('geekrodion@gmail.com', ['id']),
  )
  await updateUser(id, { focusSounds: defaultFocusSounds })
}

resetYouTubeSounds()
