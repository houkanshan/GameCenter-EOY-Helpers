import Head from 'next/head'
import styles from '../styles/Bottom.module.css'
import { useCallback, useMemo, useState, useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import useSheetCSV from '../hooks/useSheetCSV'
import useArraySlide from '../hooks/useArraySlide'
import useTimeout from '../hooks/useTimeout'
import useShuffle from '../hooks/useShuffle'

export default function Bottom() {
  const router = useRouter()
  const { id, gid, interval = 2, messageDuration = 20 } = router.query
  const [data, error] = useSheetCSV(id, gid)

  return (
    <div className={styles.container}>
      <Head>
        <title>Bottom Message - Game Center EOY 2021</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.displayArea}>
          {data && <BottomMessage data={data} interval={interval} messageDuration={messageDuration} />}
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

function BottomMessage({ data: _data, interval, messageDuration }) {
  // const currentItem = useArraySlide(data, interval * 1000)
  // const showMessage = useTimeout(interval * 100, [currentItem])
  const data = useShuffle(_data)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(function() {
    let abort = false
    async function round() {
      if (abort) return;
      await sleep(1)

      setShowMessage(true)
      await sleep(messageDuration)


      setIsHiding(true)
      await sleep(1)

      setShowMessage(false)
      setIsHiding(false)

      await sleep(interval - 1)
      setCurrentIndex(i => (i + 1) % data.length)
      setTimeout(round, 0)
    }
    round()
    return () => abort = true
  }, [])

  return <div className={styles.bottomMessage} data-is-hiding={isHiding}>
    {showMessage && (
      <div className={styles.message}>{data[currentIndex][2]}</div>
    )}
  </div>
}

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000))
}