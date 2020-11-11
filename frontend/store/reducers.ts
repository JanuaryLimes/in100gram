import { LoggedUserState, LoggedUserStateActions } from '../types'

export const loggedUserStateReducer = (
  state: LoggedUserState,
  action: LoggedUserStateActions
) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        loggedUser: { viewer: { ...action.payload.viewer } },
      }
    case 'logout': {
      const result: LoggedUserState = { loggedUser: {} }
      return result
    }
    default:
      return state
  }
}
