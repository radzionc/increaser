import { useEffect } from 'react'
import styled from 'styled-components'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { usePaddleSdk } from '../hooks/usePaddleSdk'
import { useManageSubscription } from '@increaser/ui/subscription/ManageSubscriptionContext'

interface Props {
  onClose: () => void
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

export const PaddleIFrame = ({ onClose, override, product }: Props) => {
  const {
    user: { email, id },
    onChange,
  } = useManageSubscription()

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
      successCallback: (payload) => {
        console.log(`Paddle operation success: `, payload)
        onChange()
        onClose()
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
