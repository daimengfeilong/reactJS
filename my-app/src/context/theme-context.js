import React from 'react'

export let themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}
export let ThemeContext = React.createContext(
  themes.dark   //默认值
)