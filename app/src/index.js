import 'styles/styles.scss'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import 'globals'
import { Chat } from 'views'

ReactDOM.render(
    React.createElement(AppContainer, { }, React.createElement(Chat)),
    document.getElementById('root')
)


import 'styles/fonts/fonts.scss'
import 'styles/globals.scss'
import 'polyfills'
import 'globals'

import ReactDOM from 'react-dom'
import AppRouter from 'router/router'

if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
    React.createElement(AppRouter),
    document.querySelector('.app')
)
