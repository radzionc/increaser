import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { transition } from '@lib/ui/css/transition'
import { PictureIcon } from '@lib/ui/icons/PictureIcon'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { OnFinishProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { useUploadFileMutation } from '../../storage/useUploadFileMutation'

import { VisionImageInputContent } from './VisionImageInputContent'

const ImageInput = styled(TakeWholeSpace)`
  ${centerContent};
  ${interactive};
  ${transition};
  font-weight: 500;
  &:hover {
    color: ${getColor('contrast')};
    background: ${getColor('mist')};
  }
  border: 2px dashed ${getColor('primary')};
  ${borderRadius.m};
`

const PendingContainer = styled(TakeWholeSpace)`
  ${centerContent};
  ${borderRadius.m};
  border: 2px dashed ${getColor('mistExtra')};
`

export const UploadVisionImage = ({ onFinish }: OnFinishProp<string>) => {
  const { mutate: uploadFile, status } = useUploadFileMutation()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
      'image/webp': ['.webp'],
      'image/tiff': ['.tiff', '.tif'],
      'image/svg+xml': ['.svg'],
    },
    onDrop: (acceptedFiles) => {
      const [file] = acceptedFiles
      if (file) {
        uploadFile(file, {
          onSuccess: onFinish,
        })
      }
    },
  })

  return (
    <>
      {status === 'pending' ? (
        <PendingContainer>
          <VisionImageInputContent
            title="Please wait"
            subTitle="Uploading the image..."
            icon={<Spinner />}
          />
        </PendingContainer>
      ) : (
        <ImageInput {...getRootProps()}>
          <input {...getInputProps()} />
          <VisionImageInputContent
            title="Add an image to visualize your aspiration"
            subTitle="Drop it here or click to select"
            icon={<PictureIcon />}
          >
            {status === 'error' && (
              <Text size={14} weight="500" color="alert">
                Failed to upload the image.
              </Text>
            )}
          </VisionImageInputContent>
        </ImageInput>
      )}
    </>
  )
}
