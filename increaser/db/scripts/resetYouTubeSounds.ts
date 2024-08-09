import { defaultFocusSounds } from '@increaser/entities/FocusSound'
import { getUserByEmail, updateUser } from '../user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const resetYouTubeSounds = async () => {
  const { id } = shouldBePresent(
    await getUserByEmail('geekrodion@gmail.com', ['id']),
  )
  await updateUser(id, { focusSounds: defaultFocusSounds })
}

resetYouTubeSounds()
