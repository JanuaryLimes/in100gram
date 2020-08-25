import { LoggedUserState, LoggedUserStateActions } from '../types'

export const loggedUserStateReducer = (
  state: LoggedUserState,
  action: LoggedUserStateActions
) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        loggedUser: { email: action.payload.email },
      }
    case 'logout': {
      const result: LoggedUserState = { loggedUser: {} }
      return result
    }
    default:
      return state
  }
}
