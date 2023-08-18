import './index.css'

const NoInternet = props => {
  const goToLoginPage = () => {
    const {LoginPage} = props
    LoginPage()
  }
  return (
    <div className="no-internet-container">
      <h1>No Internet</h1>
      <button type="button" onClick={goToLoginPage} className="try-again-btn">
        Try Again
      </button>
    </div>
  )
}

export default NoInternet
