import { text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const EducationContent = styled.div`
  ${text({
    height: 'xl',
    size: 16,
  })}

  > * {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  h2,
  h3 {
    font-weight: 700;
    font-size: 20px;
    color: ${getColor('textPrimary')};
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
