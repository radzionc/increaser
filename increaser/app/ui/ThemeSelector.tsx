import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { SelectOption } from '@lib/ui/inputs/Select/SelectOption'
import { themePreferences } from '@lib/ui/theme/ThemePreference'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useThemePreference } from '@lib/ui/theme/ThemeProvider'

export const ThemeSelector = () => {
  const { value, onChange } = useThemePreference()

  return (
    <VStack style={{ width: 320 }} alignItems="start" gap={8}>
      <Text color="supporting">Theme</Text>
      <UniformColumnGrid fullWidth gap={8}>
        {themePreferences.map((option) => (
          <SelectOption
            isSelected={option === value}
            value={option}
            onSelect={() => onChange(option)}
            groupName="theme"
            key={option}
          >
            {capitalizeFirstLetter(option)}
          </SelectOption>
        ))}
      </UniformColumnGrid>
    </VStack>
  )
}
