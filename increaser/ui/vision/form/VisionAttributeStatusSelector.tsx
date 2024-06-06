import {
  VisionAttributeStatus,
  visionAttributeStatusNameRecord,
  visionAttributeStatuses,
} from '@increaser/entities/Vision'
import { Circle } from '@lib/ui/layout/Circle'
import { HStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { useTheme } from 'styled-components'
import { getVisionAttributeStatusColor } from '../getVisionAttributeStatusColor'

export const VisionAttributeStatusSelector = ({
  value,
  onChange,
}: InputProps<VisionAttributeStatus>) => {
  const theme = useTheme()

  return (
    <ExpandableSelector
      value={value}
      onChange={onChange}
      options={visionAttributeStatuses}
      getOptionKey={(option) => option}
      style={{ minWidth: 140 }}
      returnFocus
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <Circle
            size={8}
            background={getVisionAttributeStatusColor(option, theme)}
          />
          <Text>{visionAttributeStatusNameRecord[option]}</Text>
        </HStack>
      )}
    />
  )
}
