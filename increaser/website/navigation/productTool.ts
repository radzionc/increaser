import { ProductTool } from '@increaser/entities/ProductTool'

export const productToolPageRecord: Partial<Record<ProductTool, string>> = {
  trackTime: '/time-tracking',
  focus: '/focus',
}

export const getProductToolUrl = (tool: ProductTool) => {
  const page = productToolPageRecord[tool]
  return page ?? `/#${tool}`
}
