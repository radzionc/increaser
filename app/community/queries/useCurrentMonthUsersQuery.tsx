import { useQuery } from 'react-query'
import { PerformanceScoreboard } from '@increaser/entities/PerformanceScoreboard'

export const useCurrentMonthUsersQuery = () => {
  return useQuery('currentMonthUsers', async () => {
    const response = await window.fetch(
      'https://public.increaser.org/month.json',
      {
        method: 'GET',
      },
    )
    const data = (await response.json()) as PerformanceScoreboard
    return data
  })
}
