import styled from 'styled-components'
import { SafeImage } from './SafeImage'
import { CoverImage } from './images/CoverImage'
import { getColor } from './theme/getters'
import { centerContentCSS } from './utils/centerContentCSS'

interface CountryFlagProps {
  code?: string
  source?: string
  className?: string
  style?: React.CSSProperties
}

const Wrapper = styled.div`
  aspect-ratio: 4 / 3;
  background: ${getColor('mist')};
  overflow: hidden;
  ${centerContentCSS};
`

export const CountryFlag = ({
  code,
  source = '/images/flags',
  className,
  style,
}: CountryFlagProps) => {
  return (
    <Wrapper style={style} className={className}>
      <SafeImage
        src={code ? `${source}/${code.toLowerCase()}.svg` : undefined}
        render={(props) => <CoverImage {...props} />}
      />
    </Wrapper>
  )
}
