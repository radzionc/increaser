import { VisionAttributeStatus } from '@increaser/entities/Vision'
import { match } from '@lib/utils/match'
import { DefaultTheme } from 'styled-components/dist/types'

export const getVisionAttributeStatusColor = (
  status: VisionAttributeStatus,
  theme: DefaultTheme,
) =>
  match(status, {
    done: () => theme.colors.success,
    maintainance: () => theme.colors.success,
    inProgress: () => theme.colors.idle,
    toDo: () => theme.colors.getLabelColor(9),
  })
