import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useHaveFinishedASet = () => {
  const { sets, projects } = useAssertUserState()

  return (
    sets.length > 0 ||
    projects.some((p) => p.weeks.some((week) => week.seconds > 0))
  )
}
