import { CoverImage } from '@lib/ui/images/CoverImage'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { visionImageAspectRatio } from '../visionImageAspectRatio'
import { getPublicFileUrl } from '../../storage/getPublicFileUrl'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { Center } from '@lib/ui/layout/Center'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { verticalMargin } from '@lib/ui/css/verticalMargin'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { UploadVisionImage } from './UploadVisionImage'

const Wrapper = styled.div`
  ${visionImageAspectRatio};
  width: 100%;
  overflow: hidden;
  ${verticalPadding(0)}
  ${verticalMargin(-2)}
  position: relative;
  ${centerContent};
`

const Content = styled.div`
  ${takeWholeSpace};
  ${centerContent};
  position: relative;
`

const PositionRemoveButton = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`

const RemoveButton = styled(UnstyledButton)`
  ${centerContent};
  font-size: 16px;
  ${borderRadius.m};
  ${sameDimensions(48)}
  background: ${getColor('background')};
  color: ${getColor('alert')};
  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

const Image = styled(CoverImage)`
  ${borderRadius.m};
`

export const VisionImageInput = ({
  value,
  onChange,
}: InputProps<string | null>) => {
  return (
    <Wrapper>
      <Content>
        {value ? (
          <>
            <SafeImage
              render={(props) => <Image {...props} />}
              src={getPublicFileUrl(value)}
              fallback={<Center>Failed to load the image</Center>}
            />
            <PositionRemoveButton>
              <RemoveButton
                onClick={() => {
                  onChange(null)
                }}
              >
                <TrashBinIcon />
              </RemoveButton>
            </PositionRemoveButton>
          </>
        ) : (
          <UploadVisionImage onFinish={onChange} />
        )}
      </Content>
    </Wrapper>
  )
}
