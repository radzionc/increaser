import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { SelectOption } from '@increaser/ui/ui/inputs/Select/SelectOption'
import { usePrefferedTheme } from '@increaser/ui/ui/theme/PrefferedThemeProvider'
import { themePreferences } from '@increaser/ui/ui/theme/ThemePreference'
import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'

export const ThemeSelector = () => {
  const { prefferedTheme, setPrefferedTheme } = usePrefferedTheme()

  return (
    <VStack style={{ width: 320 }} alignItems="start" gap={8}>
      <Text color="supporting">Theme</Text>
      <SameWidthChildrenRow fullWidth gap={8}>
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
      </SameWidthChildrenRow>
    </VStack>
  )
}
