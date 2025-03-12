import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Idea } from '@product/entities/Idea'

export const { useValue: useCurrentIdea, provider: CurrentIdeaProvider } =
  getValueProviderSetup<Idea>('Idea')
