import { ProductTool } from '@increaser/entities/ProductTool'

const productToolPageRecord: Partial<Record<ProductTool, string>> = {
  trackTime: '/time-tracking',
  focus: '/focus',
  tasks: '/tasks',
  habits: '/habits',
}

export const getProductToolUrl = (tool: ProductTool) => {
  const page = productToolPageRecord[tool]
  return page ?? `/#${tool}`
}
