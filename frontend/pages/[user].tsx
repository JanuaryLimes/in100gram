import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { Navigation } from '../components/Navigation'
import { Content } from '../components/Content'
import { FaRegUserCircle } from 'react-icons/fa'
import {
  useUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  UserDocument,
  UserQuery,
} from '../apollo/generated/graphql'
import { Loader } from '../components/Loader'
import { useContext } from 'react'
import { AppContext } from '../store/context'

export const UserPage = () => {
  const {
    loading,
    photoUrl,
    postsCount,
    followers,
    following,
    displayName,
    loggedUserIsFollowing,
    actions,
  } = useUserPageState()

  if (loading) {
    return (
      <div className="fixed inset-0">
        <Loader />
      </div>
    )
  }

  if (!displayName) {
    return '404' // TODO
  }

  function photo() {
    return photoUrl ? (
      <img className="rounded-full" src={photoUrl} />
    ) : (
      <div style={{ fontSize: '10rem' }}>
        <FaRegUserCircle />
      </div>
    )
  }

  function info() {
    return (
      <>
        <div className="flex items-center">
          <div className="text-2xl font-light">{displayName}</div>
          <div className="pl-2">
            {loggedUserIsFollowing ? (
              <button
                className="font-semibold p-1 px-4 rounded text-red-600 w-full"
                onClick={actions.onUnfollow}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="bg-blue-500 font-semibold p-1 px-4 rounded text-white w-full"
                onClick={actions.onFollow}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <div className="flex py-4">
          <div className="pr-10">
            <span className="font-semibold">{postsCount}</span>
            {' posts'}
          </div>
          <div className="pr-10">
            <span className="font-semibold">{followers.length}</span>
            {' followers'}
          </div>
          <div className="pr-10">
            <span className="font-semibold">{following.length}</span>
            {' following'}
          </div>
        </div>
      </>
    )
  }

  return (
    <Layout>
      <Navigation />
      <Content>
        <div className="flex">
          <div className="px-6">{photo()}</div>
          <div className="flex-auto">{info()}</div>
        </div>
      </Content>
    </Layout>
  )
}

export default UserPage

function useUserPageState() {
  const router = useRouter()
  const { user } = router.query
  const { data, loading } = useUserQuery({
    variables: { displayName: (user as string) ?? '' },
  })
  const { state } = useContext(AppContext)

  const [follow /*, {data,loading}*/] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()

  // eslint-disable-next-line no-console
  // console.log('user page props', { router, user, data })

  const { id, photoUrl, postsCount, followers, following, displayName } =
    data?.user ?? {}
  const { id: viewerId } = state?.loggedUserState?.loggedUser?.viewer ?? {}

  // TODO own profile
  const loggedUserIsFollowing = Boolean(
    followers?.find((follower) => follower.id == viewerId)
  )

  async function onFollow() {
    /* const result = */ await follow({
      variables: {
        userId: viewerId,
        follow: id,
      },
    })
    // update apollo cache?
  }
  async function onUnfollow() {
    /* const result = */ await unfollow({
      variables: {
        userId: viewerId,
        follow: id,
      },
      update(cache, { data: d }) {
        const re = cache.readQuery<UserQuery>({
          query: UserDocument,
          variables: { displayName: (user as string) ?? '' },
        })

        // re.user.followers = re.user.followers.filter(
        //   (user) => user.id != viewerId
        // )

        re.user.followers.splice(2, 1)

        cache.writeQuery<UserQuery>({
          query: UserDocument,
          variables: { displayName: (user as string) ?? '' },
          data: re,
          // data: {
          //   ...re,
          //   user: {
          //     ...re.user,
          //     followers: [
          //       ...re.user.followers.filter((user) => user.id != viewerId),
          //     ],
          //   },
          // },
        })

        // eslint-disable-next-line no-console
        console.log({ cache, data, d, re })
      },
    })
  }

  return {
    loading,
    photoUrl,
    postsCount,
    followers,
    following,
    displayName,
    loggedUserIsFollowing,
    actions: {
      onFollow,
      onUnfollow,
    },
  }
}
