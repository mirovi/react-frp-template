import { Switch, Route } from 'react-router-dom'

import FrontPage from '@FrontPage/FrontPage.jsx'
import Login from '@Login/Login.jsx'

const App = () => (
    <div className="app-root">
        <div>
            PAREENT
        </div>

        <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route path="/login" component={Login} />
        </Switch>
    </div>
)

export default App
