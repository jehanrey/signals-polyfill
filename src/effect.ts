import { Signal } from 'signal-polyfill'

let needsEnqueue = true

const processPending = () => {
  needsEnqueue = true

  for (const signal of watcher.getPending()) {
    signal.get()
  }

  watcher.watch()
}

const watcher = new Signal.subtle.Watcher(() => {
  if (needsEnqueue) {
    needsEnqueue = false
    queueMicrotask(processPending)
  }
})

export const effect = (callback?: () => void) => {
  let cleanup: any

  const computed = new Signal.Computed(() => {
    cleanup?.()
    cleanup = callback?.()
  })

  watcher.watch(computed)
  computed.get()

  return () => {
    watcher.unwatch()
    typeof cleanup === 'function' && cleanup()
  }
}
