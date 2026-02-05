import { Panel } from '@lib/ui/css/panel'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { productName } from '@product/config'
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
          All features are now free with {productName}
        </SectionTitle>
      </div>
      <SafeImage
        src="/images/morning.webp"
        render={(props) => <Image {...props} />}
      />
    </Panel>
  )
}
