import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { posts } from '../utils/data'
import { Loader } from '../components/Loader'
import { Navigation } from '../components/Navigation'
import { NextPageContext } from 'next'
import { useViewer } from '../utils/hooks'

export const Home = ({ postsData }): JSX.Element => {
  const { viewer } = useViewer()

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
