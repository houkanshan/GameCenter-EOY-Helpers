import { useMemo } from "react";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function useShuffle(array) {
  return useMemo(() => {
    console.log('re-shuffle')
    const newArray = array.slice()
    shuffleArray(newArray)
    return newArray
  }, [array])
}