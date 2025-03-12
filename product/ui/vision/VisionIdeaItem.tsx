import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { interactive } from '@lib/ui/css/interactive'
import { HStack, VStack } from '@lib/ui/css/stack'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { IsActiveProp, ValueProp } from '@lib/ui/props'
import { text, Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { VisionAttributeIdea } from '@product/entities/Vision'
import { getPublicFileUrl } from '@product/ui/storage/getPublicFileUrl'
import { useUser } from '@product/ui/user/state/user'
import { useCreateUserEntityMutation } from '@product/ui/userEntity/api/useCreateUserEntityMutation'
import { useDeleteUserEntityMutation } from '@product/ui/userEntity/api/useDeleteUserEntityMutation'
import { VisionBoardItemHeader } from '@product/ui/vision/VisionBoardItemHeader'
import styled, { css } from 'styled-components'

const Indicator = styled.div<IsActiveProp>`
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

const Container = styled(VStack)<IsActiveProp>`
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
}: ValueProp<VisionAttributeIdea>) => {
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
