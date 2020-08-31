import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { posts } from '../utils/data'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '../components/Loader'
import { useViewerQuery } from '../apollo/generated/graphql'
import { Navigation } from '../components/Navigation'
import { NextPageContext } from 'next'

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
      return (
        <>
          <Navigation></Navigation>
          <Main postsData={postsData} />
        </>
      )
    }

    return (
      <div className="fixed inset-0">
        <Loader />
      </div>
    )
  }

  return <Layout>{content()}</Layout>
}

export async function getServerSideProps(_context: NextPageContext) {
  return {
    props: { postsData: posts },
  }
}

export default Home
