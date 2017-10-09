import 'styles/fonts/fonts.scss'
import 'styles/globals.scss'
import 'polyfills'
import 'globals'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from 'App.jsx'

if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)

/*
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
*/
