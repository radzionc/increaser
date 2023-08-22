export const tryToSay = (text: string) => {
  try {
    window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(text))
  } catch (err) {}
}
