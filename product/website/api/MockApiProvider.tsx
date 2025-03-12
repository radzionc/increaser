import { ChildrenProp } from '@lib/ui/props'
import { ApiContext, CallApi } from '@product/api-ui/state/ApiContext'
import { getDemoUser } from '@product/demo/getDemoUser'

const mockCallApi: CallApi = async (method) => {
  if (method === 'user') {
    return getDemoUser()
  }

  return undefined
}

export const MockApiProvider = ({ children }: ChildrenProp) => {
  return (
    <ApiContext.Provider value={{ call: mockCallApi }}>
      {children}
    </ApiContext.Provider>
  )
}
