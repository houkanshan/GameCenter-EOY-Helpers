import { useEffect, useRef } from "react"

export default function useInterval(callback, timeout) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (timeout == null) return
    const id = setInterval(() => callbackRef.current(), timeout)
    return () => clearInterval(id)
  }, [timeout])
}