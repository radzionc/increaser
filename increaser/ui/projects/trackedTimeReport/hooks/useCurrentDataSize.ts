import { useDataSize } from '../dataSize/useDataSize'
import { useTrackedTimeMaxDataSize } from './useTrackedTimeMaxDataSize'

export const useCurrentDataSize = () => {
  const maxSize = useTrackedTimeMaxDataSize()
  const [dataSize] = useDataSize()

  return dataSize === null ? maxSize : dataSize
}
