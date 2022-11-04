import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => (
    <div className="container-md m-2" style={{textAlign: 'center'}}>
        <Spinner role="status" animation="border" variant="info" size="xxl">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
)


export default LoadingScreen