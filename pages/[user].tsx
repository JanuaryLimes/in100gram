import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { Navigation } from '../components/Navigation'
import { Content } from '../components/Content'

export const UserPage = () => {
  const router = useRouter()
  const { user } = router.query

  return (
    <Layout>
      <Navigation />
      <Content>
        <div>hej {user}</div>
      </Content>
    </Layout>
  )
}

export default UserPage
