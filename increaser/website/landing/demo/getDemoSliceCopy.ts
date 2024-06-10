import {
  ProductTool,
  productToolSubtitle,
  productToolTitle,
} from '@increaser/entities/ProductTool'

export const getDemoSliceCopy = (productTool: ProductTool) => ({
  title: productToolTitle[productTool],
  subtitle: productToolSubtitle[productTool],
})
