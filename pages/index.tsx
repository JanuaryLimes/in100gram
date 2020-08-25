import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { posts } from '../utils/data'
import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

export const Home = ({ postsData }): JSX.Element => {
  const router = useRouter()
  const { data, loading, error } = useQuery(ViewerQuery)
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/accounts/login')
    }
  }, [shouldRedirect])

  // TODO error?

  if (viewer) {
    return (
      <Layout>
        <Main postsData={postsData} />
      </Layout>
    )
  }

  return <p>loading... [// TODO] </p>
}

Home.getInitialProps = async () => {
  return { postsData: posts }
}

export default Home
