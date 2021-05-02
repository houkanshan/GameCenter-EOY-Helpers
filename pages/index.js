import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import url from 'url'
import {urlQueryToSearchParams} from '../utils/querystring'

// Get id and gid from sheet url
const sheetUrlRe = /\/d\/(.+)\/edit#gid=(\d+)/
function parseSheetUrl(url) {
  const [_, id, gid] = url.match(sheetUrlRe)
  return [id, gid]
}

export default function Home() {
  const [sheetUrl, setSheetUrl] = useState('')
  const [pageType, setPageType] = useState('bottom')
  const [interval, setInterval] = useState(5)
  const [messageDuration, setMessageDuration] = useState(20)
  const [questionDuration, setQuestionDuration] = useState(30)
  const [answerDuration, setAnswerDuration] = useState(30)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    try {
      const [id, gid] = parseSheetUrl(sheetUrl)
      console.log(id, gid)
      router.push(`/${pageType}?${urlQueryToSearchParams(
        pageType === 'bottom'
          ? { id, gid, pageType, interval, messageDuration }
          : { id, gid, pageType, interval, questionDuration, answerDuration }
        )}`)
    } catch (e) {
      setError('I don’t understand the google sheet url!')
    }
  }, [sheetUrl, pageType, interval, messageDuration, questionDuration, answerDuration])

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Center EOY 2021</title>
      </Head>
      <main className={styles.main}>
        <h1>Hey</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Paste the full google sheet url of the bottom messages or trivia questions here:</legend>
            <div className={classNames(styles.field)}>
              <label>
                <span className={classNames(styles.text)}>Google Sheet Url</span>
                <input type="url" value={sheetUrl} onChange={(e) => setSheetUrl(e.target.value.trim())}/>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Choose the correct page type:</legend>
            <div className={classNames(styles.field)}>
              <label>
                <span className={classNames(styles.text)}>Page Type</span>
                <select value={pageType} onChange={(e) => setPageType(e.target.value)}>
                  <option value="bottom">Bottom Messages</option>
                  <option value="trivia">Trivia Questions</option>
                </select>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Waiting time between message / questions</legend>
            <div className={classNames(styles.field)}>
              <label>
                <span className={classNames(styles.text)}>Interval between Messages/Questions</span>
                <input type="number" value={interval} onChange={(e) => setInterval(+e.target.value)}/>
                <span>sec</span>
              </label>
            </div>
          </fieldset>
          {pageType === "bottom" && (
            <fieldset>
              <legend>How long each message will stay:</legend>
              <div className={classNames(styles.field)}>
                <label>
                  <span className={classNames(styles.text)}>Message Duration</span>
                  <input type="number" value={messageDuration} onChange={(e) => setMessageDuration(+e.target.value)}/>
                  <span>sec</span>
                </label>
              </div>
            </fieldset>
          )}
          {pageType === "trivia" && (<>
            <fieldset>
              <legend>How long the question will display before revealing the answer</legend>
              <div className={classNames(styles.field)}>
                <label>
                  <span className={classNames(styles.text)}>Question Duration</span>
                  <input type="number" value={questionDuration} onChange={(e) => setQuestionDuration(+e.target.value)}/>
                  <span>sec</span>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>How long the trivia will stay after revealing the answer</legend>
              <div className={classNames(styles.field)}>
                <label>
                  <span className={classNames(styles.text)}>Answer Duration</span>
                  <input type="number" value={answerDuration} onChange={(e) => setAnswerDuration(+e.target.value)}/>
                  <span>sec</span>
                </label>
              </div>
            </fieldset>
          </>)}

          {error && (
            <div className={styles.formError}>
              Error: {error}
            </div>
          )}

          <fieldset>
            <legend>Click Go, preview the page, and copy the URL to the OBS browser source setting!</legend>
            <div className={classNames(styles.formAction)}>
              <button>Go!</button>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  )
}
