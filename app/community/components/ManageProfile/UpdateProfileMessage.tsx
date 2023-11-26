import { Text } from '@increaser/ui/text'
import { InfoIcon } from '@increaser/ui/icons/InfoIcon'

export const UpdateProfileMessage = () => (
  <Text color="supporting" size={14} height="large">
    <Text
      centered
      as="span"
      style={{ marginRight: 8, verticalAlign: 'middle' }}
    >
      <InfoIcon />
    </Text>
    It could take up to 10 minutes for your changes to appear <br /> on the
    scoreboard.
  </Text>
)
