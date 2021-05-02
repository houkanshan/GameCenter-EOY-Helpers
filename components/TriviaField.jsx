import fetcher from '../utils/fetcher'
import useSWR from 'swr'
import { useMemo, useState } from 'react'

function getTriviaTscUrl(sheetId, sheetGid) {
  return `https://docs.google.com/spreadsheets/export?format=tsv&id=${sheetId}&gid=${sheetGid}`
}

export default function TriviaField({ sheetId, sheetGid }) {
  const triviaTscUrl = useMemo(() => {
    return getTriviaTscUrl(sheetId, sheetGid)
  }, [sheetId, sheetGid])
  const { data, error } = useSWR(triviaTscUrl, fetcher)

  console.log(data)
  console.log(error)

  return <div>
  </div>
}