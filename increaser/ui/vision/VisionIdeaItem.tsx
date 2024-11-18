import {
  ComponentWithActiveState,
  ComponentWithValueProps,
} from '@lib/ui/props'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled, { css } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { useUser } from '@increaser/ui/user/state/user'
import { interactive } from '@lib/ui/css/interactive'
import { VisionAttributeIdea } from '@increaser/entities/Vision'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { VisionBoardItemHeader } from '@increaser/ui/vision/VisionBoardItemHeader'
import { useCreateUserEntityMutation } from '@increaser/ui/userEntity/api/useCreateUserEntityMutation'
import { useDeleteUserEntityMutation } from '@increaser/ui/userEntity/api/useDeleteUserEntityMutation'
import { text, Text } from '@lib/ui/text'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

const Indicator = styled.div<ComponentWithActiveState>`
  ${centerContent};
  background: ${getColor('mist')};
  ${borderRadius.m};
  ${horizontalPadding(8)};
  ${({ isActive }) =>
    text({
      nowrap: true,
      color: isActive ? 'alert' : 'success',
    })}
  min-height: 32px;
  ${centerContent};
`

const Container = styled(VStack)<ComponentWithActiveState>`
  overflow: hidden;
  ${borderRadius.m};
  ${interactive};
  position: relative;

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};

          border-color: ${getColor('contrast')};
        `
      : css`
          img {
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
        `}

  &:hover {
    ${VisionBoardItemHeader} {
      opacity: 1;
    }
  }
`

const Image = styled.img`
  object-fit: cover;
`

export const VisionIdeaItem = ({
  value: { id, name, emoji, description },
}: ComponentWithValueProps<VisionAttributeIdea>) => {
  const { mutate: createVisionAttribute } =
    useCreateUserEntityMutation('visionAttribute')
  const { mutate: deleteVisionAttribute } =
    useDeleteUserEntityMutation('visionAttribute')

  const { vision } = useUser()

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
            description,
            order: getLastItemOrder(orders),
            emoji,
          })
        }
      }}
    >
      <VisionBoardItemHeader>
        <HStack fullWidth alignItems="center" justifyContent="space-between">
          <Text color="contrast">{name}</Text>
          <Indicator isActive={isAdded}>{isAdded ? 'Remove' : 'Add'}</Indicator>
        </HStack>
      </VisionBoardItemHeader>
      <SafeImage
        src={getPublicFileUrl(imageId)}
        render={(props) => <Image {...props} />}
      />
    </Container>
  )
}
