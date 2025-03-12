import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { OnSelectProp } from '@lib/ui/props'
import { useTheme } from 'styled-components'

const EmojiPicker = ({ onSelect }: OnSelectProp<string>) => {
  const { name } = useTheme()

  return (
    <Picker
      autoFocus
      data={data}
      theme={name}
      showPreview={false}
      showSkinTones={false}
      onEmojiSelect={(emoji: any) => {
        if (!emoji?.native) return

        onSelect(emoji.native)
      }}
    />
  )
}

export default EmojiPicker
