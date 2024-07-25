import {
  ComponentWithActiveState,
  ComponentWithValueProps,
} from '@lib/ui/props'
import { VStack } from '@lib/ui/layout/Stack'
import styled, { css } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { interactive } from '@lib/ui/css/interactive'
import { VisionAttributeIdea } from '@increaser/entities/Vision'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useDeleteVisionAttributeMutation } from '@increaser/ui/vision/api/useDeleteVisionAttributeMutation'
import { transition } from '@lib/ui/css/transition'
import { VisionBoardItemHeader } from '@increaser/ui/vision/VisionBoardItemHeader'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useCreateUserEntityMutation } from '@increaser/ui/userEntity/api/useCreateUserEntityMutation'

const Indicator = styled.div`
  ${round};
  ${sameDimensions(24)};
  ${centerContent};
  color: ${getColor('textSupporting')};
  background: ${getColor('mist')};
  ${transition};
`

const Container = styled(VStack)<ComponentWithActiveState>`
  overflow: hidden;
  ${borderRadius.m};
  ${interactive};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};

          border-color: ${getColor('contrast')};

          ${Indicator} {
            color: ${getColor('success')};
          }
        `
      : css`
          img {
            ${transition};
            filter: grayscale(100%);
          }
          background: ${getColor('foreground')};

          &:hover {
            img {
              filter: none;
            }
          }

          &:hover {
            border-color: ${getColor('mistExtra')};
            color: ${getColor('contrast')};
          }

          &:hover ${Indicator} {
            color: ${getColor('success')};
          }
        `}
`

const Content = styled(PrefixedItemFrame)`
  ${verticalPadding(0)};
`

const Image = styled.img`
  object-fit: cover;
`

export const CuratedVisionAttributeItem = ({
  value: { id, name, emoji },
}: ComponentWithValueProps<VisionAttributeIdea>) => {
  const { mutate: createVisionAttribute } =
    useCreateUserEntityMutation('visionAttribute')
  const { mutate: deleteVisionAttribute } = useDeleteVisionAttributeMutation()

  const { vision } = useAssertUserState()

  const isAdded = id in vision

  const imageId = `vision/${id}.webp`

  return (
    <Container
      isActive={isAdded}
      onClick={() => {
        if (isAdded) {
          deleteVisionAttribute(id)
        } else {
          const orders = Object.values(vision).map(
            (attribute) => attribute.order,
          )
          createVisionAttribute({
            id,
            name: name,
            imageId,
            order: getLastItemOrder(orders),
            emoji,
          })
        }
      }}
    >
      <VisionBoardItemHeader>
        <Content
          prefix={
            <Indicator>
              <IconWrapper>
                {isAdded ? <CheckIcon /> : <PlusIcon />}
              </IconWrapper>
            </Indicator>
          }
        >
          {name}
        </Content>
      </VisionBoardItemHeader>
      <SafeImage
        src={getPublicFileUrl(imageId)}
        render={(props) => <Image {...props} />}
      />
    </Container>
  )
}
