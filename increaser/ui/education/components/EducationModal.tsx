import { ClosableComponentProps, ComponentWithValueProps } from '@lib/ui/props'
import { ProductToolEducation } from '../ProductToolEducation'
import { Modal } from '@lib/ui/modal'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EducationContent } from './EducationContent'
import { VStack } from '@lib/ui/css/stack'
import { EducationVideo } from './EducationVideo'

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
      <VStack gap={20}>
        <EducationVideo value={value.youTubeVideoUrl} />
        <EducationContent>{value.content}</EducationContent>
      </VStack>
    </Modal>
  )
}
