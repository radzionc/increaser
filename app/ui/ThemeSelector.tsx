import { UniformColumnGrid } from '@increaser/ui/Layout/UniformColumnGrid'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { SelectOption } from '@increaser/ui/inputs/Select/SelectOption'
import { usePrefferedTheme } from '@increaser/ui/theme/PrefferedThemeProvider'
import { themePreferences } from '@increaser/ui/theme/ThemePreference'
import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'

export const ThemeSelector = () => {
  const { prefferedTheme, setPrefferedTheme } = usePrefferedTheme()

  return (
    <VStack style={{ width: 320 }} alignItems="start" gap={8}>
      <Text color="supporting">Theme</Text>
      <UniformColumnGrid fullWidth gap={8}>
        {themePreferences.map((option) => (
          <SelectOption
            isSelected={option === prefferedTheme}
            value={option}
            onSelect={() => setPrefferedTheme(option)}
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
