import { PaddleSdk } from './PaddleSdk'

export declare global {
  interface Window {
    Paddle?: PaddleSdk
  }
}
