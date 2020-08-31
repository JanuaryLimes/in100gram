import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { posts } from '../utils/data'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '../components/Loader'
import { useViewerQuery } from '../apollo/generated/graphql'

export const Home = ({ postsData }): JSX.Element => {
  const router = useRouter()
  const { data, loading, error } = useViewerQuery()
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/accounts/login')
    }
  }, [shouldRedirect])

  // TODO error?
  function content() {
    if (viewer) {
      return <Main postsData={postsData} />
    }

    return (
      <div className="fixed inset-0">
        <Loader />
      </div>
    )
  }

  return <Layout>{content()}</Layout>
}

Home.getInitialProps = async () => {
  return { postsData: posts }
}

export default Home
