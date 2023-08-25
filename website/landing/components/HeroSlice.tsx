import styled from 'styled-components'
import { Center } from '@increaser/ui/ui/Center'
import { LandingSlice } from '@increaser/ui/ui/landing/LandingSlice'

import { ProductScreens } from './ProductScreens'
import { UVP } from './UVP'

const Wrapper = styled(LandingSlice)`
  flex: 1;

  grid-template-columns: 4% 1fr 4%;
  gap: 0;
`

const Container = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 5fr 7fr;
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(200px, 1fr);
  }
`

export const HeroSlice = () => {
  return (
    <Wrapper>
      <Container>
        <Center>
          <UVP />
        </Center>
        <ProductScreens />
      </Container>
    </Wrapper>
  )
}
