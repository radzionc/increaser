import { useApiQuery } from 'api/hooks/useApiQuery'

export const useScoreboardQuery = (id: string) => {
  return useApiQuery('scoreboard', { id })
}
