import { ApiError } from '@product/api-interface/ApiError'
import { getUser } from '@product/db/user'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { githubGraphql } from '../client'

interface ProjectNode {
  id: string
  number: number
  title: string
}

interface ListProjectsResponse {
  viewer: {
    login: string
    projectsV2: { nodes: ProjectNode[] }
    organizations: {
      nodes: {
        login: string
        projectsV2: { nodes: ProjectNode[] }
      }[]
    }
  }
}

const query = `
  query {
    viewer {
      login
      projectsV2(first: 20) {
        nodes { id number title }
      }
      organizations(first: 20) {
        nodes {
          login
          projectsV2(first: 20) {
            nodes { id number title }
          }
        }
      }
    }
  }
`

export const listGithubProjects: ApiResolver<'listGithubProjects'> = async ({
  context,
}) => {
  const userId = assertUserId(context)
  const { githubToken } = await getUser(userId, ['githubToken'])

  if (!githubToken) {
    throw new ApiError(
      'invalidInput',
      'Connect a GitHub token before listing projects.',
    )
  }

  const data = await githubGraphql<ListProjectsResponse>(githubToken, query)

  const ownProjects = data.viewer.projectsV2.nodes.map((project) => ({
    ...project,
    owner: data.viewer.login,
  }))

  const orgProjects = data.viewer.organizations.nodes.flatMap((org) =>
    org.projectsV2.nodes.map((project) => ({
      ...project,
      owner: org.login,
    })),
  )

  return [...ownProjects, ...orgProjects]
}
