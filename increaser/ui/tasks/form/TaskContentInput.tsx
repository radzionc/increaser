import React, { useMemo, useState, FC } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Descendant, Element as SlateElement, Text } from 'slate'
import { withHistory } from 'slate-history'
import { InputProps } from '@lib/ui/props'
import { attempt } from '@lib/utils/attempt'

const initialValue: Descendant[] = [
  {
    children: [{ text: '' }],
  },
]

const toEditorValue = (value: string | undefined): Descendant[] =>
  value ? attempt(() => JSON.parse(value), initialValue) : initialValue

export const TaskContentInput: FC<InputProps<string | undefined>> = ({
  value,
  onChange,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [editorValue, setEditorValue] = useState<Descendant[]>(() =>
    toEditorValue(value),
  )

  const handleChange = (newValue: Descendant[]) => {
    setEditorValue(newValue)
    const isEmpty =
      newValue.length === 0 ||
      (newValue.length === 1 &&
        SlateElement.isElement(newValue[0]) &&
        newValue[0].children.length === 1 &&
        Text.isText(newValue[0].children[0]) &&
        newValue[0].children[0].text === '')

    if (isEmpty) {
      onChange(undefined)
    } else {
      onChange(JSON.stringify(newValue))
    }
  }

  return (
    <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
      <Editable placeholder="Enter your task context here..." />
    </Slate>
  )
}

export default TaskContentInput
