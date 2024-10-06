import { OnValueChangeListener, PersistentStorage } from './PersistentStorage'
import { recordMap } from '@lib/utils/record/recordMap'
import { ValueTransition } from '@lib/utils/entities/ValueTransition'

export class LocalStorage<T extends string> implements PersistentStorage<T> {
  listeners: Record<string, OnValueChangeListener<any>[]> = {}

  constructor() {
    window.addEventListener('storage', this.handleStorageEvent)
  }

  private handleStorageEvent = (event: StorageEvent) => {
    const { key, newValue, oldValue } = event

    if (!key) return

    this.notifyListeners(
      key,
      recordMap({ oldValue, newValue }, this.parseValue),
    )
  }

  private notifyListeners = <V>(
    key: string,
    transition: ValueTransition<V>,
  ): void => {
    const listeners = this.listeners[key] || []

    listeners.forEach((listener) => {
      listener(transition)
    })
  }

  private parseValue = <V>(value: string | null): V | undefined => {
    if (value === null) return undefined
    if (value === 'null') return null as unknown as V
    if (value === 'undefined') return undefined

    try {
      return JSON.parse(value) as V
    } catch {
      return value as unknown as V
    }
  }

  getItem<V>(key: T): V | undefined {
    const item = localStorage.getItem(key)

    return this.parseValue<V>(item)
  }

  setItem<V>(key: T, newValue: V): void {
    const oldValue = this.getItem<V>(key)
    const newValueString = JSON.stringify(newValue)
    const oldValueString = JSON.stringify(oldValue)

    if (oldValueString === newValueString) return

    if (newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, newValueString)
    }

    this.notifyListeners(key, {
      oldValue,
      newValue,
    })
  }

  addValueChangeListener<V>(
    key: string,
    listener: OnValueChangeListener<V>,
  ): void {
    if (!this.listeners[key]) {
      this.listeners[key] = []
    }

    this.listeners[key].push(listener)
  }

  removeValueChangeListener<V>(
    key: string,
    listener: OnValueChangeListener<V>,
  ): void {
    this.listeners[key] = (this.listeners[key] || []).filter(
      (l) => l !== listener,
    )
  }
}
