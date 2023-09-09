import { usePaddleSdk } from 'membership/paddle/hooks/usePaddleSdk'
import { useEffect } from 'react'
import styled from 'styled-components'
import { getCSSUnit } from '@increaser/ui/ui/utils/getCSSUnit'
import { useAssertUserState } from 'user/state/UserStateContext'

interface Props {
  onClose: () => void
  onSuccess: (...args: any[]) => void
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
  onSuccess,
  override,
  product,
}: Props) => {
  const { email, id } = useAssertUserState()

  const className = `checkout-container-${product}`

  const { data: paddleSdk } = usePaddleSdk()

  useEffect(() => {
    if (!paddleSdk) return

    const parameters = {
      method: 'inline',
      product: Number(product),
      allowQuantity: false,
      disableLogout: true,
      frameTarget: className,
      successCallback: onSuccess,
      closeCallback: onClose,
      frameInitialHeight: 450,
      email: email,
      passthrough: JSON.stringify({ userId: id }),
      override,
      frameStyle:
        'width:100%; min-width:312px; background-color: transparent; border: none;',
    }

    paddleSdk.Checkout.open(parameters)
  }, [className, onClose, onSuccess, override, paddleSdk, product, email, id])

  return <Container className={className} />
}
