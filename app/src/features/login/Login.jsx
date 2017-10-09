import Button from 'components/buttons/Button.jsx'

const Login = ({ history }) => (
    <div className="container">
        <h1>Hello World!!!!</h1>
        <div className="row">
            <div className="col-xs-12 col-md-6 padding--bottom-small">
                <Button onClick={() => history.push('/login/credentials')}>
                    Kirjaudu
                </Button>
            </div>
            <div className="col-xs-12 col-md-6 padding--bottom-small">
                <Button onClick={() => history.push('/login/registration')}>
                    Rekistöröidy
                </Button>
            </div>
        </div>
    </div>
)

export default Login
