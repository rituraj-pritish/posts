import {CHANGE_THEME} from './types'

export const changeTheme = (isLight) => {
  // window.localStorage.setItem('token')
  window.localStorage.setItem('isLight', !isLight)
  return {type: CHANGE_THEME}
}