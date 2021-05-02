import { useEffect, useState } from "react";

export default function useTimeout(timeout, deps) {
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setFinished(true)
    }, timeout)
    return () => {
      setFinished(false)
      clearTimeout(id)
    }
  }, [timeout, ...deps])
  return finished
}