import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ApiContext, CallApi } from '@increaser/api-ui/state/ApiContext'
import { getDemoUser } from '@increaser/demo/getDemoUser'

const mockCallApi: CallApi = async (method) => {
  if (method === 'user') {
    return getDemoUser()
  }

  return undefined
}

export const MockApiProvider = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ApiContext.Provider value={{ call: mockCallApi }}>
      {children}
    </ApiContext.Provider>
  )
}
