const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

export class GithubApiError extends Error {}

export const githubGraphql = async <T>(
  token: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> => {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await response.json()

  if (json.errors?.length) {
    throw new GithubApiError(
      json.errors.map((error: { message: string }) => error.message).join('; '),
    )
  }

  return json.data as T
}
