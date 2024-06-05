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

const Wrapper = styled.div`
  ${visionImageAspectRatio};
  padding: 0;
`

const RemoveButton = styled(UnstyledButton)`
  ${centerContent};
  font-size: 14px;
  font-weight: 500;
  ${transition};
  &:hover {
    color: ${getColor('contrast')};
    background: ${getColor('mist')};
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
      {value && (
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
      )}
      <Wrapper>
        {status === 'pending' ? (
          <Center>
            <Spinner />
          </Center>
        ) : value ? (
          <SafeImage
            render={(props) => <Image {...props} />}
            src={getPublicFileUrl(value)}
            fallback={<Center>Failed to load the image</Center>}
          />
        ) : (
          <ImageInput {...getRootProps()}>
            <input {...getInputProps()} />
            <VStack alignItems="center" gap={16}>
              <IconWrapper style={{ fontSize: 40 }}>
                <PictureIcon />
              </IconWrapper>
              <VStack alignItems="center" gap={8}>
                <Text>Add an image to visualize your aspiration</Text>
                <Text size={14} color="supporting">
                  Drop it here or click to select
                </Text>
              </VStack>
            </VStack>
          </ImageInput>
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

  // return (
  //   <InputContainer>
  //     <LabelText>Visualize your aspiration</LabelText>
  //     <HStack gap={8}>
  //       <div {...getRootProps()} style={{ width: '100%' }}>
  //         <input {...getInputProps()} />
  //         <Container>
  //           {status === 'pending' ? (
  //             <LoaderContainer>
  //               <Spinner />
  //             </LoaderContainer>
  //           ) : imageId ? (
  //             <SafeImage
  //               render={(props) => <Image {...props} />}
  //               src={getPublicFileUrl(imageId)}
  //             />
  //           ) : (
  //             <PictureIcon />
  //           )}
  //         </Container>
  //       </div>
  //     </HStack>
  //   </InputContainer>
  // )
}
