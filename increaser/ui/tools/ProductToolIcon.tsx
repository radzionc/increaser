import { ProductTool } from '@increaser/entities/ProductTool'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ComponentWithValueProps, UIComponentProps } from '@lib/ui/props'
import { productToolIconRecord } from './productToolIconRecord'

export const ProductToolIcon = ({
  value,
  ...rest
}: ComponentWithValueProps<ProductTool> & UIComponentProps) => {
  return <IconWrapper {...rest}>{productToolIconRecord[value]}</IconWrapper>
}
