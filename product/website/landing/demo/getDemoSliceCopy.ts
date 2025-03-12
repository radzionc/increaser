import {
  ProductTool,
  productToolSubtitle,
  productToolTitle,
} from '@product/entities/ProductTool'

export const getDemoSliceCopy = (productTool: ProductTool) => ({
  title: productToolTitle[productTool],
  subtitle: productToolSubtitle[productTool],
})
