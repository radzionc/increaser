import { ComponentWithValueProps } from '@lib/ui/props'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled, { css } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { visionImageAspectRatio } from '@increaser/ui/vision/visionImageAspectRatio'
import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { useCreateVisionAttributeMutation } from '@increaser/ui/vision/api/useCreateVisionAttributeMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { interactive } from '@lib/ui/css/interactive'
import { VisionAttributeIdea } from '@increaser/entities/Vision'

const Indicator = styled.div`
  ${round};
  ${sameDimensions(24)};
  ${centerContent};
  color: ${getColor('textSupporting')};
  background: ${getColor('mist')};
  ${transition};
`

const Header = styled(HStack)`
  gap: 8px;
  align-items: start;
  padding: 16px;
  text-align: left;
  font-size: 14px;
  line-height: 24px;
`

const Container = styled(VStack)<{ isInteractive: boolean }>`
  ${borderRadius.m};
  width: 100%;
  border: 2px solid ${getColor('mist')};
  ${transition};
  overflow: hidden;
  justify-content: space-between;

  ${({ isInteractive }) =>
    isInteractive
      ? css`
          ${interactive};

          &:hover {
            border-color: ${getColor('mistExtra')};
            color: ${getColor('contrast')};
          }

          &:hover ${Indicator} {
            color: ${getColor('success')};
          }
        `
      : css`
          color: ${getColor('contrast')};

          border-color: ${getColor('success')};

          ${Indicator} {
            color: ${getColor('success')};
          }
        `}
`

const Image = styled.img`
  ${visionImageAspectRatio};
  object-fit: cover;
`

export const CuratedVisionAttributeItem = ({
  value: { id, name, emoji },
}: ComponentWithValueProps<VisionAttributeIdea>) => {
  const { mutate } = useCreateVisionAttributeMutation()

  const { vision } = useAssertUserState()

  const isAdded = id in vision

  const imageId = `vision/${id}.webp`

  return (
    <Container
      isInteractive={!isAdded}
      onClick={() => {
        if (isAdded) return
        const orders = Object.values(vision).map((attribute) => attribute.order)
        const order = orders.length ? Math.min(...orders) - 1 : 0
        mutate({
          id,
          name: name,
          status: 'inProgress',
          imageId,
          order,
          emoji,
        })
      }}
    >
      <Header>
        <Indicator>
          <IconWrapper>{isAdded ? <CheckIcon /> : <PlusIcon />}</IconWrapper>
        </Indicator>
        <Text>{name}</Text>
      </Header>
      <SafeImage
        src={getPublicFileUrl(imageId)}
        render={(props) => <Image {...props} />}
      />
    </Container>
  )
}
