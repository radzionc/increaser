import { useMutation } from 'react-query'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { graphql } from '@increaser/api-interface/client'
import { Project } from '@increaser/entities/Project'

export const createProejctMutationDocument = graphql(`
  mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      color
      status
      emoji
      total
      allocatedMinutesPerWeek
      weeks {
        year
        week
        seconds
      }
      months {
        year
        month
        seconds
      }
    }
  }
`)

interface UseCreateProjectMutationParams {
  onSuccess?: (project: Project) => void
  onOptimisticUpdate?: (project: Project) => void
}

export const useCreateProjectMutation = (
  params?: UseCreateProjectMutationParams,
) => {
  const { projects } = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(
    async (
      projectParams: Pick<
        Project,
        'name' | 'color' | 'emoji' | 'allocatedMinutesPerWeek'
      >,
    ) => {
      const input = {
        ...projectParams,
        id: getId(),
      }

      const project: Project = {
        ...input,

        total: 0,
        status: 'ACTIVE',
        weeks: [],
        months: [],
      }

      updateState({ projects: [...projects, project] })
      params?.onOptimisticUpdate?.(project)

      const projectResult = await updateRemoteState(
        createProejctMutationDocument,
        {
          input: input,
        },
      )

      return projectResult as Project
    },
    params,
  )
}
