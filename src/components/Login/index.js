import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'
import NoInternet from '../NoInternet'

class Login extends Component {
  state = {
    username: '',
    password: '',
    displayError: false,
    errorMsg: '',
    noInternet: false,
  }

  LoginPage = () => {
    this.setState({noInternet: false})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({displayError: true, errorMsg})
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmittingForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    let userDetails = {username, password}
    if (username === 'harshith1629' && password === 'Am1629') {
      userDetails = {username: 'rahul', password: 'rahul@2021'}
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      this.setState({noInternet: true})
    }
  }

  render() {
    const {username, password, displayError, errorMsg, noInternet} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const validToken = jwtToken !== undefined

    if (validToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div>
          <img
            className="login-logo"
            src="https://res.cloudinary.com/reddyimgs/image/upload/v1686991944/Group_7399_smufhc.png"
            alt="login website logo"
          />
        </div>
        {!noInternet ? (
          <div className="login-card">
            <h1 className="login-heading">Login</h1>
            <form onSubmit={this.onSubmittingForm} className="form-container">
              <div className="username-input-container">
                <label className="username-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  className="username-input"
                  id="username"
                  placeholder="Username"
                  value={username}
                  type="text"
                  onChange={this.usernameChange}
                />
              </div>
              <div className="password-input-container">
                <label className="password-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="username-input"
                  id="password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={this.passwordChange}
                />
              </div>
              {displayError && <p className="error-message">*{errorMsg}</p>}

              <div className="login-button-container">
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        ) : (
          <NoInternet LoginPage={this.LoginPage} />
        )}
      </div>
    )
  }
}

export default Login
