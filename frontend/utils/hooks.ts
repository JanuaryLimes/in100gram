import { useRouter } from 'next/router'
import { useViewerQuery } from '../apollo/generated/graphql'
import { useEffect } from 'react'

export function useViewer() {
  const router = useRouter()
  const { data, loading, error } = useViewerQuery()
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/accounts/login')
    }
  }, [shouldRedirect])

  return { viewer }
}
