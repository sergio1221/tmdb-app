import { useState, useEffect } from 'react'
import { LOAD_MOVIES_STEP, PAGE_COUNT } from 'helpers/constants'

interface LoadedData<T> {
  data: T[];
  error: string;
  busy: boolean;
}
export function useLoad<T>(
  step: number,
  sorting: string,
  fetchFn: (page: number, sorting: string) => Promise<T[]>
): LoadedData<T> {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    const loadData = async () => {
      const startPage = data.length / PAGE_COUNT + 1
      const endPage = LOAD_MOVIES_STEP[step] / PAGE_COUNT

      try {
        setError('')
        setBusy(true)

        const tasks = []
        for (let page = startPage; page <= endPage; page ++) {
          tasks.push(fetchFn(page, sorting))
        }

        const result = await Promise.all(tasks)
        for (const subRes of result) {
          data.push(...subRes)
        }
        setData([...data])
      } catch (e: any) {
        setError(e.response)
      } finally {
        setBusy(false)
      }
    }

    loadData()
  }, [step, sorting])

  return { data, error, busy }
}