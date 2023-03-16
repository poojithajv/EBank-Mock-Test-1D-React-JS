import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    userIdInput: '',
    pinInput: '',
    showError: false,
    errorMsg: '',
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userIdInput, pinInput} = this.state
    const userDetails = {user_id: userIdInput, pin: pinInput}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(fetchedData.jwt_token)
    } else {
      this.onSubmitFailure(fetchedData.error_msg)
    }
  }

  onChangeUserIdInput = event => {
    this.setState({userIdInput: event.target.value})
  }

  onChangePinInput = event => {
    this.setState({pinInput: event.target.value})
  }

  render() {
    const {userIdInput, pinInput, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Welcome Back!</h1>
            <label className="label" htmlFor="userId">
              User ID
            </label>
            <input
              className="input-container"
              id="userId"
              type="text"
              placeholder="Enter User ID"
              onChange={this.onChangeUserIdInput}
              value={userIdInput}
            />
            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              className="input-container"
              id="pin"
              type="password"
              placeholder="Enter PIN"
              onChange={this.onChangePinInput}
              value={pinInput}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage
