import { match } from '@lib/utils/match'
import { ProjectStatus } from '@product/entities/Project'
import { DefaultTheme } from 'styled-components/dist/types'

export const getProjectStatusColor = (
  status: ProjectStatus,
  { colors }: DefaultTheme,
) =>
  match(status, {
    active: () => colors.success,
    inactive: () => colors.idle,
    archived: () => colors.alert,
  })
