import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { posts } from '../utils/data'

export const Home = ({ postsData }): JSX.Element => (
  <Layout>
    <Main postsData={postsData} />
  </Layout>
)

Home.getInitialProps = async () => {
  return { postsData: posts }
}

export default Home
