import { useMemo } from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import parseCSV from 'csv-parse/lib/sync'

function getTriviaCSVUrl(sheetId, sheetGid) {
  return `https://docs.google.com/spreadsheets/export?format=csv&id=${sheetId}&gid=${sheetGid}`
}

export default function useSheetCSV(sheetId, sheetGid) {
  const url = useMemo(() => (sheetId && sheetGid) && getTriviaCSVUrl(sheetId, sheetGid), [sheetId, sheetGid])
  const { data: csv, error } = useSWR(url, fetcher)
  const data = useMemo(() => {
    if (!csv) return null
    return parseCSV(csv.trim(), {
      trim: true,
      skip_empty_lines: true,
      skip_lines_with_error: true,
      from: 2
    })
  }, [csv])

  return [data, error]
}