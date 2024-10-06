import { useEffect } from 'react'
import styled from 'styled-components'
import { usePaddleSdk } from '../hooks/usePaddleSdk'
import { User } from '@increaser/entities/User'
import { getColor } from '@lib/ui/theme/getters'

interface Props {
  onClose?: () => void
  onSuccess?: (checkoutId: string) => void
  user: Pick<User, 'email' | 'id'>
  override?: string
  product: string | number
}

const Container = styled.div`
  position: relative;
  background: ${getColor('contrast')};
`

const className = 'checkout-container'

export const PaddleIFrame = ({
  onClose,
  override,
  product,
  user: { email, id },
  onSuccess,
}: Props) => {
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
      closeCallback: () => {
        onClose?.()
      },
      frameInitialHeight: 600,
      email: email,
      passthrough: JSON.stringify({ userId: id }),
      override,
      frameStyle: 'width:100%; background-color: transparent; border: none;',
    })
  }, [email, id, onClose, onSuccess, override, paddleSdk, product])

  return <Container className={className} />
}
