import { assertQueryParams } from 'auth/helpers/assertQueryParams'
import { useHandleIdentificationFailure } from 'auth/hooks/useHandleIdentificationFailure'
import { useIdentificationMutation } from 'auth/hooks/useIdentificationMutation'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { getTimeZone } from 'shared/utils/getTimeZone'

const identificationQueryResult = `
email
name
token
tokenExpirationTime
id
firstIdentification
`

const identifyWithEmailQuery = `
query identifyWithEmail($input: IdentifyWithEmailInput!) {
  identifyWithEmail(input: $input) {
    ${identificationQueryResult}
  }
}
`

export const EmailAuthPage = () => {
  const { mutateAsync: identify } = useIdentificationMutation()

  const { mutate: processEmailAuthParams, error } = useMutation(async () => {
    const { token, destination } = assertQueryParams(['token', 'destination'])

    const variables = {
      input: {
        token,
        timeZone: getTimeZone(),
      },
    }

    await identify({
      destination,
      queryParams: { variables, query: identifyWithEmailQuery },
    })
  })

  useHandleIdentificationFailure(error)

  useEffect(() => {
    processEmailAuthParams()
  }, [processEmailAuthParams])

  return null
}
