import { useAssertUserState } from 'user/state/UserStateContext'

export const useHaveFinishedASet = () => {
  const { sets, projects } = useAssertUserState()

  return (
    sets.length > 0 ||
    projects.some((p) => p.weeks.some((week) => week.seconds > 0))
  )
}
