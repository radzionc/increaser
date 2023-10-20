export interface PaddleSdkProductPrice {
  price: {
    gross: string
  }
}

interface PaddleSdkSetupParams {
  vendor: number
}

export interface CheckoutSuccessInfo {
  checkout: {
    id: string
  }
  product: {
    id: number
  }
  user: {
    id: string
  }
}

interface PaddleSdkOpenCheckoutParams {
  method: string
  product: number
  allowQuantity: boolean
  disableLogout: boolean
  frameTarget: string
  successCallback: (info: CheckoutSuccessInfo) => void
  closeCallback: () => void
  frameInitialHeight: number
  loadCallback?: () => void
  email?: string | null
  passthrough: string
  override: any
  frameStyle: string
}

export interface PaddleSdk {
  Product: {
    Prices: (
      code: number,
      resolve: (prices: PaddleSdkProductPrice) => void,
    ) => void
  }
  Setup: (params: PaddleSdkSetupParams) => void
  Checkout: {
    open: (params: PaddleSdkOpenCheckoutParams) => void
  }
  Environment: {
    set: (mode: 'sandbox') => void
  }
  Order: {
    details: (checkoutId: string, callback: (info: any) => void) => void
  }
}
