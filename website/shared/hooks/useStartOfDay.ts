import { startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { MS_IN_MIN } from '@increaser/utils/time'

const getStartOfDay = () => startOfDay(new Date()).getTime()

export const useStartOfDay = () => {
  const [startOfDay, setStartOfDay] = useState(getStartOfDay)

  useEffect(() => {
    const interval = setInterval(() => {
      const newStartOfDay = getStartOfDay()
      if (newStartOfDay !== startOfDay) {
        setStartOfDay(newStartOfDay)
      }
    }, MS_IN_MIN * 5)

    return () => clearInterval(interval)
  }, [startOfDay])

  return startOfDay
}
