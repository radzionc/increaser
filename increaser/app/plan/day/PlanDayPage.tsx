import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { PlanDayProvider } from './PlanDayProvider'
import { PlanDayContent } from './PlanDayContent'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { MobilePlanDayContent } from './MobilePlanDayContent'

const Container = styled(FixedWidthContent)`
  display: flex;
  flex-direction: column;
`

export const PlanDayPage = () => {
  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <Container ref={setElement}>
          <UserStateOnly>
            <PlanDayProvider>
              {size && size.width < 600 ? (
                <MobilePlanDayContent />
              ) : (
                <PlanDayContent />
              )}
            </PlanDayProvider>
          </UserStateOnly>
        </Container>
      )}
    />
  )
}
