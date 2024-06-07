import { ComponentWithValueProps } from '@lib/ui/props'
import { VisionAttributeDescription } from './visionAttributes'
import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
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
import { getId } from '@increaser/entities-utils/shared/getId'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

const Indicator = styled.div`
  ${round};
  ${sameDimensions(28)};
  ${centerContent};
  color: ${getColor('textSupporting')};
  background: ${getColor('mist')};
  ${transition};
`

const Header = styled(HStack)`
  gap: 20px;
  align-items: center;
  padding: 20px;
  text-align: left;
`

const Container = styled(UnstyledButton)`
  ${borderRadius.m};
  width: 100%;
  border: 2px solid ${getColor('mist')};
  ${transition};
  overflow: hidden;

  &:hover {
    border-color: ${getColor('primary')};
  }

  &:hover ${Indicator} {
    color: ${getColor('primary')};
  }
`

const Image = styled.img`
  ${visionImageAspectRatio};
  height: 100%;
  object-fit: cover;
`

export const CuratedVisionAttributeItem = ({
  value,
}: ComponentWithValueProps<VisionAttributeDescription>) => {
  const { mutate } = useCreateVisionAttributeMutation()

  const { vision } = useAssertUserState()

  return (
    <Container
      onClick={() => {
        const orders = Object.values(vision).map((attribute) => attribute.order)
        const order = orders.length ? Math.min(...orders) - 1 : 0
        mutate({
          id: getId(),
          name: value.name,
          status: 'inProgress',
          imageId: value.imageId,
          order,
        })
      }}
    >
      <Header>
        <Indicator>
          <IconWrapper>
            <PlusIcon />
          </IconWrapper>
        </Indicator>
        <Text>{value.name}</Text>
      </Header>
      {value.imageId && (
        <SafeImage
          src={getPublicFileUrl(value.imageId)}
          render={(props) => <Image {...props} />}
        />
      )}
    </Container>
  )
}
