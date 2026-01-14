import { hasWindow } from './window'

const editableTagNames = ['INPUT', 'TEXTAREA', 'SELECT']

export const isEditableElement = (element: Element | null): boolean => {
  if (!element) return false

  if (editableTagNames.includes(element.tagName)) {
    return true
  }

  if (element instanceof HTMLElement && element.isContentEditable) {
    return true
  }

  return false
}

export const isActiveElementEditable = (): boolean => {
  if (!hasWindow) return false

  return isEditableElement(document.activeElement)
}
