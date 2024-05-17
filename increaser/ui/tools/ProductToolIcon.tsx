import {
  ProductTool,
  productToolColorRecord,
} from '@increaser/entities/ProductTool'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ComponentWithValueProps, UIComponentProps } from '@lib/ui/props'
import { productToolIconRecord } from './productToolIconRecord'
import { useTheme } from 'styled-components'

export const ProductToolIcon = ({
  value,
  style,
  className,
}: ComponentWithValueProps<ProductTool> & UIComponentProps) => {
  const { colors } = useTheme()
  return (
    <IconWrapper
      style={{
        color: colors.getLabelColor(productToolColorRecord[value]).toCssValue(),
        ...style,
      }}
      className={className}
    >
      {productToolIconRecord[value]}
    </IconWrapper>
  )
}
