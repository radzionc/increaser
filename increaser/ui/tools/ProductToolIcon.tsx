import { ProductTool } from '@increaser/entities/ProductTool'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ValueProp, UiProps } from '@lib/ui/props'
import { productToolIconRecord } from './productToolIconRecord'

export const ProductToolIcon = ({
  value,
  ...rest
}: ValueProp<ProductTool> & UiProps) => {
  return <IconWrapper {...rest}>{productToolIconRecord[value]}</IconWrapper>
}
