export const tryToPlaySound = (url: string) => {
  try {
    const audio = new Audio(url)
    audio.play()
  } catch (err) {}
}
