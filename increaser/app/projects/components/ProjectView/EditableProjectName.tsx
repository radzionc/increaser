import { useCallback, useEffect, useState } from 'react'

import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { MinimalisticTextInput } from '@increaser/app/ui/MinimalisticTextInput'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'

export const EditableProjectName = () => {
  const { name, id } = useCurrentProject()

  const { mutate: updateProject } = useUpdateProjectMutation()

  const [value, setValue] = useState<string>(name)

  const syncName = useCallback(() => {
    if (value.length < 1) return

    if (value === name) return

    updateProject({ id, fields: { name: value } })
  }, [id, name, updateProject, value])

  useEffect(() => {
    const timeOut = setTimeout(syncName, 1000)

    return () => clearTimeout(timeOut)
  }, [syncName])

  return (
    <MinimalisticTextInput
      placeholder="Project name"
      value={value}
      onBlur={syncName}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  )
}
