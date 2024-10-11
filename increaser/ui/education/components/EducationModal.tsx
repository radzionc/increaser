import { ClosableComponentProps, ComponentWithValueProps } from '@lib/ui/props'
import { ProductToolEducation } from '../ProductToolEducation'
import { Modal } from '@lib/ui/modal'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EducationContent } from './EducationContent'
import { VStack } from '@lib/ui/css/stack'
import { EducationVideo } from './EducationVideo'
import styled from 'styled-components'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { modalConfig } from '@lib/ui/modal/config'

const ContentWrapper = styled(ModalContent)`
  ${hideScrollbars};
  ${horizontalPadding(0)}
`

const Content = styled(EducationContent)`
  ${horizontalPadding(modalConfig.padding)}
`

export const EducationModal: React.FC<
  ClosableComponentProps & ComponentWithValueProps<ProductToolEducation>
> = ({ onClose, value }) => {
  return (
    <Modal
      placement="top"
      title={value.title}
      onClose={onClose}
      width={560}
      as="form"
      subTitle={value.subtitle}
      {...getFormProps({ onSubmit: onClose, onClose })}
      footer={<CreateFormFooter submitText="Continue" />}
    >
      <ContentWrapper>
        <VStack gap={modalConfig.padding}>
          <EducationVideo value={value.youTubeVideoUrl} />
          <Content>{value.content}</Content>
        </VStack>
      </ContentWrapper>
    </Modal>
  )
}
