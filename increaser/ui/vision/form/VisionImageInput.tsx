import { useDropzone } from 'react-dropzone'
import { CoverImage } from '@lib/ui/images/CoverImage'
import { HStack, VStack } from '@lib/ui/layout/Stack'
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
import { Text } from '@lib/ui/text'
import { Center } from '@lib/ui/layout/Center'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { round } from '@lib/ui/css/round'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { VisionImageInputContent } from './VisionImageInputContent'

const Wrapper = styled.div`
  ${visionImageAspectRatio};
  width: 100%;
  overflow: hidden;
  padding: 0;
  position: relative;
  ${centerContent};
`

const PositionRemoveButton = styled.div`
  position: absolute;
  top: 8px;
`

const RemoveButton = styled(UnstyledButton)`
  ${centerContent};
  font-size: 14px;
  font-weight: 500;
  ${round};
  height: 40px;
  ${horizontalPadding(16)};
  background: ${getColor('foreground')};
  ${transition};
  &:hover {
    color: ${getColor('contrast')};
    background: ${getHoverVariant('foreground')};
  }
`

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
`

const Image = styled(CoverImage)``

export const VisionImageInput = ({
  value,
  onChange,
}: InputProps<string | null>) => {
  const { mutate: uploadFile, status, data, reset } = useUploadFileMutation()
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

  return (
    <>
      <Wrapper>
        {status === 'pending' ? (
          <VisionImageInputContent
            title="Please wait"
            subTitle="Uploading the image..."
            icon={<Spinner />}
          />
        ) : value ? (
          <SafeImage
            render={(props) => <Image {...props} />}
            src={getPublicFileUrl(value)}
            fallback={<Center>Failed to load the image</Center>}
          />
        ) : (
          <ImageInput {...getRootProps()}>
            <input {...getInputProps()} />
            <VisionImageInputContent
              title="Add an image to visualize your aspiration"
              subTitle="Drop it here or click to select"
              icon={<PictureIcon />}
            />
          </ImageInput>
        )}
        {value && (
          <PositionRemoveButton>
            <RemoveButton
              onClick={() => {
                reset()
                onChange(null)
              }}
            >
              <HStack alignItems="center" gap={8}>
                <IconWrapper>
                  <TrashBinIcon />
                </IconWrapper>
                Remove image
              </HStack>
            </RemoveButton>
          </PositionRemoveButton>
        )}
      </Wrapper>
      {status === 'error' && (
        <VStack>
          <Text size={14} weight="semibold" color="alert">
            Failed to upload the image.
          </Text>
        </VStack>
      )}
    </>
  )
}
