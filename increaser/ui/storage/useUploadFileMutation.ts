import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'

export const useUploadFileMutation = () => {
  const { call } = useApi()

  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const contentType = file.type

      const { url, key } = await call('getFileUploadUrl', {
        contentType,
      })

      await fetch(url, {
        method: 'PUT',
        body: file,
      })

      return key
    },
  })
}
