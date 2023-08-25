import { useProjectsRecord } from './useProjectsRecord'

export const useProject = (id: string | null) => {
  const record = useProjectsRecord()

  return id ? record[id] || null : null
}
