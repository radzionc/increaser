import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ValueProp, UiProps } from '@lib/ui/props'
import { ProductTool } from '@product/entities/ProductTool'

import { productToolIconRecord } from './productToolIconRecord'

export const ProductToolIcon = ({
  value,
  ...rest
}: ValueProp<ProductTool> & UiProps) => {
  return <IconWrapper {...rest}>{productToolIconRecord[value]}</IconWrapper>
}
