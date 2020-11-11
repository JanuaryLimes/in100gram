import React, { createContext, useReducer, Dispatch, useEffect } from 'react'
import { loggedUserStateReducer } from './reducers'
import { AppState, LoggedUserStateActions } from '../types'
import { useViewer } from '../utils/hooks'

const initialState: AppState = {
  loggedUserState: { loggedUser: {} },
}

const AppContext = createContext<{
  state: AppState
  dispatch: Dispatch<LoggedUserStateActions>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = (
  { loggedUserState }: AppState,
  action: LoggedUserStateActions
) => ({
  loggedUserState: loggedUserStateReducer(loggedUserState, action),
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)
  const { viewer } = useViewer()

  useEffect(() => {
    if (viewer?.email) {
      dispatch({ type: 'login', payload: { viewer } })
    }
  }, [viewer])

  useEffect(() => {
    if (process.env.NODE_ENV != 'production') {
      // eslint-disable-next-line no-console
      console.log('store:', state)
    }
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
