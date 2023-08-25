import styled, { css } from 'styled-components'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'
import { ClientOnly } from 'ui/ClientOnly'

const Container = styled.div`
  ${centerContentCSS}
  overflow: hidden;

  ${getSameDimensionsCSS('100%')}
`

const Content = styled.div`
  position: relative;
`

const desktopScreenRatio = 2560 / 1600
// const mobileScreenRatio = 368 / 804
const mobileScreenRatio = 400 / 800

const mobileToDesktopHeightRatio = 0.8
const screensOffsetRelativeToWidth = 0.04

const Screen = styled.div<{ width: number | string; height: number | string }>`
  position: absolute;
  border: 2px solid ${({ theme }) => theme.colors.textShy.toCssValue()};
  background-position: -2px -2px;

  ${(props) => {
    const width = getCSSUnit(props.width)
    const height = getCSSUnit(props.height)

    return css`
      width: ${width};
      height: ${height};
      background-size: ${width} ${height};
      border-radius: calc(${height} * 0.04);
    `
  }}
`

const DesktopScreen = styled(Screen)`
  right: 0;
  top: 0;
  background-image: url('/images/dashboard.webp');
`

const MobileScreen = styled(Screen)`
  left: 0;
  bottom: 0;
  background-image: url('/images/landing_mobile.webp');
`

export const ProductScreens = () => (
  <ClientOnly>
    <ElementSizeAware
      render={({ setElement, size }) => {
        let content = null

        if (size) {
          const { width, height } = size

          const ratio = width / height

          const [contentWidth, contentHeight] =
            ratio > desktopScreenRatio
              ? [height * desktopScreenRatio, height]
              : [width, width / desktopScreenRatio]

          const screenOffset = contentWidth * screensOffsetRelativeToWidth
          const desktopScreenHeight = contentHeight - screenOffset
          const mobileScreenHeight =
            desktopScreenHeight * mobileToDesktopHeightRatio

          content = (
            <Content style={{ width: contentWidth, height: contentHeight }}>
              <DesktopScreen
                width={contentWidth - screenOffset}
                height={desktopScreenHeight}
              />
              <MobileScreen
                width={mobileScreenHeight * mobileScreenRatio}
                height={mobileScreenHeight}
              />
            </Content>
          )
        }

        return <Container ref={setElement}>{content}</Container>
      }}
    />
  </ClientOnly>
)
