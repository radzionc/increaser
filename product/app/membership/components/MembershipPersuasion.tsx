import { Panel } from '@lib/ui/css/panel'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { productName } from '@product/config'
import { SubscriptionFeatures } from '@product/ui/subscription/SubscriptionFeatures'
import styled from 'styled-components'

const Image = styled.img`
  padding: 0;
  width: 100%;
  object-fit: contain;
`

export const MembershipPersuasion = () => {
  return (
    <Panel withSections>
      <div>
        <SectionTitle>
          Unlock your full potential with {productName}
        </SectionTitle>
      </div>
      <SafeImage
        src="/images/morning.webp"
        render={(props) => <Image {...props} />}
      />
      <SubscriptionFeatures />
    </Panel>
  )
}
