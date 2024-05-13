import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ApiContext, CallApi } from '@increaser/api-ui/state/ApiContext'

const mockCallApi: CallApi = async () => {
  return undefined
}

export const MockApiProvider = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ApiContext.Provider value={{ call: mockCallApi }}>
      {children}
    </ApiContext.Provider>
  )
}
