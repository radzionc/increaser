import { borderRadius } from '@lib/ui/css/borderRadius'
import { textInputHeight } from '@lib/ui/css/textInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CoverImage } from '@lib/ui/images/CoverImage'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { PictureIcon } from '@lib/ui/icons/PictureIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { useEffect, useState } from 'react'
import { visionImageAspectRatio } from '../visionImageAspectRatio'
import { Spinner } from '@lib/ui/loaders/Spinner'

type ImageStatus = 'unknown' | 'success' | 'error'

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
  const [inputValue, setInputValue] = useState<string>(value ?? '')
  const [imageStatus, setImageStatus] = useState<ImageStatus>('unknown')

  useEffect(() => {
    if (imageStatus === 'unknown') {
      return
    }

    onChange(imageStatus === 'success' ? inputValue : null)
  }, [imageStatus, inputValue, onChange])

  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  useEffect(() => {
    setImageStatus('unknown')
  }, [inputValue])

  return (
    <InputContainer>
      <LabelText>Visualize your aspiration</LabelText>
      <HStack gap={8}>
        <TextInput
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="Image URL"
        />
        <Container>
          {inputValue ? (
            imageStatus === 'error' ? (
              <PictureIcon />
            ) : (
              <Image
                onLoad={() => setImageStatus('success')}
                onError={() => setImageStatus('error')}
                src={inputValue}
              />
            )
          ) : (
            <PictureIcon />
          )}
          {inputValue && imageStatus === 'unknown' && (
            <LoaderContainer>
              <Spinner />
            </LoaderContainer>
          )}
        </Container>
      </HStack>
    </InputContainer>
  )
}
