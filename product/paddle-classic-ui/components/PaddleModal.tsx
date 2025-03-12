import { Modal, ModalProps } from '@lib/ui/modal'
import { lightTheme } from '@lib/ui/theme/lightTheme'
import { ThemeProvider } from 'styled-components'

export const PaddleModal = (props: ModalProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal placement="top" {...props} />
    </ThemeProvider>
  )
}
