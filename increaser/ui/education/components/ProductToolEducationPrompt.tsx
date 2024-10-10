import { ComponentWithValueProps } from '@lib/ui/props'
import { ProductToolEducation } from '../ProductToolEducation'
import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { Text } from '@lib/ui/text'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { Modal } from '@lib/ui/modal'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Content = styled.div`
  line-height: 1.5;

  h3 {
    font-weight: 700;
    font-size: 16px;
    color: ${getColor('contrast')};
    margin-bottom: 8px;

    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  strong {
    font-weight: 700;
    font-size: 14px;
    color: ${getColor('contrast')};
  }

  ol,
  ul {
    padding-left: 16px;
  }

  li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`

export const ProductToolEducationPrompt = ({
  value,
}: ComponentWithValueProps<ProductToolEducation>) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button onClick={onOpen} kind="secondary">
          <Text centerVertically style={{ gap: 8 }}>
            <InfoIcon />
            Learn more
          </Text>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <Modal
          placement="top"
          title={value.title}
          onClose={onClose}
          width={520}
          as="form"
          subTitle={value.subtitle}
          {...getFormProps({ onSubmit: onClose, onClose })}
          footer={<CreateFormFooter submitText="Continue" />}
        >
          <Content>{value.content}</Content>
        </Modal>
      )}
    />
  )
}
