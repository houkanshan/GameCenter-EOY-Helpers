import Head from 'next/head'
import styles from '../styles/Trivia.module.css'
import { useCallback, useMemo, useState, useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import useSheetCSV from '../hooks/useSheetCSV'
import useArraySlide from '../hooks/useArraySlide'
import useTimeout from '../hooks/useTimeout'
import useShuffle from '../hooks/useShuffle'


export default function Trivia() {
  const router = useRouter()
  const { id, gid, interval = 5, questionDuration = 30, answerDuration = 30 } = router.query
  const [data, error] = useSheetCSV(id, gid)


  return (
    <div className={styles.container}>
      <Head>
        <title>Trivia Questions - Game Center EOY 2021</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.displayArea}>
          {data && (
            <TriviaQuestion
              data={data}
              interval={interval}
              questionDuration={questionDuration}
              answerDuration={answerDuration}
            />
          )}
        </div>

        {/* {!data && (
          <div className={styles.loading}>Loading...</div>
        )} */}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        ) }
      </main>
    </div>
  )
}

function TriviaQuestion({ data: _data, interval, questionDuration, answerDuration }) {
  // Re-shuffle once for one browser refresh.
  const data = useShuffle(_data)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(function() {
    let abort = false

    async function round() {
      if (abort) return;
      await sleep(1)

      setShowQuestion(true)
      await sleep(questionDuration)

      setShowAnswer(true)
      await sleep(answerDuration)

      setIsHiding(true)
      await sleep(1)
      setShowQuestion(false)
      setShowAnswer(false)
      setIsHiding(false)

      await(interval - 1)
      setCurrentIndex(i => (i + 1) % data.length)
      setTimeout(round, 0)
    }
    round()

    return () => abort = true
  }, [])

  const currentItem = data[currentIndex]

  return <div className={styles.trivia} data-is-hiding={isHiding}>
    {showQuestion && <div className={styles.question}>Q: {currentItem[0]}</div>}
    {showAnswer && <div className={styles.answer}>A: {currentItem[1]}</div>}
  </div>
}

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000))
}