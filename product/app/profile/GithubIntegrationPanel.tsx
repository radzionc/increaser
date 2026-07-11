import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { useApiMutation } from '@product/api-ui/hooks/useApiMutation'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUserQuery } from '@product/ui/user/queries/useUserQuery'
import { useEffect, useState } from 'react'

export const GithubIntegrationPanel = () => {
  const { data: user } = useUserQuery()

  const [token, setToken] = useState('')
  const [projects, setProjects] = useState<
    { id: string; number: number; title: string; owner: string }[] | null
  >(null)
  const [syncResult, setSyncResult] = useState<string | null>(null)

  const { mutate: updateUser, isPending: isSavingToken } =
    useUpdateUserMutation()

  const { mutate: listProjects, isPending: isListingProjects } = useApiMutation(
    'listGithubProjects',
    {
      onSuccess: (data) => setProjects(data),
    },
  )

  const { mutate: syncProject, isPending: isSyncing } = useApiMutation(
    'syncGithubProject',
    {
      onSuccess: (data) =>
        setSyncResult(
          `Importados: ${data.imported} · Atualizados: ${data.updated} · Enviados ao GitHub: ${data.pushed}`,
        ),
    },
  )

  useEffect(() => {
    if (user?.githubToken) {
      setToken(user.githubToken)
    }
  }, [user?.githubToken])

  if (!user) {
    return null
  }

  const selectedProject =
    user.githubProjectOwner && user.githubProjectNumber
      ? `${user.githubProjectOwner} #${user.githubProjectNumber}`
      : null

  return (
    <Panel kind="secondary">
      <VStack gap={20}>
        <VStack gap={8}>
          <TextInput
            label="GitHub Personal Access Token"
            type="password"
            value={token}
            onValueChange={setToken}
          />
          <HStack justifyContent="flex-end">
            <Button
              isLoading={isSavingToken}
              isDisabled={!token || token === user.githubToken}
              onClick={() => updateUser({ githubToken: token })}
            >
              Salvar token
            </Button>
          </HStack>
        </VStack>

        <VStack gap={8}>
          <HStack justifyContent="space-between" alignItems="center">
            <span>
              {selectedProject
                ? `Project selecionado: ${selectedProject}`
                : 'Nenhum project selecionado'}
            </span>
            <Button
              kind="secondary"
              isLoading={isListingProjects}
              isDisabled={!user.githubToken}
              onClick={() => listProjects(undefined)}
            >
              Listar projects
            </Button>
          </HStack>

          {projects && (
            <VStack gap={4}>
              {projects.length === 0 && <span>Nenhum project encontrado.</span>}
              {projects.map((project) => (
                <Button
                  key={project.id}
                  kind="outlined"
                  onClick={() =>
                    updateUser({
                      githubProjectOwner: project.owner,
                      githubProjectNumber: project.number,
                    })
                  }
                >
                  {project.owner}/{project.title} (#{project.number})
                </Button>
              ))}
            </VStack>
          )}
        </VStack>

        <VStack gap={8}>
          <HStack justifyContent="space-between" alignItems="center">
            <span>
              {user.lastGithubSyncAt
                ? `Última sincronização: ${new Date(user.lastGithubSyncAt).toLocaleString()}`
                : 'Ainda não sincronizado'}
            </span>
            <Button
              isLoading={isSyncing}
              isDisabled={!user.githubProjectOwner || !user.githubProjectNumber}
              onClick={() => syncProject(undefined)}
            >
              Sincronizar agora
            </Button>
          </HStack>
          {syncResult && <span>{syncResult}</span>}
        </VStack>
      </VStack>
    </Panel>
  )
}
