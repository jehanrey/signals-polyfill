import { useSyncExternalStore } from 'react'
import { Signal } from 'signal-polyfill'

import { effect } from '../effect'

const useSignal = <T>(signal: Signal.State<T>): [T, (s: T) => void] => {
  let value = signal.get()
  return [
    useSyncExternalStore(
      (callback) =>
        effect(() => {
          value = signal.get()
          callback()
        }),
      () => value,
      () => value,
    ),
    (v) => signal.set(v),
  ]
}

export default useSignal
