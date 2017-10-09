// https://github.com/ReactTraining/history
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// Current location
const { location } = history

// Listen for changes to the current location.

const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
})

export const transition = (path, state) =>
    history.push(path, state)

export const back = () =>
    history.goBack()
