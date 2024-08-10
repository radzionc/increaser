import { useTrackedTimeDataSize } from '../state/useTrackedTimeDataSize'
import { useTrackedTimeMaxDataSize } from './useTrackedTimeMaxDataSize'

export const useCurrentDataSize = () => {
  const maxSize = useTrackedTimeMaxDataSize()
  const [dataSize] = useTrackedTimeDataSize()

  return dataSize === null ? maxSize : dataSize
}
