import { Idea } from '@increaser/entities/Idea'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentIdea, provider: CurrentIdeaProvider } =
  getValueProviderSetup<Idea>('Idea')
