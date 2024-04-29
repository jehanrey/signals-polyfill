import { useSyncExternalStore } from 'react'
import { Signal } from 'signal-polyfill'

import { effect } from '../effect'

const useComputed = <T>(signal: Signal.Computed<T>): T => {
  let value = signal.get()
  return useSyncExternalStore(
    (callback) =>
      effect(() => {
        value = signal.get()
        callback()
      }),
    () => value,
    () => value,
  )
}

export default useComputed
