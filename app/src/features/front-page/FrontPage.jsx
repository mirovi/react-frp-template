import Button from 'components/buttons/Button.jsx'

const FrontPage = ({ history }) => (
    <div className="container">
        <h1>Hello World!!!!</h1>
        <Button onClick={() => history.push('/login')}>
            paina mua
        </Button>
    </div>
)

export default FrontPage
