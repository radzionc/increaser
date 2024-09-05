import {
  productToolNameRecord,
  productTools,
} from '@increaser/entities/ProductTool'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { HStack } from '@lib/ui/css/stack'
import { selectContainerMinHeight } from '@lib/ui/select/SelectContainer'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { getProductToolUrl } from './productTool'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { ComponentWithActiveState } from '@lib/ui/props'
import { useRouter } from 'next/router'
import { ProductToolIcon } from '@increaser/ui/tools/ProductToolIcon'
import { OptionItem } from '@lib/ui/select/OptionItem'

const ToggleIconContainer = styled(CollapsableStateIndicator)`
  ${transition};
  color: transparent;
`

const activeContainer = css`
  background: ${getColor('mist')};
  ${ToggleIconContainer} {
    color: ${getColor('contrast')};
  }
`

const OptionContent = styled(HStack)`
  overflow: hidden;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
`

const Container = styled(HStack)<ComponentWithActiveState>`
  ${borderRadius.s};
  outline: none;
  padding: 8px 12px;
  ${transition};

  align-items: center;
  gap: 4px;
  justify-content: space-between;
  min-height: ${toSizeUnit(selectContainerMinHeight)};

  color: ${getColor('contrast')};
  font-weight: 500;
  font-size: 16px;

  ${interactive};

  &:hover {
    ${activeContainer}
  }

  ${({ isActive }) => isActive && activeContainer};
`

export const ProductFeaturesNavigation = () => {
  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    activeIndex,
    setIsOpen,
  } = useFloatingOptions({
    floatingOptionsWidthSameAsOpener: false,
    selectedIndex: null,
    options: productTools.map((tool) => productToolNameRecord[tool]),
  })

  const { push } = useRouter()

  return (
    <>
      <Container isActive={isOpen} {...getReferenceProps()}>
        Features
        <ToggleIconContainer isOpen={isOpen} />
      </Container>
      {isOpen && (
        <FloatingOptionsContainer {...getFloatingProps()}>
          {productTools.map((tool, index) => (
            <OptionItem
              key={tool}
              isActive={activeIndex === index}
              {...getOptionProps({
                index,
                onSelect: () => {
                  setIsOpen(false)
                  push(getProductToolUrl(tool))
                },
              })}
            >
              <OptionContent>
                <ProductToolIcon value={tool} />
                {productToolNameRecord[tool]}
              </OptionContent>
            </OptionItem>
          ))}
        </FloatingOptionsContainer>
      )}
    </>
  )
}
