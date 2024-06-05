import { useDropzone } from 'react-dropzone'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { textInputHeight } from '@lib/ui/css/textInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CoverImage } from '@lib/ui/images/CoverImage'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { PictureIcon } from '@lib/ui/icons/PictureIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { visionImageAspectRatio } from '../visionImageAspectRatio'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { useUploadFileMutation } from '../../storage/useUploadFileMutation'
import { useEffect } from 'react'
import { getPublicFileUrl } from '../../storage/getPublicFileUrl'
import { SafeImage } from '@lib/ui/images/SafeImage'

const Container = styled.div`
  ${visionImageAspectRatio};
  height: ${toSizeUnit(textInputHeight)};
  ${borderRadius.s};
  object-fit: cover;
  background: ${getColor('mist')};
  ${centerContent};
  overflow: hidden;
  position: relative;
`

const LoaderContainer = styled.div`
  position: absolute;
  pointer-events: none;
`

const Image = styled(CoverImage)``

export const VisionImageInput = ({
  value,
  onChange,
}: InputProps<string | null>) => {
  const { mutate: uploadFile, status, data } = useUploadFileMutation()
  useEffect(() => {
    if (data) {
      onChange(data)
    }
  }, [data, onChange])

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
        uploadFile(file)
      }
    },
  })

  const imageId = value || data

  return (
    <InputContainer>
      <LabelText>Visualize your aspiration</LabelText>
      <HStack gap={8}>
        <div {...getRootProps()} style={{ width: '100%' }}>
          <input {...getInputProps()} />
          <Container>
            {status === 'pending' ? (
              <LoaderContainer>
                <Spinner />
              </LoaderContainer>
            ) : imageId ? (
              <SafeImage
                render={(props) => <Image {...props} />}
                src={getPublicFileUrl(imageId)}
              />
            ) : (
              <PictureIcon />
            )}
          </Container>
        </div>
      </HStack>
    </InputContainer>
  )
}
