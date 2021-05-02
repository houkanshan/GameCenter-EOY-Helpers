import { useState, useCallback } from 'react'
import useInterval from './useInterval'

export default function useArraySlide(list, interval = 5000) {
  const [index, setIndex] = useState(0)

  const listLength = list.length;
  const turnNext = useCallback(() => {
    setIndex((i) => (i + 1) % listLength)
  }, [listLength])

  useInterval(turnNext, interval)

  return list[index]
}