import { ProductUpdate } from '../ProductUpdate'

export const injectProductUpdate = (
  fileContent: string,
  value: Partial<ProductUpdate>,
) => {
  const declaration = 'export const productUpdates: ProductUpdate[] = ['
  const [before, after] = fileContent.split(declaration)

  const productUpdate: ProductUpdate = {
    releasedAt: 0,
    name: '',
    description: '',
    videoId: '',
    items: [],
    telegram: '',
    x: '',
    linkedIn: '',
    indieHackers: '',
    reddit: '',
    ...value,
  }

  return [before, declaration, `${JSON.stringify(productUpdate)},`, after].join(
    '\n',
  )
}
