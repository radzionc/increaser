import { useEffect } from 'react'
import styled from 'styled-components'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { usePaddleSdk } from '../hooks/usePaddleSdk'
import { User } from '@increaser/entities/User'

interface Props {
  onClose: () => void
  onSuccess?: (checkoutId: string) => void
  user: Pick<User, 'email' | 'id'>
  override?: string
  product: string | number
}

const contentMinHeight = getCSSUnit(600)

const Container = styled.div`
  position: relative;
  min-height: ${contentMinHeight};

  iframe {
    min-height: ${contentMinHeight};
  }
`

export const PaddleIFrame = ({
  onClose,
  override,
  product,
  user: { email, id },
  onSuccess,
}: Props) => {
  const className = `checkout-container-${product}`

  const { data: paddleSdk } = usePaddleSdk()

  useEffect(() => {
    if (!paddleSdk) return

    paddleSdk.Checkout.open({
      method: 'inline',
      product: Number(product),
      allowQuantity: false,
      disableLogout: true,
      frameTarget: className,
      successCallback: ({ checkout: { id } }) => {
        onSuccess?.(id)
      },
      closeCallback: onClose,
      frameInitialHeight: 450,
      email: email,
      passthrough: JSON.stringify({ userId: id }),
      override,
      frameStyle:
        'width:100%; min-width:312px; background-color: transparent; border: none;',
    })
  }, [className, onClose, override, paddleSdk, product, email, id])

  return <Container className={className} />
}
