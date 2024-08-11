import { useDataSize } from '../dataSize/useDataSize'
import { useMaxDataSize } from '../dataSize/useMaxDataSize'

export const useCurrentDataSize = () => {
  const maxSize = useMaxDataSize()
  const [dataSize] = useDataSize()

  return dataSize === null ? maxSize : dataSize
}
