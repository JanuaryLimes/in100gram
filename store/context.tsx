import React, { createContext, useReducer, Dispatch, useEffect } from 'react'
import { loggedUserStateReducer } from './reducers'
import { AppState, LoggedUserStateActions, LoggedUserKey, User } from '../types'

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

  useEffect(() => {
    const loggedUser =
      (JSON.parse(localStorage.getItem(LoggedUserKey)) as User) ?? {}

    dispatch({ type: 'login', payload: { email: loggedUser.email } })
  }, [])

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
