import { useMainApi } from 'api/hooks/useMainApi'
import { useQuery } from 'react-query'
import { Text } from '@increaser/ui/ui/Text'

import { SliceTitle } from '../shared/SliceTitle'

const appStatsQuery = `
query {
  appStats {
    registeredUsersNumber
  }
}
`

interface AppStatsQueryResponse {
  registeredUsersNumber: number
}

export const SignupsNumber = () => {
  const { query } = useMainApi()
  const { data } = useQuery(
    'registeredUsersNumber',
    async () => {
      const { registeredUsersNumber } = await query<AppStatsQueryResponse>({
        query: appStatsQuery,
      })

      return registeredUsersNumber
    },
    {
      // TODO: get from env variables
      initialData: 10734,
    },
  )

  return (
    <SliceTitle color="contrast" as="h2">
      JOIN{' '}
      <Text color="success" as="span">
        {data}
      </Text>{' '}
      AMBITIOUS PEOPLE
    </SliceTitle>
  )
}
