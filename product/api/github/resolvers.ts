import { ApiError } from '@product/api-interface/ApiError'
import { getEnvVar } from '../../getEnvVar'
import { githubGraphql } from './client'

interface GitHubIssue {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  body: string
  labels: Array<{ name: string }>
  createdAt: string
  updatedAt: string
}

interface FetchIssuesParams {
  owner: string
  repo: string
  state?: 'open' | 'closed' | 'all'
}

export const fetchGitHubIssues = async ({
  owner,
  repo,
  state = 'open',
}: FetchIssuesParams): Promise<GitHubIssue[]> => {
  const token = getEnvVar('GITHUB_TOKEN')

  if (!token) {
    throw new ApiError('configuration', 'GITHUB_TOKEN not configured')
  }

  try {
    const query = `
      query GetIssues($owner: String!, $repo: String!, $state: [IssueState!]) {
        repository(owner: $owner, name: $repo) {
          issues(first: 50, states: $state) {
            edges {
              node {
                id
                number
                title
                state
                body
                labels(first: 10) {
                  edges {
                    node {
                      name
                    }
                  }
                }
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    `

    const data = await githubGraphql<any>(token, query, {
      owner,
      repo,
      state: state === 'all' ? ['OPEN', 'CLOSED'] : [state.toUpperCase()],
    })

    return data.repository.issues.edges.map((edge: any) => ({
      id: edge.node.id,
      number: edge.node.number,
      title: edge.node.title,
      state: edge.node.state.toLowerCase(),
      body: edge.node.body,
      labels: edge.node.labels.edges.map((label: any) => ({ name: label.node.name })),
      createdAt: edge.node.createdAt,
      updatedAt: edge.node.updatedAt,
    }))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new ApiError('github_api', `Failed to fetch issues: ${message}`)
  }
}

interface UpdateIssueStatusParams {
  owner: string
  repo: string
  issueNumber: number
  state: 'open' | 'closed'
}

export const updateGitHubIssueStatus = async ({
  owner,
  repo,
  issueNumber,
  state,
}: UpdateIssueStatusParams): Promise<void> => {
  const token = getEnvVar('GITHUB_TOKEN')

  if (!token) {
    throw new ApiError('configuration', 'GITHUB_TOKEN not configured')
  }

  try {
    const mutation = `
      mutation UpdateIssue($input: UpdateIssueInput!) {
        updateIssue(input: $input) {
          issue {
            id
            state
          }
        }
      }
    `

    const query = `
      query GetIssueId($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $number) {
            id
          }
        }
      }
    `

    // First, get the issue ID
    const issueData = await githubGraphql<any>(token, query, {
      owner,
      repo,
      number: issueNumber,
    })

    const issueId = issueData.repository.issue.id

    // Then update it
    await githubGraphql<any>(token, mutation, {
      input: {
        id: issueId,
        state: state.toUpperCase(),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new ApiError('github_api', `Failed to update issue: ${message}`)
  }
}
