import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { themePreferences } from '@lib/ui/theme/ThemePreference'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useThemePreference } from '@lib/ui/theme/ThemeProvider'
import { RadioInput } from '@lib/ui/inputs/RadioInput'

export const ThemeSelector = () => {
  const { value, onChange } = useThemePreference()

  return (
    <VStack style={{ width: 320 }} alignItems="start" gap={8}>
      <Text color="supporting">Theme</Text>
      <RadioInput
        options={themePreferences}
        value={value}
        onChange={onChange}
        renderOption={(option) => capitalizeFirstLetter(option)}
      />
    </VStack>
  )
}
